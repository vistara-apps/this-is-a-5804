import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { 
  FileText, 
  LogOut, 
  User, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  LayoutDashboard, 
  Upload, 
  BarChart, 
  CreditCard 
} from 'lucide-react'
import Button from './Button'

const AppBar = () => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for AppBar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Navigation items
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5 md:h-4 md:w-4" /> },
    { path: '/upload', label: 'Upload', icon: <Upload className="h-5 w-5 md:h-4 md:w-4" /> },
    { path: '/reports', label: 'Reports', icon: <BarChart className="h-5 w-5 md:h-4 md:w-4" /> },
    { path: '/subscription', label: 'Subscription', icon: <CreditCard className="h-5 w-5 md:h-4 md:w-4" /> },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 glass-card transition-all duration-300 ${
        scrolled ? 'shadow-lg backdrop-blur-md' : ''
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/dashboard" 
            className="flex items-center space-x-2"
            aria-label="PaperProof AI Dashboard"
          >
            <FileText className="h-8 w-8 text-text-white" />
            <span className="text-xl font-bold text-text-white">PaperProof AI</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`flex items-center space-x-1 text-text-white hover:text-accent-light transition-colors py-1 px-2 rounded-md ${
                  location.pathname === item.path ? 'bg-white bg-opacity-10' : ''
                }`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop User Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-text-white hover:bg-white hover:bg-opacity-10 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            {/* User Info */}
            <div className="flex items-center space-x-2 text-text-white">
              <User className="h-4 w-4" />
              <span className="text-sm">{user?.email}</span>
            </div>
            
            {/* Logout Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-text-white border-white hover:bg-white hover:text-gray-900"
              icon={<LogOut className="h-4 w-4" />}
              ariaLabel="Logout"
            >
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-text-white hover:bg-white hover:bg-opacity-10 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-text-white hover:bg-white hover:bg-opacity-10 transition-colors"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-card animate-slide-down">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {/* Navigation Links */}
            <nav className="flex flex-col space-y-2" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`flex items-center space-x-3 text-text-white hover:text-accent-light transition-colors p-3 rounded-md ${
                    location.pathname === item.path ? 'bg-white bg-opacity-10' : ''
                  }`}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.icon}
                  <span className="text-base">{item.label}</span>
                </Link>
              ))}
            </nav>
            
            {/* User Info */}
            <div className="flex items-center space-x-2 text-text-white p-3">
              <User className="h-5 w-5" />
              <span>{user?.email}</span>
            </div>
            
            {/* Logout Button */}
            <Button
              variant="outline"
              size="md"
              onClick={handleLogout}
              className="w-full text-text-white border-white hover:bg-white hover:text-gray-900"
              icon={<LogOut className="h-5 w-5" />}
              ariaLabel="Logout"
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

export default AppBar
