import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const sizes = {
  xs: 'h-4 w-4',
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16'
};

const variants = {
  spinner: ({ size, color, className }) => (
    <svg 
      className={`animate-spin ${sizes[size]} ${className}`} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      ></circle>
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  ),
  
  pulse: ({ size, color, className }) => (
    <div 
      className={`${sizes[size]} ${className} rounded-full bg-current opacity-75 animate-pulse`}
      aria-hidden="true"
    ></div>
  ),
  
  dots: ({ size, color, className }) => {
    const dotSize = {
      xs: 'h-1 w-1',
      sm: 'h-1.5 w-1.5',
      md: 'h-2 w-2',
      lg: 'h-3 w-3',
      xl: 'h-4 w-4'
    };
    
    return (
      <div className={`flex space-x-1 ${className}`} aria-hidden="true">
        <div className={`${dotSize[size]} rounded-full bg-current animate-bounce`} style={{ animationDelay: '0ms' }}></div>
        <div className={`${dotSize[size]} rounded-full bg-current animate-bounce`} style={{ animationDelay: '150ms' }}></div>
        <div className={`${dotSize[size]} rounded-full bg-current animate-bounce`} style={{ animationDelay: '300ms' }}></div>
      </div>
    );
  },
  
  progress: ({ size, color, className, progress = 0 }) => (
    <div className={`relative ${className}`} role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
      <div className={`${sizes[size]} rounded-full bg-current opacity-25`}></div>
      <div 
        className={`absolute top-0 left-0 ${sizes[size]} rounded-full bg-current transition-all duration-300 ease-in-out`}
        style={{ 
          clipPath: `inset(0 ${100 - progress}% 0 0)`,
        }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-medium">{progress}%</span>
      </div>
    </div>
  )
};

const LoadingIndicator = ({ 
  variant = 'spinner', 
  size = 'md', 
  color = 'current',
  className = '',
  label = 'Loading...',
  progress,
  showLabel = false,
  center = false
}) => {
  const { isDark } = useTheme();
  
  // Get the appropriate variant component
  const VariantComponent = variants[variant] || variants.spinner;
  
  // Determine color class based on the color prop and theme
  const getColorClass = () => {
    if (color === 'current') return 'text-current';
    
    const colorMap = {
      primary: isDark ? 'text-primary-light' : 'text-primary-DEFAULT',
      accent: isDark ? 'text-accent-light' : 'text-accent-DEFAULT',
      white: 'text-text-white',
      gray: isDark ? 'text-gray-400' : 'text-gray-600',
    };
    
    return colorMap[color] || 'text-current';
  };
  
  const colorClass = getColorClass();
  const wrapperClasses = center ? 'flex flex-col items-center justify-center' : '';
  
  return (
    <div className={wrapperClasses}>
      <VariantComponent 
        size={size} 
        color={color} 
        className={`${colorClass} ${className}`}
        progress={progress}
      />
      
      {showLabel && (
        <span className={`mt-2 text-sm ${colorClass}`} aria-live="polite">
          {label}
        </span>
      )}
      
      {/* Visually hidden text for screen readers */}
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default LoadingIndicator;
