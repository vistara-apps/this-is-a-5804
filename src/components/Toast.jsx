import React, { useState, useEffect, forwardRef } from 'react';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Toast = forwardRef(({
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  position = 'bottom-right',
  showProgress = true,
  showIcon = true,
  showCloseButton = true,
  className = '',
  ...props
}, ref) => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  
  // Auto-close after duration
  useEffect(() => {
    if (duration === 0) return; // Don't auto-close if duration is 0
    
    const timer = setTimeout(() => {
      handleClose();
    }, duration);
    
    // Progress bar animation
    if (showProgress && duration > 0) {
      const interval = 10; // Update every 10ms
      const step = (interval / duration) * 100;
      
      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - step;
          return newProgress > 0 ? newProgress : 0;
        });
      }, interval);
      
      return () => {
        clearTimeout(timer);
        clearInterval(progressTimer);
      };
    }
    
    return () => clearTimeout(timer);
  }, [duration, showProgress]);
  
  // Handle close
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300); // Wait for animation to complete
  };
  
  // Get icon based on type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
      case 'error':
        return <AlertCircle className="h-5 w-5" />;
      case 'info':
      default:
        return <Info className="h-5 w-5" />;
    }
  };
  
  // Get position classes
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-right':
      default:
        return 'bottom-4 right-4';
    }
  };
  
  // Get type-based classes
  const getTypeClasses = () => {
    const baseClasses = isDark ? 'text-text-dark-primary' : 'text-text-primary';
    
    switch (type) {
      case 'success':
        return `${baseClasses} ${isDark ? 'bg-success-dark bg-opacity-20 border-success-DEFAULT' : 'bg-success-light border-success-DEFAULT'}`;
      case 'warning':
        return `${baseClasses} ${isDark ? 'bg-warning-dark bg-opacity-20 border-warning-DEFAULT' : 'bg-warning-light border-warning-DEFAULT'}`;
      case 'error':
        return `${baseClasses} ${isDark ? 'bg-error-dark bg-opacity-20 border-error-DEFAULT' : 'bg-error-light border-error-DEFAULT'}`;
      case 'info':
      default:
        return `${baseClasses} ${isDark ? 'bg-info-dark bg-opacity-20 border-info-DEFAULT' : 'bg-info-light border-info-DEFAULT'}`;
    }
  };
  
  // Get icon color
  const getIconColor = () => {
    switch (type) {
      case 'success':
        return 'text-success-DEFAULT';
      case 'warning':
        return 'text-warning-DEFAULT';
      case 'error':
        return 'text-error-DEFAULT';
      case 'info':
      default:
        return 'text-info-DEFAULT';
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <div
      ref={ref}
      className={`fixed z-50 ${getPositionClasses()} max-w-sm w-full shadow-lg rounded-lg border ${
        isVisible ? 'animate-fade-in' : 'animate-fade-out'
      } ${getTypeClasses()} ${className}`}
      role="alert"
      aria-live="assertive"
      {...props}
    >
      <div className="p-4">
        <div className="flex items-start">
          {showIcon && (
            <div className={`flex-shrink-0 ${getIconColor()}`}>
              {getIcon()}
            </div>
          )}
          
          <div className={`ml-${showIcon ? '3' : '0'} w-0 flex-1`}>
            {title && (
              <p className="text-sm font-medium">
                {title}
              </p>
            )}
            {message && (
              <p className={`${title ? 'mt-1' : ''} text-sm`}>
                {message}
              </p>
            )}
          </div>
          
          {showCloseButton && (
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className={`inline-flex rounded-md ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-DEFAULT p-1.5`}
                onClick={handleClose}
                aria-label="Close notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Progress bar */}
      {showProgress && duration > 0 && (
        <div 
          className={`h-1 rounded-b-lg transition-all duration-100 ease-linear ${getIconColor()}`}
          style={{ width: `${progress}%` }}
        ></div>
      )}
    </div>
  );
});

Toast.displayName = 'Toast';

export default Toast;

// Toast container component to manage multiple toasts
export const ToastContainer = ({ toasts = [], position = 'bottom-right', ...props }) => {
  return (
    <div className="fixed z-50 pointer-events-none" style={{ width: '100%', height: '100%' }}>
      <div className={`flex flex-col gap-2 ${position.includes('top') ? 'items-start' : 'items-end'}`}>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} position={position} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Toast context for global toast management
export const createToastContext = () => {
  const ToastContext = React.createContext();
  
  const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    
    const addToast = (toast) => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts((prev) => [...prev, { ...toast, id }]);
      return id;
    };
    
    const removeToast = (id) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };
    
    const value = {
      toasts,
      addToast,
      removeToast,
      success: (message, options = {}) => addToast({ type: 'success', message, ...options }),
      error: (message, options = {}) => addToast({ type: 'error', message, ...options }),
      warning: (message, options = {}) => addToast({ type: 'warning', message, ...options }),
      info: (message, options = {}) => addToast({ type: 'info', message, ...options }),
    };
    
    return (
      <ToastContext.Provider value={value}>
        {children}
        <ToastContainer 
          toasts={toasts} 
          position={toasts[0]?.position || 'bottom-right'} 
          onClose={(id) => removeToast(id)} 
        />
      </ToastContext.Provider>
    );
  };
  
  const useToast = () => {
    const context = React.useContext(ToastContext);
    if (context === undefined) {
      throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
  };
  
  return { ToastProvider, useToast };
};
