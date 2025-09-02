import React, { forwardRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Typography variants
const variants = {
  h1: 'text-4xl font-bold leading-tight',
  h2: 'text-3xl font-bold leading-tight',
  h3: 'text-2xl font-semibold leading-tight',
  h4: 'text-xl font-semibold leading-tight',
  h5: 'text-lg font-semibold leading-tight',
  h6: 'text-base font-semibold leading-tight',
  subtitle1: 'text-lg font-medium leading-relaxed',
  subtitle2: 'text-base font-medium leading-relaxed',
  body1: 'text-base font-normal leading-relaxed',
  body2: 'text-sm font-normal leading-relaxed',
  caption: 'text-xs font-normal leading-normal',
  overline: 'text-xs font-medium uppercase tracking-wider leading-normal',
  display: 'text-5xl font-bold leading-tight',
};

// Typography component
const Typography = forwardRef(({
  variant = 'body1',
  component,
  color,
  align = 'inherit',
  noWrap = false,
  gutterBottom = false,
  paragraph = false,
  className = '',
  children,
  ...props
}, ref) => {
  const { isDark } = useTheme();
  
  // Determine the component to render
  const Component = component || getDefaultComponent(variant);
  
  // Get variant classes
  const variantClasses = variants[variant] || variants.body1;
  
  // Get color classes
  const colorClasses = getColorClasses(color, isDark);
  
  // Get alignment classes
  const alignClasses = align !== 'inherit' ? `text-${align}` : '';
  
  // Get other utility classes
  const utilityClasses = [
    noWrap ? 'truncate' : '',
    gutterBottom ? 'mb-2' : '',
    paragraph ? 'mb-4' : '',
  ].filter(Boolean).join(' ');
  
  // Combine all classes
  const classes = [
    variantClasses,
    colorClasses,
    alignClasses,
    utilityClasses,
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <Component ref={ref} className={classes} {...props}>
      {children}
    </Component>
  );
});

// Helper function to get the default component based on variant
function getDefaultComponent(variant) {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    case 'subtitle1':
    case 'subtitle2':
      return 'h6';
    case 'body1':
    case 'body2':
      return 'p';
    case 'caption':
    case 'overline':
      return 'span';
    case 'display':
      return 'h1';
    default:
      return 'p';
  }
}

// Helper function to get color classes
function getColorClasses(color, isDark) {
  if (!color) {
    return isDark ? 'text-text-dark-primary' : 'text-text-primary';
  }
  
  const colorMap = {
    primary: isDark ? 'text-primary-light' : 'text-primary-DEFAULT',
    secondary: isDark ? 'text-text-dark-secondary' : 'text-text-secondary',
    accent: isDark ? 'text-accent-light' : 'text-accent-DEFAULT',
    error: isDark ? 'text-error-light' : 'text-error-DEFAULT',
    warning: isDark ? 'text-warning-light' : 'text-warning-DEFAULT',
    success: isDark ? 'text-success-light' : 'text-success-DEFAULT',
    info: isDark ? 'text-info-light' : 'text-info-DEFAULT',
    white: 'text-text-white',
    inherit: 'text-inherit',
  };
  
  return colorMap[color] || color; // Return the color value if it's a custom class
}

Typography.displayName = 'Typography';

export default Typography;
