import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../contexts/ThemeContext';

const Tooltip = ({
  children,
  content,
  position = 'top',
  delay = 300,
  arrow = true,
  maxWidth = 250,
  className = '',
  contentClassName = '',
  disabled = false,
  ...props
}) => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);

  // Calculate tooltip position based on trigger element
  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;

    let top = 0;
    let left = 0;
    let arrowTop = 0;
    let arrowLeft = 0;

    // Calculate position based on specified position
    switch (position) {
      case 'top':
        top = triggerRect.top + scrollY - tooltipRect.height - 8;
        left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
        arrowTop = tooltipRect.height;
        arrowLeft = tooltipRect.width / 2 - 5;
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollY + 8;
        left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
        arrowTop = -10;
        arrowLeft = tooltipRect.width / 2 - 5;
        break;
      case 'left':
        top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.left + scrollX - tooltipRect.width - 8;
        arrowTop = tooltipRect.height / 2 - 5;
        arrowLeft = tooltipRect.width;
        break;
      case 'right':
        top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.right + scrollX + 8;
        arrowTop = tooltipRect.height / 2 - 5;
        arrowLeft = -10;
        break;
      default:
        top = triggerRect.top + scrollY - tooltipRect.height - 8;
        left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
        arrowTop = tooltipRect.height;
        arrowLeft = tooltipRect.width / 2 - 5;
    }

    // Ensure tooltip stays within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Adjust horizontal position if needed
    if (left < 10) {
      arrowLeft += left - 10;
      left = 10;
    } else if (left + tooltipRect.width > viewportWidth - 10) {
      const diff = left + tooltipRect.width - viewportWidth + 10;
      arrowLeft += diff;
      left -= diff;
    }

    // Adjust vertical position if needed
    if (top < 10) {
      arrowTop += top - 10;
      top = 10;
    } else if (top + tooltipRect.height > viewportHeight + scrollY - 10) {
      const diff = top + tooltipRect.height - viewportHeight - scrollY + 10;
      arrowTop += diff;
      top -= diff;
    }

    setTooltipPosition({ top, left });
    setArrowPosition({ top: arrowTop, left: arrowLeft });
  };

  // Show tooltip after delay
  const handleMouseEnter = () => {
    if (disabled) return;
    
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      // Calculate position after tooltip is visible
      setTimeout(calculatePosition, 0);
    }, delay);
  };

  // Hide tooltip
  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  // Recalculate position on window resize
  useEffect(() => {
    if (isVisible) {
      window.addEventListener('resize', calculatePosition);
      window.addEventListener('scroll', calculatePosition);
      
      return () => {
        window.removeEventListener('resize', calculatePosition);
        window.removeEventListener('scroll', calculatePosition);
      };
    }
  }, [isVisible]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  // Get arrow styles based on position
  const getArrowStyles = () => {
    const baseStyles = {
      position: 'absolute',
      width: '10px',
      height: '10px',
      transform: 'rotate(45deg)',
      backgroundColor: isDark ? 'hsl(222, 47%, 15%)' : 'hsl(0, 0%, 100%)',
    };

    switch (position) {
      case 'top':
        return {
          ...baseStyles,
          top: `${arrowPosition.top}px`,
          left: `${arrowPosition.left}px`,
          borderRight: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
          borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
        };
      case 'bottom':
        return {
          ...baseStyles,
          top: `${arrowPosition.top}px`,
          left: `${arrowPosition.left}px`,
          borderLeft: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
          borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
        };
      case 'left':
        return {
          ...baseStyles,
          top: `${arrowPosition.top}px`,
          left: `${arrowPosition.left}px`,
          borderRight: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
          borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
        };
      case 'right':
        return {
          ...baseStyles,
          top: `${arrowPosition.top}px`,
          left: `${arrowPosition.left}px`,
          borderLeft: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
          borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
        };
      default:
        return baseStyles;
    }
  };

  return (
    <div
      ref={triggerRef}
      className={`inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      {...props}
    >
      {children}
      
      {isVisible && createPortal(
        <div
          ref={tooltipRef}
          className={`fixed z-50 p-2 rounded-md shadow-lg text-sm ${
            isDark 
              ? 'bg-surface-dark text-text-dark-primary border border-gray-700' 
              : 'bg-surface-DEFAULT text-text-primary border border-gray-200'
          } ${contentClassName}`}
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            maxWidth,
            pointerEvents: 'none',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.2s ease-in-out',
          }}
          role="tooltip"
        >
          {content}
          {arrow && <div style={getArrowStyles()} />}
        </div>,
        document.body
      )}
    </div>
  );
};

export default Tooltip;
