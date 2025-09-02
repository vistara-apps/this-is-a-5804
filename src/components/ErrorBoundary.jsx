import React, { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';
import Card from './Card';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
    
    // If onError callback is provided, call it
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null
    });
    
    // If onReset callback is provided, call it
    if (this.props.onReset) {
      this.props.onReset();
    }
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { 
      children, 
      fallback,
      showReset = true,
      resetButtonText = 'Try Again',
      showErrorDetails = process.env.NODE_ENV === 'development'
    } = this.props;

    if (hasError) {
      // If a custom fallback is provided, use it
      if (fallback) {
        return typeof fallback === 'function' 
          ? fallback({ error, errorInfo, reset: this.handleReset })
          : fallback;
      }

      // Default error UI
      return (
        <div className="flex items-center justify-center min-h-[200px] p-4">
          <Card variant="error" className="w-full max-w-lg">
            <div className="flex flex-col items-center text-center">
              <AlertTriangle className="h-12 w-12 text-error-DEFAULT mb-4" />
              <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
              <p className="text-sm mb-6">
                {error?.message || 'An unexpected error occurred. Please try again later.'}
              </p>
              
              {showReset && (
                <Button 
                  variant="primary" 
                  onClick={this.handleReset}
                  icon={<RefreshCw className="h-4 w-4" />}
                >
                  {resetButtonText}
                </Button>
              )}
              
              {showErrorDetails && errorInfo && (
                <div className="mt-6 w-full">
                  <details className="text-left">
                    <summary className="cursor-pointer text-sm font-medium mb-2">
                      Error Details (Developer Only)
                    </summary>
                    <pre className="text-xs p-3 bg-gray-100 dark:bg-gray-800 rounded overflow-auto max-h-[200px]">
                      {error?.stack}
                      {'\n\nComponent Stack:\n'}
                      {errorInfo.componentStack}
                    </pre>
                  </details>
                </div>
              )}
            </div>
          </Card>
        </div>
      );
    }

    // If there's no error, render children normally
    return children;
  }
}

export default ErrorBoundary;

// Functional component wrapper for easier usage with hooks
export const withErrorBoundary = (Component, errorBoundaryProps) => {
  const WithErrorBoundary = (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  // Set display name for debugging
  const displayName = Component.displayName || Component.name || 'Component';
  WithErrorBoundary.displayName = `withErrorBoundary(${displayName})`;
  
  return WithErrorBoundary;
};
