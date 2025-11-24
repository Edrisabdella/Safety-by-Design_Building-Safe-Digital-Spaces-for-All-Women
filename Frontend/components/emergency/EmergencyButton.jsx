import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Shield, MapPin, Clock } from 'lucide-react'
import { useGeolocation } from '../../hooks/useGeolocation'
import { createEmergencyAlert } from '../../redux/slices/emergencySlice'
import { Modal } from '../common/Modal'
import { Button } from '../common/Button'
import { Alert } from '../common/Alert'
import toast from 'react-hot-toast'

const EmergencyButton = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { isLoading: locationLoading, location, error: locationError } = useGeolocation()
  const [showModal, setShowModal] = useState(false)
  const [alertType, setAlertType] = useState('immediate-danger')
  const [message, setMessage] = useState('')
  const [countdown, setCountdown] = useState(null)

  const alertTypes = [
    {
      id: 'immediate-danger',
      label: 'Immediate Danger',
      description: 'I am in immediate physical danger',
      icon: AlertTriangle,
      color: 'red',
    },
    {
      id: 'suspicious-activity',
      label: 'Suspicious Activity',
      description: 'I notice suspicious activity around me',
      icon: Shield,
      color: 'orange',
    },
    {
      id: 'check-in',
      label: 'Safety Check-in',
      description: 'Let my contacts know I am safe',
      icon: MapPin,
      color: 'green',
    },
  ]

  const handleEmergencyAlert = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to use emergency features')
      return
    }

    if (locationError) {
      toast.error('Unable to access your location. Please enable location services.')
      return
    }

    // Start countdown
    setCountdown(5)
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          sendAlert()
          return null
        }
        return prev - 1
      })
    }, 1000)
  }

  const sendAlert = async () => {
    try {
      const alertData = {
        type: alertType,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          accuracy: location.accuracy,
        },
        message: message || `Emergency alert: ${alertTypes.find(a => a.id === alertType)?.label}`,
      }

      const result = await dispatch(createEmergencyAlert(alertData))
      
      if (createEmergencyAlert.fulfilled.match(result)) {
        toast.success('Emergency alert sent to your contacts!')
        setShowModal(false)
        setMessage('')
      } else {
        throw new Error(result.payload?.message || 'Failed to send alert')
      }
    } catch (error) {
      toast.error(error.message || 'Failed to send emergency alert')
    }
  }

  const cancelAlert = () => {
    setCountdown(null)
    toast('Emergency alert cancelled', { icon: '🛑' })
  }

  if (countdown !== null) {
    return (
      <div className="fixed inset-0 bg-red-600 bg-opacity-90 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-white text-center"
        >
          <div className="text-6xl mb-4">{countdown}</div>
          <div className="text-2xl mb-4">Emergency Alert Sending...</div>
          <p className="mb-6">Your location and alert are being sent to your emergency contacts</p>
          <Button
            onClick={cancelAlert}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-red-600"
          >
            Cancel Alert
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white p-6 rounded-full shadow-2xl flex items-center justify-center text-lg font-semibold transition-all duration-200"
          disabled={locationLoading}
        >
          {locationLoading ? (
            <Clock className="w-8 h-8 animate-spin" />
          ) : (
            <AlertTriangle className="w-8 h-8" />
          )}
          <span className="ml-2">EMERGENCY</span>
        </button>
      </motion.div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Send Emergency Alert"
        size="lg"
      >
        <div className="space-y-6">
          {locationError && (
            <Alert variant="error">
              Location access required for emergency alerts. Please enable location services.
            </Alert>
          )}

          <div className="grid grid-cols-1 gap-4">
            {alertTypes.map((alertTypeItem) => (
              <motion.button
                key={alertTypeItem.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setAlertType(alertTypeItem.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  alertType === alertTypeItem.id
                    ? `border-${alertTypeItem.color}-500 bg-${alertTypeItem.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <alertTypeItem.icon
                    className={`w-6 h-6 text-${alertTypeItem.color}-500`}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {alertTypeItem.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {alertTypeItem.description}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your situation..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              rows={3}
            />
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={() => setShowModal(false)}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEmergencyAlert}
              variant="danger"
              className="flex-1"
              disabled={locationLoading || !!locationError}
            >
              {locationLoading ? 'Getting Location...' : 'Send Alert'}
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            Your current location will be shared with your emergency contacts
          </div>
        </div>
      </Modal>
    </>
  )
}

export default EmergencyButton