import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { CheckCircle, Crown, Zap, Building } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'

const Subscription = () => {
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState(user?.subscriptionTier || 'Basic')
  const [billingCycle, setBillingCycle] = useState('monthly')

  const plans = [
    {
      name: 'Basic',
      icon: <Zap className="h-8 w-8" />,
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        '5 papers per month',
        'Basic validation reports',
        'Email support',
        'Standard processing speed',
        'Core AI analysis'
      ],
      limitations: [
        'Limited to 5 papers/month',
        'Basic support only'
      ]
    },
    {
      name: 'Pro',
      icon: <Crown className="h-8 w-8" />,
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: [
        '20 papers per month',
        'Detailed validation reports',
        'Priority support',
        'Advanced analytics',
        'Custom validation options',
        'API access',
        'Faster processing'
      ],
      limitations: [],
      popular: true
    },
    {
      name: 'Enterprise',
      icon: <Building className="h-8 w-8" />,
      monthlyPrice: 'Custom',
      yearlyPrice: 'Custom',
      features: [
        'Unlimited papers',
        'Custom integrations',
        'Dedicated support',
        'White-label options',
        'Advanced AI models',
        'Team collaboration',
        'Custom workflows',
        'SLA guarantees'
      ],
      limitations: [],
      isCustom: true
    }
  ]

  const getCurrentUsage = () => {
    return {
      papersUsed: 3,
      papersLimit: user?.subscriptionTier === 'Basic' ? 5 : user?.subscriptionTier === 'Pro' ? 20 : 'Unlimited',
      resetDate: '2024-02-01'
    }
  }

  const usage = getCurrentUsage()

  const handlePlanSelect = (planName) => {
    setSelectedPlan(planName)
  }

  const handleUpgrade = (planName) => {
    // Simulate subscription change
    alert(`Upgrading to ${planName} plan... (This would integrate with Stripe in production)`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Subscription Management</h1>
        <p className="text-gray-200">
          Manage your subscription and view usage analytics
        </p>
      </div>

      {/* Current Plan & Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card variant="glass">
          <h2 className="text-xl font-semibold text-white mb-4">Current Plan</h2>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white">{user?.subscriptionTier}</h3>
              <p className="text-gray-200">Status: {user?.paymentStatus}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-accent">
                ${user?.subscriptionTier === 'Basic' ? '29' : '79'}
              </p>
              <p className="text-sm text-gray-200">per month</p>
            </div>
          </div>
          <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-gray-900">
            Manage Billing
          </Button>
        </Card>

        <Card variant="glass">
          <h2 className="text-xl font-semibold text-white mb-4">Usage This Month</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-200 mb-2">
                <span>Papers Validated</span>
                <span>{usage.papersUsed} / {usage.papersLimit}</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-3">
                <div 
                  className="bg-accent h-3 rounded-full transition-all duration-300" 
                  style={{ 
                    width: `${typeof usage.papersLimit === 'number' ? (usage.papersUsed / usage.papersLimit) * 100 : 15}%` 
                  }}
                ></div>
              </div>
            </div>
            <div className="text-sm text-gray-200">
              <p>Usage resets on {new Date(usage.resetDate).toLocaleDateString()}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-white bg-opacity-10 rounded-lg p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-accent text-white'
                : 'text-gray-200 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              billingCycle === 'yearly'
                ? 'bg-accent text-white'
                : 'text-gray-200 hover:text-white'
            }`}
          >
            Yearly (Save 20%)
          </button>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            variant={plan.popular ? 'highlighted' : 'glass'}
            className={`relative ${plan.popular ? 'border-2 border-accent' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <div className={`inline-flex p-3 rounded-full mb-4 ${
                plan.popular ? 'bg-accent text-white' : 'bg-white bg-opacity-20 text-white'
              }`}>
                {plan.icon}
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-text-primary' : 'text-white'}`}>
                {plan.name}
              </h3>
              <div className={`text-4xl font-bold ${plan.popular ? 'text-text-primary' : 'text-white'}`}>
                {typeof plan.monthlyPrice === 'number' ? (
                  <>
                    ${billingCycle === 'monthly' ? plan.monthlyPrice : Math.round(plan.yearlyPrice / 12)}
                    <span className="text-lg font-normal">/month</span>
                  </>
                ) : (
                  <span className="text-2xl">Custom Pricing</span>
                )}
              </div>
              {billingCycle === 'yearly' && typeof plan.yearlyPrice === 'number' && (
                <p className={`text-sm mt-1 ${plan.popular ? 'text-text-secondary' : 'text-gray-200'}`}>
                  Billed annually at ${plan.yearlyPrice}
                </p>
              )}
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                  <span className={`${plan.popular ? 'text-text-primary' : 'text-white'}`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {plan.name === user?.subscriptionTier ? (
              <Button variant="outline" className="w-full" disabled>
                Current Plan
              </Button>
            ) : plan.isCustom ? (
              <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-gray-900">
                Contact Sales
              </Button>
            ) : (
              <Button 
                variant="accent" 
                className="w-full"
                onClick={() => handleUpgrade(plan.name)}
              >
                {user?.subscriptionTier === 'Basic' && plan.name === 'Pro' ? 'Upgrade' : 'Select Plan'}
              </Button>
            )}
          </Card>
        ))}
      </div>

      {/* Usage Analytics */}
      <div className="mt-12">
        <Card variant="glass">
          <h2 className="text-xl font-semibold text-white mb-6">Usage Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-accent">12</p>
              <p className="text-gray-200">Total Papers Validated</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-accent">87.3%</p>
              <p className="text-gray-200">Average Validation Score</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-accent">3.2min</p>
              <p className="text-gray-200">Average Processing Time</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Subscription