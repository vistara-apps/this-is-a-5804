import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FileText, LogOut, User } from 'lucide-react'
import Button from './Button'

const AppBar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">PaperProof AI</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-white hover:text-gray-200 transition-colors">
              Dashboard
            </Link>
            <Link to="/upload" className="text-white hover:text-gray-200 transition-colors">
              Upload
            </Link>
            <Link to="/reports" className="text-white hover:text-gray-200 transition-colors">
              Reports
            </Link>
            <Link to="/subscription" className="text-white hover:text-gray-200 transition-colors">
              Subscription
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <User className="h-4 w-4" />
              <span className="text-sm">{user?.email}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-white border-white hover:bg-white hover:text-gray-900"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AppBar