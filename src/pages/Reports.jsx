import React, { useState, useEffect } from 'react'
import { FileText, Download, Eye, BarChart3, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'

const Reports = () => {
  const [reports, setReports] = useState([])
  const [selectedReport, setSelectedReport] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    // Simulate loading reports data
    setReports([
      {
        id: '1',
        title: 'Quantum Entanglement in Neural Networks',
        status: 'completed',
        score: 92.5,
        uploadDate: '2024-01-15',
        validationDate: '2024-01-15',
        findings: {
          contentValidation: 95,
          methodologyReview: 88,
          dataIntegrity: 94,
          reproducibility: 93
        },
        issues: [
          { type: 'minor', description: 'Figure 3 resolution could be improved' },
          { type: 'suggestion', description: 'Consider adding error bars to experimental data' }
        ],
        recommendations: [
          'Enhance statistical analysis in Section 4.2',
          'Include additional control experiments',
          'Clarify methodology for quantum state measurement'
        ]
      },
      {
        id: '2',
        title: 'Dark Matter Detection Using Machine Learning',
        status: 'processing',
        score: null,
        uploadDate: '2024-01-14',
        validationDate: null,
        findings: null,
        issues: [],
        recommendations: []
      },
      {
        id: '3',
        title: 'String Theory Applications in Computer Science',
        status: 'completed',
        score: 78.2,
        uploadDate: '2024-01-13',
        validationDate: '2024-01-13',
        findings: {
          contentValidation: 82,
          methodologyReview: 74,
          dataIntegrity: 79,
          reproducibility: 77
        },
        issues: [
          { type: 'major', description: 'Insufficient sample size for statistical significance' },
          { type: 'minor', description: 'Missing references for key theoretical frameworks' }
        ],
        recommendations: [
          'Increase sample size to at least 1000 data points',
          'Add comprehensive literature review section',
          'Provide clearer mathematical derivations'
        ]
      },
      {
        id: '4',
        title: 'Gravitational Wave Analysis with Deep Learning',
        status: 'completed',
        score: 89.7,
        uploadDate: '2024-01-12',
        validationDate: '2024-01-12',
        findings: {
          contentValidation: 91,
          methodologyReview: 87,
          dataIntegrity: 92,
          reproducibility: 88
        },
        issues: [
          { type: 'minor', description: 'Table formatting inconsistency' }
        ],
        recommendations: [
          'Standardize table formatting throughout document',
          'Consider adding validation on independent dataset'
        ]
      }
    ])
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-accent" />
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'failed':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-accent'
    if (score >= 75) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getIssueIcon = (type) => {
    switch (type) {
      case 'major':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'minor':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'suggestion':
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />
    }
  }

  const filteredReports = reports.filter(report => {
    if (filterStatus === 'all') return true
    return report.status === filterStatus
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Validation Reports</h1>
        <p className="text-gray-200">
          View and manage your paper validation reports
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reports List */}
        <div className="lg:col-span-2">
          <Card variant="glass">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">All Reports</h2>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1 rounded-md bg-white bg-opacity-20 text-white border border-white border-opacity-30"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    selectedReport?.id === report.id
                      ? 'bg-white bg-opacity-20 border-accent'
                      : 'bg-white bg-opacity-10 border-white border-opacity-20 hover:bg-opacity-15'
                  }`}
                  onClick={() => setSelectedReport(report)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(report.status)}
                        <h3 className="font-medium text-white">{report.title}</h3>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-200">
                        <span>Uploaded: {new Date(report.uploadDate).toLocaleDateString()}</span>
                        {report.validationDate && (
                          <span>Validated: {new Date(report.validationDate).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    {report.score && (
                      <div className="text-right">
                        <p className={`text-lg font-semibold ${getScoreColor(report.score)}`}>
                          {report.score}%
                        </p>
                        <p className="text-xs text-gray-200">Overall Score</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Report Details */}
        <div>
          {selectedReport ? (
            <div className="space-y-6">
              <Card variant="glass">
                <h3 className="text-lg font-semibold text-white mb-4">Report Actions</h3>
                <div className="space-y-3">
                  <Button variant="accent" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-white border-white hover:bg-white hover:text-gray-900">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </Card>

              {selectedReport.status === 'completed' && selectedReport.findings && (
                <>
                  <Card variant="glass">
                    <h3 className="text-lg font-semibold text-white mb-4">Validation Scores</h3>
                    <div className="space-y-3">
                      {Object.entries(selectedReport.findings).map(([key, score]) => {
                        const labels = {
                          contentValidation: 'Content Validation',
                          methodologyReview: 'Methodology Review',
                          dataIntegrity: 'Data Integrity',
                          reproducibility: 'Reproducibility'
                        }
                        
                        return (
                          <div key={key}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-200">{labels[key]}</span>
                              <span className={`font-medium ${getScoreColor(score)}`}>{score}%</span>
                            </div>
                            <div className="w-full bg-gray-600 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${score >= 90 ? 'bg-accent' : score >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                style={{ width: `${score}%` }}
                              ></div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </Card>

                  {selectedReport.issues.length > 0 && (
                    <Card variant="glass">
                      <h3 className="text-lg font-semibold text-white mb-4">Issues Found</h3>
                      <div className="space-y-3">
                        {selectedReport.issues.map((issue, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            {getIssueIcon(issue.type)}
                            <div>
                              <p className="text-sm text-white">{issue.description}</p>
                              <p className="text-xs text-gray-300 capitalize">{issue.type}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {selectedReport.recommendations.length > 0 && (
                    <Card variant="glass">
                      <h3 className="text-lg font-semibold text-white mb-4">Recommendations</h3>
                      <div className="space-y-2">
                        {selectedReport.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-white">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </>
              )}

              {selectedReport.status === 'processing' && (
                <Card variant="glass">
                  <h3 className="text-lg font-semibold text-white mb-4">Processing Status</h3>
                  <div className="text-center py-4">
                    <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                    <p className="text-white">AI validation in progress...</p>
                    <p className="text-sm text-gray-200">Estimated completion: 5-10 minutes</p>
                  </div>
                </Card>
              )}
            </div>
          ) : (
            <Card variant="glass">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-white">Select a report to view details</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default Reports