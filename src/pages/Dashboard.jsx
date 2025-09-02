import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FileText, Upload, BarChart3, Clock, CheckCircle, AlertTriangle } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'

const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    pendingValidations: 0,
    completedValidations: 0,
    averageScore: 0
  })
  const [recentSubmissions, setRecentSubmissions] = useState([])

  useEffect(() => {
    // Simulate loading dashboard data
    setStats({
      totalSubmissions: 12,
      pendingValidations: 3,
      completedValidations: 9,
      averageScore: 87.3
    })

    setRecentSubmissions([
      {
        id: '1',
        title: 'Quantum Entanglement in Neural Networks',
        status: 'completed',
        score: 92.5,
        uploadDate: '2024-01-15',
        reportUrl: '#'
      },
      {
        id: '2',
        title: 'Dark Matter Detection Using Machine Learning',
        status: 'processing',
        score: null,
        uploadDate: '2024-01-14',
        reportUrl: null
      },
      {
        id: '3',
        title: 'String Theory Applications in Computer Science',
        status: 'completed',
        score: 78.2,
        uploadDate: '2024-01-13',
        reportUrl: '#'
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.email}
        </h1>
        <p className="text-gray-200">
          Subscription: {user?.subscriptionTier} Plan
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card variant="glass">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-accent mr-3" />
            <div>
              <p className="text-sm text-gray-200">Total Submissions</p>
              <p className="text-2xl font-bold text-white">{stats.totalSubmissions}</p>
            </div>
          </div>
        </Card>

        <Card variant="glass">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm text-gray-200">Pending</p>
              <p className="text-2xl font-bold text-white">{stats.pendingValidations}</p>
            </div>
          </div>
        </Card>

        <Card variant="glass">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-accent mr-3" />
            <div>
              <p className="text-sm text-gray-200">Completed</p>
              <p className="text-2xl font-bold text-white">{stats.completedValidations}</p>
            </div>
          </div>
        </Card>

        <Card variant="glass">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-primary mr-3" />
            <div>
              <p className="text-sm text-gray-200">Average Score</p>
              <p className="text-2xl font-bold text-white">{stats.averageScore}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card variant="glass">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/upload">
              <Button variant="accent" className="w-full justify-start">
                <Upload className="h-5 w-5 mr-2" />
                Upload New Paper
              </Button>
            </Link>
            <Link to="/reports">
              <Button variant="outline" className="w-full justify-start text-white border-white hover:bg-white hover:text-gray-900">
                <BarChart3 className="h-5 w-5 mr-2" />
                View All Reports
              </Button>
            </Link>
          </div>
        </Card>

        <Card variant="glass">
          <h2 className="text-xl font-semibold text-white mb-4">Usage This Month</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-200 mb-1">
                <span>Papers Validated</span>
                <span>3 / {user?.subscriptionTier === 'Basic' ? '5' : '20'}</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-accent h-2 rounded-full" 
                  style={{ width: `${(3 / (user?.subscriptionTier === 'Basic' ? 5 : 20)) * 100}%` }}
                ></div>
              </div>
            </div>
            <Link to="/subscription">
              <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-gray-900">
                Upgrade Plan
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Recent Submissions */}
      <Card variant="glass">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Submissions</h2>
        <div className="space-y-4">
          {recentSubmissions.map((submission) => (
            <div key={submission.id} className="flex items-center justify-between p-4 bg-white bg-opacity-10 rounded-lg">
              <div className="flex items-center space-x-4">
                {getStatusIcon(submission.status)}
                <div>
                  <h3 className="font-medium text-white">{submission.title}</h3>
                  <p className="text-sm text-gray-200">
                    Uploaded on {new Date(submission.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {submission.score && (
                  <div className="text-right">
                    <p className={`font-semibold ${getScoreColor(submission.score)}`}>
                      {submission.score}%
                    </p>
                    <p className="text-xs text-gray-200">Validation Score</p>
                  </div>
                )}
                {submission.reportUrl && (
                  <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-gray-900">
                    View Report
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Dashboard