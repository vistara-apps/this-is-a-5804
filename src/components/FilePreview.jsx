import React, { useState, useEffect } from 'react';
import { FileText, X, Download, Eye, Trash2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Button from './Button';
import Card from './Card';
import Typography from './Typography';

const FilePreview = ({
  file,
  onRemove,
  showPreview = true,
  showDownload = true,
  showDelete = true,
  className = '',
  ...props
}) => {
  const { isDark } = useTheme();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileInfo, setFileInfo] = useState({
    name: '',
    size: 0,
    type: '',
    extension: '',
  });

  // Extract file information
  useEffect(() => {
    if (!file) return;

    const extension = file.name.split('.').pop().toLowerCase();
    
    setFileInfo({
      name: file.name,
      size: file.size,
      type: file.type,
      extension,
    });

    // Create preview URL for supported file types
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Clean up URL when component unmounts
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get icon based on file type
  const getFileIcon = () => {
    if (fileInfo.type.startsWith('image/')) {
      return previewUrl ? (
        <img 
          src={previewUrl} 
          alt={fileInfo.name} 
          className="h-16 w-16 object-cover rounded-md"
        />
      ) : (
        <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
          <FileText className="h-8 w-8 text-gray-500 dark:text-gray-400" />
        </div>
      );
    }
    
    return (
      <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
        <FileText className="h-8 w-8 text-gray-500 dark:text-gray-400" />
      </div>
    );
  };

  // Handle file download
  const handleDownload = () => {
    if (!file) return;
    
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle file preview
  const handlePreview = () => {
    if (!file) return;
    
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
    URL.revokeObjectURL(url);
  };

  if (!file) return null;

  return (
    <Card 
      variant={isDark ? 'outline' : 'default'}
      className={`overflow-hidden ${className}`}
      {...props}
    >
      <div className="flex items-center">
        {/* File icon or preview */}
        {getFileIcon()}
        
        {/* File information */}
        <div className="ml-4 flex-1 min-w-0">
          <Typography variant="subtitle2" noWrap title={fileInfo.name}>
            {fileInfo.name}
          </Typography>
          <Typography variant="caption" color="secondary">
            {formatFileSize(fileInfo.size)} • {fileInfo.extension.toUpperCase()}
          </Typography>
        </div>
        
        {/* Actions */}
        <div className="flex space-x-2 ml-4">
          {showPreview && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handlePreview}
              ariaLabel="Preview file"
              icon={<Eye className="h-4 w-4" />}
            />
          )}
          
          {showDownload && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleDownload}
              ariaLabel="Download file"
              icon={<Download className="h-4 w-4" />}
            />
          )}
          
          {showDelete && onRemove && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onRemove}
              ariaLabel="Remove file"
              icon={<Trash2 className="h-4 w-4 text-error-DEFAULT" />}
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default FilePreview;
