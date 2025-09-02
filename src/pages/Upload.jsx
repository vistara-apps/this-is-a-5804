import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useAuth } from '../contexts/AuthContext'
import { Upload as UploadIcon, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'

const Upload = () => {
  const { user } = useAuth()
  const [uploadedFile, setUploadedFile] = useState(null)
  const [validationOptions, setValidationOptions] = useState({
    physicsFocus: true,
    mathematicalValidation: true,
    dataIntegrityCheck: true,
    reproducibilityTest: true
  })
  const [uploadStatus, setUploadStatus] = useState('idle') // idle, uploading, processing, completed, error
  const [validationProgress, setValidationProgress] = useState(0)
  const [submissionId, setSubmissionId] = useState(null)

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file)
      setUploadStatus('idle')
    } else {
      alert('Please upload a PDF file only.')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  })

  const handleValidationOptionChange = (option) => {
    setValidationOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }))
  }

  const simulateAIValidation = async () => {
    const stages = [
      { name: 'Content Analysis', duration: 2000 },
      { name: 'Methodology Review', duration: 3000 },
      { name: 'Data Integrity Check', duration: 2500 },
      { name: 'Reproducibility Testing', duration: 4000 },
      { name: 'Report Generation', duration: 1500 }
    ]

    let currentProgress = 0
    
    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i]
      setValidationProgress(Math.round((i / stages.length) * 100))
      
      await new Promise(resolve => setTimeout(resolve, stage.duration))
      
      currentProgress = Math.round(((i + 1) / stages.length) * 100)
      setValidationProgress(currentProgress)
    }
  }

  const handleSubmit = async () => {
    if (!uploadedFile) return

    setUploadStatus('uploading')
    
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setUploadStatus('processing')
    setSubmissionId('sub_' + Math.random().toString(36).substr(2, 9))
    
    // Simulate AI validation process
    await simulateAIValidation()
    
    setUploadStatus('completed')
  }

  const resetUpload = () => {
    setUploadedFile(null)
    setUploadStatus('idle')
    setValidationProgress(0)
    setSubmissionId(null)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Upload Research Paper</h1>
        <p className="text-gray-200">
          Upload your physics research paper for AI-powered validation and analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Area */}
        <div className="lg:col-span-2">
          <Card variant="glass">
            <h2 className="text-xl font-semibold text-white mb-4">Paper Upload</h2>
            
            {uploadStatus === 'idle' && (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed border-white border-opacity-50 rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-accent bg-accent bg-opacity-10' : 'hover:border-accent'
                }`}
              >
                <input {...getInputProps()} />
                <UploadIcon className="h-12 w-12 text-white mx-auto mb-4" />
                {uploadedFile ? (
                  <div>
                    <p className="text-white font-medium">{uploadedFile.name}</p>
                    <p className="text-gray-200 text-sm">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-white mb-2">
                      {isDragActive ? 'Drop your PDF here' : 'Drag & drop your PDF file here'}
                    </p>
                    <p className="text-gray-200 text-sm">or click to browse files</p>
                  </div>
                )}
              </div>
            )}

            {uploadStatus === 'uploading' && (
              <div className="text-center py-8">
                <Loader className="h-12 w-12 text-accent mx-auto mb-4 animate-spin" />
                <p className="text-white">Uploading paper to secure storage...</p>
              </div>
            )}

            {uploadStatus === 'processing' && (
              <div className="text-center py-8">
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <div className="w-full h-full rounded-full border-4 border-white border-opacity-20"></div>
                    <div 
                      className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-accent transition-all duration-300"
                      style={{
                        background: `conic-gradient(from 0deg, #10b981 ${validationProgress * 3.6}deg, transparent ${validationProgress * 3.6}deg)`
                      }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold">{validationProgress}%</span>
                    </div>
                  </div>
                  <p className="text-white font-medium">AI Validation in Progress</p>
                  <p className="text-gray-200 text-sm">This may take a few minutes...</p>
                </div>
              </div>
            )}

            {uploadStatus === 'completed' && (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Validation Complete!</h3>
                <p className="text-gray-200 mb-4">
                  Your paper has been successfully analyzed. Submission ID: {submissionId}
                </p>
                <div className="flex justify-center space-x-4">
                  <Button variant="accent">
                    View Report
                  </Button>
                  <Button variant="outline" onClick={resetUpload} className="text-white border-white hover:bg-white hover:text-gray-900">
                    Upload Another
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Validation Options */}
        <div>
          <Card variant="glass">
            <h3 className="text-lg font-semibold text-white mb-4">Validation Options</h3>
            <div className="space-y-4">
              {Object.entries(validationOptions).map(([key, value]) => {
                const labels = {
                  physicsFocus: 'Physics Domain Focus',
                  mathematicalValidation: 'Mathematical Validation',
                  dataIntegrityCheck: 'Data Integrity Check',
                  reproducibilityTest: 'Reproducibility Testing'
                }
                
                return (
                  <label key={key} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleValidationOptionChange(key)}
                      className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                    />
                    <span className="text-white">{labels[key]}</span>
                  </label>
                )
              })}
            </div>

            {uploadedFile && uploadStatus === 'idle' && (
              <div className="mt-6">
                <Button 
                  variant="accent" 
                  className="w-full"
                  onClick={handleSubmit}
                >
                  Start Validation
                </Button>
              </div>
            )}
          </Card>

          <Card variant="glass" className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Usage Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-200">Current Plan:</span>
                <span className="text-white font-medium">{user?.subscriptionTier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-200">Papers This Month:</span>
                <span className="text-white font-medium">
                  3 / {user?.subscriptionTier === 'Basic' ? '5' : '20'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-200">Remaining:</span>
                <span className="text-accent font-medium">
                  {(user?.subscriptionTier === 'Basic' ? 5 : 20) - 3} papers
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Upload