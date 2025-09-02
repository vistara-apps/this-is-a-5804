import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { ToastProvider } from './contexts/ToastContext'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'
import Reports from './pages/Reports'
import Subscription from './pages/Subscription'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <div className="min-h-screen animate-fade-in">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<Layout />}>
                  <Route path="/dashboard" element={
                    <ErrorBoundary>
                      <Dashboard />
                    </ErrorBoundary>
                  } />
                  <Route path="/upload" element={
                    <ErrorBoundary>
                      <Upload />
                    </ErrorBoundary>
                  } />
                  <Route path="/reports" element={
                    <ErrorBoundary>
                      <Reports />
                    </ErrorBoundary>
                  } />
                  <Route path="/subscription" element={
                    <ErrorBoundary>
                      <Subscription />
                    </ErrorBoundary>
                  } />
                </Route>
              </Routes>
            </div>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
