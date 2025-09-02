import React, { createContext, useContext, useState } from 'react';
import Toast, { ToastContainer } from '../components/Toast';

// Create context
const ToastContext = createContext();

// Toast provider component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  
  // Add a new toast
  const addToast = (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);
    return id;
  };
  
  // Remove a toast by ID
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  
  // Helper methods for different toast types
  const success = (message, options = {}) => 
    addToast({ type: 'success', message, ...options });
  
  const error = (message, options = {}) => 
    addToast({ type: 'error', message, ...options });
  
  const warning = (message, options = {}) => 
    addToast({ type: 'warning', message, ...options });
  
  const info = (message, options = {}) => 
    addToast({ type: 'info', message, ...options });
  
  // Context value
  const value = {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };
  
  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Custom hook for using the toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;
