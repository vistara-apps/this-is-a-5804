import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Brain, BarChart3, CheckCircle } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const LandingPage = () => {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <header className="absolute top-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-white" />
                <span className="text-xl font-bold text-white">PaperProof AI</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="accent">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white mb-6">
                Automate Scientific Paper Validation with AI
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Ensure research integrity with AI-powered content validation, experiment simulation, and comprehensive validation reports.
              </p>
              <Link to="/signup">
                <Button variant="accent" size="lg">
                  Start Validating Papers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Comprehensive AI-Powered Validation
            </h2>
            <p className="text-lg text-gray-200">
              Our platform combines multiple AI techniques to ensure research integrity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card variant="glass">
              <Brain className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Content Validation</h3>
              <p className="text-gray-200">
                Analyze research papers for logical consistency, methodological soundness, and data integrity.
              </p>
            </Card>

            <Card variant="glass">
              <BarChart3 className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Experiment Simulation</h3>
              <p className="text-gray-200">
                Run simulations based on methodology and data to test reproducibility of results.
              </p>
            </Card>

            <Card variant="glass">
              <CheckCircle className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Validation Reports</h3>
              <p className="text-gray-200">
                Generate comprehensive reports with analysis, issues, and accuracy scores.
              </p>
            </Card>

            <Card variant="glass">
              <FileText className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Actionable Feedback</h3>
              <p className="text-gray-200">
                Receive specific recommendations for improving methodology and presentation.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-gray-200">
              Select the plan that fits your research validation needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card variant="glass">
              <h3 className="text-2xl font-semibold mb-4">Basic</h3>
              <div className="text-4xl font-bold mb-4">$29<span className="text-lg">/month</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                  5 papers per month
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                  Basic validation reports
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                  Email support
                </li>
              </ul>
              <Button variant="accent" className="w-full">
                Get Started
              </Button>
            </Card>

            <Card variant="highlighted" className="border-accent">
              <h3 className="text-2xl font-semibold mb-4 text-text-primary">Pro</h3>
              <div className="text-4xl font-bold mb-4 text-text-primary">$79<span className="text-lg">/month</span></div>
              <ul className="space-y-3 mb-6 text-text-primary">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                  20 papers per month
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                  Detailed validation reports
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                  Priority support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                  Advanced analytics
                </li>
              </ul>
              <Button variant="accent" className="w-full">
                Most Popular
              </Button>
            </Card>

            <Card variant="glass">
              <h3 className="text-2xl font-semibold mb-4">Enterprise</h3>
              <div className="text-4xl font-bold mb-4">Custom</div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                  Unlimited papers
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                  Custom integrations
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                  Dedicated support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                  White-label options
                </li>
              </ul>
              <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-gray-900">
                Contact Sales
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage