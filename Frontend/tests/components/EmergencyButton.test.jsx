import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import EmergencyButton from '../../components/emergency/EmergencyButton'
import authReducer from '../../redux/slices/authSlice'
import emergencyReducer from '../../redux/slices/emergencySlice'

const mockStore = configureStore({
  reducer: {
    auth: authReducer,
    emergency: emergencyReducer,
  },
  preloadedState: {
    auth: {
      user: { id: '1', name: 'Test User' },
      token: 'fake-token',
      isAuthenticated: true,
      isLoading: false,
      error: null,
    },
  },
})

// Mock geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
}
global.navigator.geolocation = mockGeolocation

describe('EmergencyButton', () => {
  beforeEach(() => {
    mockGeolocation.getCurrentPosition.mockImplementation((success) =>
      success({
        coords: {
          latitude: 51.1,
          longitude: 45.3,
          accuracy: 10,
        },
      })
    )
  })

  it('renders emergency button', () => {
    render(
      <Provider store={mockStore}>
        <EmergencyButton />
      </Provider>
    )

    expect(screen.getByText('EMERGENCY')).toBeInTheDocument()
  })

  it('opens modal when button is clicked', async () => {
    render(
      <Provider store={mockStore}>
        <EmergencyButton />
      </Provider>
    )

    fireEvent.click(screen.getByText('EMERGENCY'))

    await waitFor(() => {
      expect(screen.getByText('Send Emergency Alert')).toBeInTheDocument()
    })
  })

  it('displays alert types in modal', async () => {
    render(
      <Provider store={mockStore}>
        <EmergencyButton />
      </Provider>
    )

    fireEvent.click(screen.getByText('EMERGENCY'))

    await waitFor(() => {
      expect(screen.getByText('Immediate Danger')).toBeInTheDocument()
      expect(screen.getByText('Suspicious Activity')).toBeInTheDocument()
      expect(screen.getByText('Safety Check-in')).toBeInTheDocument()
    })
  })
})