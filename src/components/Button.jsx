import React, { forwardRef } from 'react'
import { useTheme } from '../contexts/ThemeContext'

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  isLoading = false,
  disabled = false,
  icon = null,
  iconPosition = 'left',
  fullWidth = false,
  ariaLabel,
  ...props 
}, ref) => {
  const { isDark } = useTheme();
  
  // Base classes with improved accessibility
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'
  
  // Enhanced variants with dark mode support
  const variants = {
    primary: `bg-primary-DEFAULT text-text-white hover:bg-primary-hover active:bg-primary-dark focus-visible:ring-primary-DEFAULT ${isDark ? 'focus-visible:ring-offset-bg-dark' : 'focus-visible:ring-offset-white'}`,
    secondary: `bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 focus-visible:ring-gray-500 ${isDark ? 'focus-visible:ring-offset-bg-dark' : 'focus-visible:ring-offset-white'}`,
    outline: `border ${isDark ? 'border-gray-600 text-text-dark-primary hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} bg-transparent active:bg-opacity-20 focus-visible:ring-gray-500`,
    accent: `bg-accent-DEFAULT text-text-white hover:bg-accent-hover active:bg-accent-dark focus-visible:ring-accent-DEFAULT ${isDark ? 'focus-visible:ring-offset-bg-dark' : 'focus-visible:ring-offset-white'}`,
    danger: `bg-error-DEFAULT text-text-white hover:bg-error-dark active:bg-error-dark focus-visible:ring-error-DEFAULT ${isDark ? 'focus-visible:ring-offset-bg-dark' : 'focus-visible:ring-offset-white'}`,
    ghost: `text-${isDark ? 'text-dark-primary' : 'text-primary'} hover:bg-opacity-10 hover:bg-gray-500 active:bg-opacity-20 focus-visible:ring-gray-500`,
  }
  
  // Enhanced sizes with better touch targets for mobile
  const sizes = {
    xs: 'px-2 py-1 text-xs rounded-sm',
    sm: 'px-3 py-1.5 text-sm rounded-sm min-h-[32px]',
    md: 'px-4 py-2 text-base rounded-md min-h-[40px]',
    lg: 'px-6 py-3 text-lg rounded-lg min-h-[48px]'
  }
  
  // Loading state
  const loadingClasses = isLoading ? 'relative !text-transparent' : '';
  
  // Full width option
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Combine all classes
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${loadingClasses} ${widthClasses} ${className}`
  
  return (
    <button 
      ref={ref}
      className={classes} 
      disabled={disabled || isLoading}
      aria-label={ariaLabel || undefined}
      aria-busy={isLoading}
      {...props}
    >
      {/* Icon on the left */}
      {icon && iconPosition === 'left' && !isLoading && (
        <span className="mr-2">{icon}</span>
      )}
      
      {/* Button content */}
      {children}
      
      {/* Icon on the right */}
      {icon && iconPosition === 'right' && !isLoading && (
        <span className="ml-2">{icon}</span>
      )}
      
      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
    </button>
  )
})

// Display name for debugging
Button.displayName = 'Button';

export default Button
