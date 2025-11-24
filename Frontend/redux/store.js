import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import emergencyReducer from './slices/emergencySlice'
import uiReducer from './slices/uiSlice'
import { authApi } from './api/authApi'
import { userApi } from './api/userApi'
import { emergencyApi } from './api/emergencyApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    emergency: emergencyReducer,
    ui: uiReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [emergencyApi.reducerPath]: emergencyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(
      authApi.middleware,
      userApi.middleware,
      emergencyApi.middleware
    ),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store