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
  const [showDowngradeModal, setShowDowngradeModal] = useState(false)


  // Load user and reminders on component mount
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      const userData = JSON.parse(currentUser)
      setUser(userData)
      loadUserReminders(userData.email)
      loadUserPlan(userData.email)
      
      // Check if user just upgraded (from Stripe redirect)
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('upgrade') === 'success') {
        handleUpgradeSuccess(userData.email)
      }
    } else {
      // Redirect to login if user not authenticated
      window.location.href = '/login'
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

  const loadUserPlan = async (email: string) => {
    try {
      const response = await fetch(`/api/user-plan?email=${encodeURIComponent(email)}`)
      if (response.ok) {
        const data = await response.json()
        setUserPlan(data.plan || 'free')
        console.log('✅ DASHBOARD: Loaded user plan:', data.plan)
      } else {
        console.log('⚠️ DASHBOARD: User plan not found, defaulting to free')
        setUserPlan('free')
      }
    } catch (error) {
      console.error('Failed to load user plan:', error)
      setUserPlan('free') // Fallback to free plan on error
    }
  }

  const handleUpgradeSuccess = async (email: string) => {
    try {
      console.log('🚀 DASHBOARD: Processing upgrade success for', email)
      setMessage('🔄 Processing your upgrade...')
      
      // Update user plan to Pro in database
      const response = await fetch('/api/user-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan: 'pro' })
      })
      
      if (response.ok) {
        const data = await response.json()
        setUserPlan('pro')
        setMessage('🎉 Welcome to Pro! You now have unlimited reminders!')
        console.log('✅ DASHBOARD: Successfully upgraded to Pro')
        
        // Clean up URL after a brief delay
        setTimeout(() => {
          window.history.replaceState({}, document.title, '/dashboard')
        }, 2000)
      } else {
        console.error('Failed to update user plan')
        setMessage('⚠️ Upgrade successful but there was an issue updating your account. Please refresh the page.')
      }
    } catch (error) {
      console.error('Error processing upgrade:', error)
      setMessage('⚠️ Upgrade successful but there was an issue updating your account. Please refresh the page.')
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
    
    // Pro users have unlimited reminders - no limit check needed

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

      // ⚡ AUTO-CHECK: Check if any reminders need to be sent after creating new one
      setTimeout(() => {
        fetch('/api/auto-check-reminders')
          .then(response => response.json())
          .then(data => {
            if (data.sent > 0) {
              console.log(`🎯 AUTO-REMINDER: Sent ${data.sent} reminder email(s) automatically after reminder creation!`)
            }
          })
          .catch(() => {
            // Silent - don't interfere with main flow
          })
      }, 2000) // Check 2 seconds after reminder creation
      
    } catch (error) {
      console.error('Create reminder error:', error)
      setMessage('❌ Network error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDowngrade = () => {
    setShowDowngradeModal(true)
  }

  const confirmDowngrade = async () => {
    setShowDowngradeModal(false)
    
    try {
      setMessage('🔄 Processing downgrade...')
      
      const response = await fetch('/api/user-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email, plan: 'free' })
      })
      
      if (response.ok) {
        setUserPlan('free')
        setMessage('✅ Successfully downgraded to Free plan. Your subscription has been cancelled.')
        
        // If they have more than 1 reminder, they'll need to delete some
        if (reminderCount > 1) {
          setMessage('✅ Downgraded to Free plan. Please note: Free plan allows only 1 reminder. You currently have ' + reminderCount + ' reminders.')
        }
      } else {
        setMessage('❌ Failed to downgrade. Please try again or contact support.')
      }
    } catch (error) {
      console.error('Downgrade error:', error)
      setMessage('❌ Network error occurred. Please try again.')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (user?.email) {
        try {
          const [userResponse, remindersResponse] = await Promise.all([
            fetch(`/api/user-plan?email=${encodeURIComponent(user.email)}`),
            fetch(`/api/create-reminder?email=${encodeURIComponent(user.email)}`)
          ])

          if (userResponse.ok) {
            const userData = await userResponse.json()
            setUserPlan(userData.plan)
          }

          if (remindersResponse.ok) {
            const remindersData = await remindersResponse.json()
            setReminders(remindersData.reminders || [])
            setReminderCount(remindersData.total || 0)
          }

          // ⚡ AUTO-CHECK: Automatically check for pending reminders to send
          try {
            fetch('/api/auto-check-reminders')
              .then(response => response.json())
              .then(data => {
                if (data.sent > 0) {
                  console.log(`🎯 AUTO-REMINDER: Sent ${data.sent} reminder email(s) automatically!`)
                }
              })
              .catch(error => {
                console.log('Auto-reminder check (background):', error.message)
              })
          } catch (error) {
            // Silent - don't interfere with main dashboard loading
          }

        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }

    fetchData()
  }, [user?.email])

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 bg-white shadow-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6">
          <div className="flex justify-between items-center py-3 xs:py-4 sm:py-5">
            <Link 
              href="/"
              className="text-base xs:text-lg sm:text-xl font-bold tracking-widest text-gray-900 cursor-pointer transition-all duration-300 ease-in-out touch-manipulation min-h-[44px] xs:min-h-[48px] flex items-center"
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
            <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8">
              <Link 
                href="/settings"
                className="text-xs xs:text-sm sm:text-base text-gray-600 transition-all duration-300 ease-in-out transform cursor-pointer touch-manipulation min-h-[44px] xs:min-h-[48px] flex items-center px-2 xs:px-3 rounded-lg hover:bg-gray-50 active:bg-gray-100 active:scale-[0.98]"
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
                Settings
              </Link>
              <span className="text-xs xs:text-sm sm:text-base text-gray-600 truncate max-w-[80px] xs:max-w-[100px] sm:max-w-none">
                {user?.email}
              </span>
              <button 
                onClick={() => {
                  localStorage.removeItem('currentUser')
                  window.location.href = '/'
                }}
                className="text-xs xs:text-sm sm:text-base text-gray-600 transition-all duration-300 ease-in-out transform cursor-pointer touch-manipulation min-h-[44px] xs:min-h-[48px] flex items-center px-2 xs:px-3 rounded-lg hover:bg-gray-50 active:bg-gray-100 active:scale-[0.98]"
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
        <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 bg-white touch-manipulation">
          <div className="max-w-2xl mx-auto px-3 xs:px-4 sm:px-6">
            <div className="text-center mb-6 xs:mb-7 sm:mb-8 md:mb-10 lg:mb-12">
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10">
                Add New Reminder
              </h2>
            </div>
            
            <div className="bg-white rounded-xl xs:rounded-2xl shadow-sm border border-gray-100 p-6 xs:p-7 sm:p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-5 xs:space-y-6 sm:space-y-8">
                {/* Service Name */}
                <div>
                  <label className="block text-xs xs:text-sm sm:text-base font-semibold text-gray-900 mb-2 xs:mb-3 sm:mb-4 touch-manipulation">
                    Service Name
                  </label>
                  <input
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full px-3 xs:px-4 sm:px-5 py-3 xs:py-3.5 sm:py-4 text-sm xs:text-base border border-gray-200 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-300 ease-in-out placeholder-gray-400 touch-manipulation min-h-[44px] xs:min-h-[48px]"
                    placeholder="e.g. Netflix, Spotify, Adobe..."
                    required
                  />
                </div>
                
                {/* Trial End Date */}
                <div>
                  <label className="block text-xs xs:text-sm sm:text-base font-semibold text-gray-900 mb-2 xs:mb-3 sm:mb-4 touch-manipulation">
                    Trial End Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={trialEndDate}
                    onChange={(e) => setTrialEndDate(e.target.value)}
                    className="w-full px-3 xs:px-4 sm:px-5 py-3 xs:py-3.5 sm:py-4 text-sm xs:text-base border border-gray-200 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-300 ease-in-out touch-manipulation min-h-[44px] xs:min-h-[48px]"
                    required
                  />
                </div>
                
                {/* Reminder Limit Display */}
                <div className="bg-gray-50 rounded-lg xs:rounded-xl p-3 xs:p-4 sm:p-5 touch-manipulation">
                  <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 xs:gap-4">
                    <div className="flex-1">
                      <h4 className="text-xs xs:text-sm sm:text-base font-semibold text-gray-900">
                        {userPlan === 'free' ? 'Free Plan' : 'Pro Plan'}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        {userPlan === 'free' 
                          ? `${Math.max(0, 1 - reminderCount)} reminder${reminderCount >= 1 ? 's' : ''} remaining`
                          : 'Unlimited reminders'
                        }
                      </p>
                    </div>
                    {userPlan === 'free' && (
                      <a 
                        href="/pricing"
                        className="text-xs xs:text-sm bg-blue-500 text-white px-3 xs:px-4 py-2 xs:py-2.5 rounded-lg hover:bg-blue-600 transition-colors font-medium touch-manipulation min-h-[44px] xs:min-h-[48px] flex items-center justify-center active:scale-[0.98] whitespace-nowrap"
                      >
                        Upgrade to Pro
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Message Display */}
                {message && (
                  <div className={`p-3 xs:p-4 sm:p-5 rounded-lg xs:rounded-xl text-xs xs:text-sm sm:text-base transition-all duration-300 touch-manipulation ${
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
                  className="w-full bg-blue-500 text-white px-6 xs:px-8 sm:px-10 py-3.5 xs:py-4 sm:py-5 rounded-lg xs:rounded-xl text-sm xs:text-base sm:text-lg font-semibold transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer touch-manipulation min-h-[44px] xs:min-h-[48px] active:scale-[0.98]"
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


        {/* Apple-Style Downgrade Confirmation Modal */}
        {showDowngradeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-3 xs:p-4 touch-manipulation">
            <div className="bg-white rounded-2xl xs:rounded-3xl shadow-2xl max-w-md w-full mx-auto transform transition-all duration-300 scale-100">
              {/* Modal Header */}
              <div className="text-center pt-6 xs:pt-8 px-4 xs:px-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 xs:h-16 xs:w-16 rounded-full bg-orange-100 mb-3 xs:mb-4">
                  <svg className="h-6 w-6 xs:h-8 xs:w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg xs:text-xl font-semibold text-gray-900 mb-2">
                  Switch to Free Plan
                </h3>
                <p className="text-sm xs:text-base text-gray-600 leading-relaxed mb-4 xs:mb-6">
                  Are you sure you want to switch to the Free plan? You'll keep Pro features until your billing period ends, then have 1 reminder per month.
                </p>
              </div>
              
              {/* Modal Actions */}
              <div className="flex flex-col space-y-3 p-4 xs:p-6">
                <button
                  onClick={confirmDowngrade}
                  className="w-full bg-orange-600 text-white py-3 xs:py-3.5 px-4 rounded-lg xs:rounded-xl font-medium text-sm xs:text-base transition-all duration-300 ease-in-out hover:bg-orange-700 hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer transform touch-manipulation min-h-[44px] xs:min-h-[48px]"
                >
                  Yes, Switch to Free
                </button>
                <button
                  onClick={() => setShowDowngradeModal(false)}
                  className="w-full bg-gray-100 text-gray-700 py-3 xs:py-3.5 px-4 rounded-lg xs:rounded-xl font-medium text-sm xs:text-base transition-all duration-300 ease-in-out hover:bg-gray-200 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer transform touch-manipulation min-h-[44px] xs:min-h-[48px]"
                >
                  Keep My Pro Plan
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
} 