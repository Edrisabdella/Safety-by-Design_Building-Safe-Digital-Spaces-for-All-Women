import axios from 'axios'
import { store } from '../redux/store'
import { logoutUser } from '../redux/slices/authSlice'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token refresh and errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Attempt to refresh token
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/refresh-token`, {
            refreshToken,
          })
          
          const { token } = response.data
          localStorage.setItem('token', token)
          
          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        store.dispatch(logoutUser())
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    // Handle other errors
    if (error.response?.status === 403) {
      // Forbidden - redirect or show access denied
      console.error('Access denied')
    }

    return Promise.reject(error)
  }
)

export default api