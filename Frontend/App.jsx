import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import AppRoutes from './routes/AppRoutes'
import store from './redux/store'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <Router>
              <div className="App">
                <AppRoutes />
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 5000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                    success: {
                      duration: 3000,
                      iconTheme: {
                        primary: '#10B981',
                        secondary: '#fff',
                      },
                    },
                    error: {
                      duration: 5000,
                      iconTheme: {
                        primary: '#EF4444',
                        secondary: '#fff',
                      },
                    },
                  }}
                />
              </div>
            </Router>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App