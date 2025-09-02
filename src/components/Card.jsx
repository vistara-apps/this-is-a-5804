import React from 'react'

const Card = ({ children, variant = 'default', className = '', ...props }) => {
  const baseClasses = 'rounded-lg p-6 transition-all duration-200'
  
  const variants = {
    default: 'bg-surface shadow-card',
    highlighted: 'bg-surface shadow-card border-2 border-accent',
    glass: 'glass-card text-white'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${className}`
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Card