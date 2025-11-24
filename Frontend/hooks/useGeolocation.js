import { useState, useEffect } from 'react'

export const useGeolocation = (options = {}) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    accuracy: null,
  })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.')
      setIsLoading(false)
      return
    }

    const successHandler = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      })
      setIsLoading(false)
    }

    const errorHandler = (error) => {
      let errorMessage = 'Unknown error occurred while retrieving location.'
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'User denied the request for Geolocation.'
          break
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Location information is unavailable.'
          break
        case error.TIMEOUT:
          errorMessage = 'The request to get user location timed out.'
          break
      }
      
      setError(errorMessage)
      setIsLoading(false)
    }

    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options
    )

    // Optional: Watch position for real-time updates
    const watchId = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [options])

  return { location, error, isLoading }
}