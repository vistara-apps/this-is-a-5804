import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate checking for existing auth
    const savedUser = localStorage.getItem('paperproof_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Simulate login API call
    const mockUser = {
      id: '1',
      email,
      subscriptionTier: 'Basic',
      paymentStatus: 'active'
    }
    setUser(mockUser)
    localStorage.setItem('paperproof_user', JSON.stringify(mockUser))
    return mockUser
  }

  const signup = async (email, password) => {
    // Simulate signup API call
    const mockUser = {
      id: '1',
      email,
      subscriptionTier: 'Basic',
      paymentStatus: 'active'
    }
    setUser(mockUser)
    localStorage.setItem('paperproof_user', JSON.stringify(mockUser))
    return mockUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('paperproof_user')
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}