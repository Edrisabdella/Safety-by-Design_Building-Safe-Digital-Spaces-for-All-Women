import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { loginUser, registerUser, logoutUser, clearError } from '../redux/slices/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const { user, token, isAuthenticated, isLoading, error } = useSelector(
    (state) => state.auth
  )

  const login = async (credentials) => {
    const result = await dispatch(loginUser(credentials))
    if (loginUser.fulfilled.match(result)) {
      const redirectTo = location.state?.from?.pathname || '/dashboard'
      navigate(redirectTo, { replace: true })
      return { success: true }
    }
    return { success: false, error: result.payload }
  }

  const register = async (userData) => {
    const result = await dispatch(registerUser(userData))
    if (registerUser.fulfilled.match(result)) {
      navigate('/dashboard', { replace: true })
      return { success: true }
    }
    return { success: false, error: result.payload }
  }

  const logout = () => {
    dispatch(logoutUser())
    navigate('/login', { replace: true })
  }

  const resetError = () => {
    dispatch(clearError())
  }

  useEffect(() => {
    if (error) {
      // Auto clear error after 5 seconds
      const timer = setTimeout(() => {
        resetError()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    resetError,
  }
}