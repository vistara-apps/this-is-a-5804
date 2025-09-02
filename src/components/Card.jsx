import React, { forwardRef } from 'react'
import { useTheme } from '../contexts/ThemeContext'

const Card = forwardRef(({ 
  children, 
  variant = 'default', 
  className = '',
  elevation = 'md',
  interactive = false,
  as = 'div',
  ...props 
}, ref) => {
  const { isDark } = useTheme();
  
  // Base classes with improved accessibility
  const baseClasses = 'rounded-lg p-6 transition-all duration-200 animate-fade-in'
  
  // Enhanced variants with dark mode support
  const variants = {
    default: isDark 
      ? 'bg-surface-dark shadow-card-dark text-text-dark-primary' 
      : 'bg-surface-DEFAULT shadow-card text-text-primary',
    highlighted: isDark 
      ? 'bg-surface-dark shadow-elevated border-2 border-accent-DEFAULT text-text-dark-primary' 
      : 'bg-surface-DEFAULT shadow-elevated border-2 border-accent-DEFAULT text-text-primary',
    glass: 'glass-card text-text-white',
    outline: isDark 
      ? 'bg-transparent border border-gray-700 text-text-dark-primary' 
      : 'bg-transparent border border-gray-200 text-text-primary',
    info: isDark 
      ? 'bg-info-dark bg-opacity-20 border border-info-DEFAULT text-text-dark-primary' 
      : 'bg-info-light border border-info-DEFAULT text-text-primary',
    success: isDark 
      ? 'bg-success-dark bg-opacity-20 border border-success-DEFAULT text-text-dark-primary' 
      : 'bg-success-light border border-success-DEFAULT text-text-primary',
    warning: isDark 
      ? 'bg-warning-dark bg-opacity-20 border border-warning-DEFAULT text-text-dark-primary' 
      : 'bg-warning-light border border-warning-DEFAULT text-text-primary',
    error: isDark 
      ? 'bg-error-dark bg-opacity-20 border border-error-DEFAULT text-text-dark-primary' 
      : 'bg-error-light border border-error-DEFAULT text-text-primary',
  }
  
  // Elevation levels
  const elevations = {
    none: '',
    sm: isDark ? 'shadow-sm' : 'shadow-sm',
    md: isDark ? 'shadow-card-dark' : 'shadow-card',
    lg: isDark ? 'shadow-elevated' : 'shadow-elevated',
  }
  
  // Interactive card styles
  const interactiveClasses = interactive 
    ? 'cursor-pointer hover:shadow-elevated focus-visible:ring-2 focus-visible:ring-primary-DEFAULT focus-visible:ring-offset-2 focus-visible:outline-none' 
    : '';
  
  // Combine all classes
  const classes = `${baseClasses} ${variants[variant]} ${elevations[elevation]} ${interactiveClasses} ${className}`
  
  // Use the specified element type (div by default)
  const Component = as;
  
  return (
    <Component 
      ref={ref}
      className={classes} 
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      {children}
    </Component>
  )
})

// Display name for debugging
Card.displayName = 'Card';

export default Card
