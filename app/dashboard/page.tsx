'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [serviceName, setServiceName] = useState('')
  const [trialEndDate, setTrialEndDate] = useState('')
  const [reminderCount, setReminderCount] = useState(0)
  const [userPlan, setUserPlan] = useState('free') // 'free' or 'pro'
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [reminders, setReminders] = useState([])
  const [user, setUser] = useState<{ email: string; id: string } | null>(null)

  // Load user and reminders on component mount
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      const userData = JSON.parse(currentUser)
      setUser(userData)
      loadUserReminders(userData.email)
    }
  }, [])

  const loadUserReminders = async (email: string) => {
    try {
      const response = await fetch(`/api/create-reminder?email=${encodeURIComponent(email)}`)
      if (response.ok) {
        const data = await response.json()
        setReminderCount(data.total || 0)
        setReminders(data.reminders || [])
      }
    } catch (error) {
      console.error('Failed to load reminders:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    // Basic validation
    if (!serviceName || !trialEndDate) {
      setMessage('❌ Please fill in service name and trial end date')
      setIsLoading(false)
      return
    }

    // Check reminder limit for free users
    if (userPlan === 'free' && reminderCount >= 1) {
      setMessage('❌ Free plan allows only 1 reminder. Upgrade to Pro for unlimited reminders.')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/create-reminder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          serviceName, 
          trialEndDate, 
          email: user?.email,
          userPlan
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        setMessage('❌ ' + errorData.error)
        return
      }
      
      const result = await response.json()
      setMessage('✅ ' + result.message)
      
      // Clear form on success
      setServiceName('')
      setTrialEndDate('')
      
      // Refresh reminders list
      if (user?.email) {
        loadUserReminders(user.email)
      }
      
    } catch (error) {
      console.error('Create reminder error:', error)
      setMessage('❌ Network error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 bg-white shadow-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4 sm:py-5">
            <Link 
              href="/"
              className="text-lg sm:text-xl font-bold tracking-widest text-gray-900 cursor-pointer transition-all duration-300 ease-in-out"
              style={{
                transform: 'scale(1)',
                transition: 'all 0.3s ease-in-out'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              CH
            </Link>
            <div className="flex items-center space-x-4 sm:space-x-8">
              <span className="text-sm sm:text-base text-gray-600">
                {user?.email}
              </span>
              <button 
                onClick={() => {
                  localStorage.removeItem('currentUser')
                  window.location.href = '/'
                }}
                className="text-sm sm:text-base text-gray-600 transition-all duration-300 ease-in-out transform cursor-pointer"
                style={{
                  transform: 'scale(1)',
                  transition: 'all 0.3s ease-in-out'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = 'scale(1)';
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-white">


        {/* Add Reminder Form */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 lg:mb-10">
                Add New Reminder
              </h2>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Service Name */}
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">
                    Service Name
                  </label>
                  <input
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-300 ease-in-out placeholder-gray-400"
                    placeholder="e.g. Netflix, Spotify, Adobe..."
                    required
                  />
                </div>
                
                {/* Trial End Date */}
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">
                    Trial End Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={trialEndDate}
                    onChange={(e) => setTrialEndDate(e.target.value)}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-300 ease-in-out"
                    required
                  />
                </div>
                
                {/* Reminder Limit Display */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900">
                        {userPlan === 'free' ? 'Free Plan' : 'Pro Plan'}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        {userPlan === 'free' 
                          ? `${Math.max(0, 1 - reminderCount)} reminder${reminderCount >= 1 ? 's' : ''} remaining`
                          : 'Unlimited reminders'
                        }
                      </p>
                    </div>
                    {userPlan === 'free' && reminderCount >= 1 && (
                      <a 
                        href="/pricing"
                        className="text-xs sm:text-sm bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Upgrade
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Message Display */}
                {message && (
                  <div className={`p-4 sm:p-5 rounded-xl text-sm sm:text-base transition-all duration-300 ${
                    message.includes('Error') || message.includes('❌')
                      ? 'bg-red-50 text-red-700 border border-red-100' 
                      : 'bg-green-50 text-green-700 border border-green-100'
                  }`}>
                    {message}
                  </div>
                )}
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  style={{
                    transform: 'scale(1)',
                    backgroundColor: '#3b82f6',
                    transition: 'all 0.3s ease-in-out'
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      const element = e.target as HTMLElement;
                      element.style.transform = 'scale(1.02)';
                      element.style.backgroundColor = '#2563eb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    const element = e.target as HTMLElement;
                    element.style.transform = 'scale(1)';
                    element.style.backgroundColor = '#3b82f6';
                  }}
                >
                  {isLoading ? 'Creating Reminder...' : '🔔 Create Reminder'}
                </button>
              </form>
            </div>
          </div>
        </section>


      </div>
    </div>
  )
} 