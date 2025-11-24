import { render, screen } from '@testing-library/react'
import App from '../src/App'

// Mock the useAuth hook
jest.mock('../src/hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
  }),
}))

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByText(/SafeSpace/i)).toBeInTheDocument()
  })
})