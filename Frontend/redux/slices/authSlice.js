import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../api/authApi'

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authApi.register(userData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout()
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.data.user
        state.token = action.payload.token
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.error = action.payload?.message || 'Login failed'
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.data.user
        state.token = action.payload.token
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload?.message || 'Registration failed'
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        localStorage.removeItem('token')
      })
  },
})

export const { clearError, setCredentials } = authSlice.actions
export default authSlice.reducer