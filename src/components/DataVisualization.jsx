import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Typography from './Typography';
import Tooltip from './Tooltip';

// Bar Chart Component
export const BarChart = ({
  data = [],
  height = 200,
  barWidth = 40,
  spacing = 20,
  showValues = true,
  showLabels = true,
  showGrid = true,
  gridLines = 5,
  maxValue = null,
  minValue = 0,
  valueFormatter = (value) => value,
  colorMap = {},
  className = '',
  ...props
}) => {
  const { isDark } = useTheme();
  
  // Calculate max value if not provided
  const calculatedMax = maxValue || Math.max(...data.map(item => item.value), 0);
  
  // Calculate chart dimensions
  const chartWidth = data.length * (barWidth + spacing) - spacing;
  
  // Get color for a bar
  const getBarColor = (value, label) => {
    // If color is specified in the data item, use it
    if (colorMap[label]) return colorMap[label];
    
    // Otherwise, use a color based on the value
    if (value >= 90) return isDark ? 'rgba(16, 185, 129, 0.8)' : 'rgba(16, 185, 129, 0.8)';
    if (value >= 75) return isDark ? 'rgba(245, 158, 11, 0.8)' : 'rgba(245, 158, 11, 0.8)';
    return isDark ? 'rgba(239, 68, 68, 0.8)' : 'rgba(239, 68, 68, 0.8)';
  };
  
  return (
    <div className={`w-full ${className}`} {...props}>
      <div className="relative" style={{ height: `${height}px`, width: `${chartWidth}px` }}>
        {/* Grid lines */}
        {showGrid && Array.from({ length: gridLines }).map((_, i) => {
          const lineValue = (calculatedMax - minValue) * (i / (gridLines - 1)) + minValue;
          const yPos = height - ((lineValue - minValue) / (calculatedMax - minValue)) * height;
          
          return (
            <div 
              key={i}
              className={`absolute left-0 right-0 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
              style={{ top: `${yPos}px` }}
            >
              {i > 0 && i < gridLines - 1 && (
                <span className={`absolute -left-8 -top-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {valueFormatter(lineValue)}
                </span>
              )}
            </div>
          );
        })}
        
        {/* Bars */}
        <div className="absolute bottom-0 left-0 flex items-end">
          {data.map((item, index) => {
            const barHeight = ((item.value - minValue) / (calculatedMax - minValue)) * height;
            const barColor = getBarColor(item.value, item.label);
            
            return (
              <div 
                key={index} 
                className="flex flex-col items-center"
                style={{ marginRight: index === data.length - 1 ? 0 : `${spacing}px` }}
              >
                <Tooltip
                  content={
                    <div>
                      <Typography variant="subtitle2">{item.label}</Typography>
                      <Typography variant="body2">{valueFormatter(item.value)}</Typography>
                    </div>
                  }
                >
                  <div 
                    className="rounded-t transition-all duration-300 hover:opacity-80"
                    style={{ 
                      height: `${barHeight}px`, 
                      width: `${barWidth}px`,
                      backgroundColor: barColor,
                    }}
                  />
                </Tooltip>
                
                {showValues && (
                  <Typography 
                    variant="caption" 
                    className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    {valueFormatter(item.value)}
                  </Typography>
                )}
                
                {showLabels && (
                  <Typography 
                    variant="caption" 
                    className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                    noWrap
                    title={item.label}
                    style={{ maxWidth: `${barWidth + spacing}px` }}
                  >
                    {item.label}
                  </Typography>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Radar Chart Component
export const RadarChart = ({
  data = [],
  size = 300,
  levels = 5,
  showLabels = true,
  showValues = false,
  maxValue = null,
  valueFormatter = (value) => value,
  className = '',
  ...props
}) => {
  const { isDark } = useTheme();
  
  // Calculate max value if not provided
  const calculatedMax = maxValue || Math.max(...data.map(item => item.value), 0);
  
  // Calculate chart dimensions
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.4; // Leave some space for labels
  
  // Calculate points for each data item
  const calculatePoint = (index, value) => {
    const angle = (Math.PI * 2 * index) / data.length;
    const normalizedValue = value / calculatedMax;
    const x = centerX + radius * normalizedValue * Math.sin(angle);
    const y = centerY - radius * normalizedValue * Math.cos(angle);
    return { x, y };
  };
  
  // Generate polygon points for the data
  const polygonPoints = data
    .map((item, i) => {
      const point = calculatePoint(i, item.value);
      return `${point.x},${point.y}`;
    })
    .join(' ');
  
  // Generate level circles
  const levelCircles = Array.from({ length: levels }).map((_, i) => {
    const levelRadius = (radius * (i + 1)) / levels;
    return { radius: levelRadius, value: (calculatedMax * (i + 1)) / levels };
  });
  
  return (
    <div className={`w-full ${className}`} {...props}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Level circles */}
        {levelCircles.map((level, i) => (
          <circle
            key={i}
            cx={centerX}
            cy={centerY}
            r={level.radius}
            fill="none"
            stroke={isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
            strokeWidth="1"
          />
        ))}
        
        {/* Axis lines */}
        {data.map((_, i) => {
          const angle = (Math.PI * 2 * i) / data.length;
          const x = centerX + radius * Math.sin(angle);
          const y = centerY - radius * Math.cos(angle);
          
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke={isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
              strokeWidth="1"
            />
          );
        })}
        
        {/* Data polygon */}
        <polygon
          points={polygonPoints}
          fill={isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.2)'}
          stroke={isDark ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.8)'}
          strokeWidth="2"
        />
        
        {/* Data points */}
        {data.map((item, i) => {
          const point = calculatePoint(i, item.value);
          
          return (
            <g key={i}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill={isDark ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.8)'}
              />
              
              {/* Labels */}
              {showLabels && (
                <text
                  x={calculatePoint(i, calculatedMax * 1.1).x}
                  y={calculatePoint(i, calculatedMax * 1.1).y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'}
                  fontSize="12"
                >
                  {item.label}
                </text>
              )}
              
              {/* Values */}
              {showValues && (
                <text
                  x={point.x}
                  y={point.y - 10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'}
                  fontSize="10"
                >
                  {valueFormatter(item.value)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// Progress Bar Component
export const ProgressBar = ({
  value = 0,
  maxValue = 100,
  minValue = 0,
  height = 8,
  showValue = true,
  valueFormatter = (value) => `${value}%`,
  colorMap = {},
  className = '',
  ...props
}) => {
  const { isDark } = useTheme();
  
  // Normalize value
  const normalizedValue = Math.min(Math.max(value, minValue), maxValue);
  const percentage = ((normalizedValue - minValue) / (maxValue - minValue)) * 100;
  
  // Get color based on value
  const getColor = () => {
    // If color is specified in the colorMap, use it
    if (colorMap[value]) return colorMap[value];
    
    // Otherwise, use a color based on the value
    if (percentage >= 90) return isDark ? 'bg-success-dark' : 'bg-success-DEFAULT';
    if (percentage >= 75) return isDark ? 'bg-warning-dark' : 'bg-warning-DEFAULT';
    return isDark ? 'bg-error-dark' : 'bg-error-DEFAULT';
  };
  
  return (
    <div className={`w-full ${className}`} {...props}>
      <div className="flex items-center">
        <div className="flex-1 mr-2">
          <div 
            className={`w-full rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}
            style={{ height: `${height}px` }}
          >
            <div
              className={`rounded-full ${getColor()}`}
              style={{ 
                width: `${percentage}%`,
                height: '100%',
                transition: 'width 0.5s ease-in-out',
              }}
            />
          </div>
        </div>
        
        {showValue && (
          <Typography 
            variant="caption" 
            className={`ml-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
          >
            {valueFormatter(value)}
          </Typography>
        )}
      </div>
    </div>
  );
};

// Score Card Component
export const ScoreCard = ({
  value = 0,
  maxValue = 100,
  minValue = 0,
  label,
  description,
  size = 'md',
  showValue = true,
  valueFormatter = (value) => `${value}%`,
  className = '',
  ...props
}) => {
  const { isDark } = useTheme();
  
  // Normalize value
  const normalizedValue = Math.min(Math.max(value, minValue), maxValue);
  const percentage = ((normalizedValue - minValue) / (maxValue - minValue)) * 100;
  
  // Get color based on value
  const getColor = () => {
    if (percentage >= 90) return isDark ? 'text-success-light' : 'text-success-DEFAULT';
    if (percentage >= 75) return isDark ? 'text-warning-light' : 'text-warning-DEFAULT';
    return isDark ? 'text-error-light' : 'text-error-DEFAULT';
  };
  
  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'p-3',
          value: 'text-2xl',
          label: 'text-sm',
        };
      case 'lg':
        return {
          container: 'p-6',
          value: 'text-5xl',
          label: 'text-lg',
        };
      case 'md':
      default:
        return {
          container: 'p-4',
          value: 'text-3xl',
          label: 'text-base',
        };
    }
  };
  
  const sizeClasses = getSizeClasses();
  
  return (
    <div 
      className={`rounded-lg ${isDark ? 'bg-surface-dark' : 'bg-surface-DEFAULT'} ${sizeClasses.container} ${className}`}
      {...props}
    >
      <div className="flex flex-col items-center text-center">
        {showValue && (
          <Typography 
            variant="display" 
            className={`${getColor()} ${sizeClasses.value} font-bold`}
          >
            {valueFormatter(value)}
          </Typography>
        )}
        
        {label && (
          <Typography 
            variant="subtitle1" 
            className={`mt-2 ${sizeClasses.label}`}
          >
            {label}
          </Typography>
        )}
        
        {description && (
          <Typography 
            variant="body2" 
            color="secondary"
            className="mt-1"
          >
            {description}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default {
  BarChart,
  RadarChart,
  ProgressBar,
  ScoreCard,
};
