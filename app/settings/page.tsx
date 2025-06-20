'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Settings() {
  const [user, setUser] = useState<{ email: string; id: string } | null>(null)
  const [userPlan, setUserPlan] = useState<'free' | 'pro'>('free')
  const [showDowngradeModal, setShowDowngradeModal] = useState(false)

  // Load user and plan on component mount
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      const userData = JSON.parse(currentUser)
      setUser(userData)
      loadUserPlan(userData.email)
    }
  }, [])

  const loadUserPlan = async (email: string) => {
    try {
      const response = await fetch(`/api/user-plan?email=${encodeURIComponent(email)}`)
      if (response.ok) {
        const data = await response.json()
        setUserPlan(data.plan || 'free')
      }
    } catch (error) {
      console.error('Error loading user plan:', error)
    }
  }

  const handleDowngrade = () => {
    setShowDowngradeModal(true)
  }

  const confirmDowngrade = async () => {
    if (!user?.email) return

    try {
      const response = await fetch('/api/user-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          action: 'downgrade'
        }),
      })

      if (response.ok) {
        setUserPlan('free')
        setShowDowngradeModal(false)
        // Optional: Show success message or redirect
      }
    } catch (error) {
      console.error('Error downgrading plan:', error)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-3 xs:px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-lg xs:text-xl font-semibold text-gray-900 mb-4">Please sign in to access settings</h2>
          <Link href="/login" className="text-blue-600 hover:text-blue-500 touch-manipulation min-h-[44px] xs:min-h-[48px] inline-flex items-center px-3 py-2 rounded-lg hover:bg-blue-50 active:scale-[0.98] transition-all duration-300">
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 bg-white shadow-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6">
          <div className="flex justify-between items-center h-14 xs:h-16 sm:h-20">
            <Link 
              href="/dashboard"
              className="text-base xs:text-xl sm:text-2xl font-bold text-gray-900 transition-colors duration-200 hover:text-blue-600 touch-manipulation min-h-[44px] xs:min-h-[48px] flex items-center"
            >
              CH
            </Link>
            <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8">
              <Link 
                href="/dashboard"
                className="text-xs xs:text-sm sm:text-base text-gray-600 transition-all duration-300 ease-in-out transform cursor-pointer hover:scale-110 touch-manipulation min-h-[44px] xs:min-h-[48px] flex items-center px-2 xs:px-3 rounded-lg hover:bg-gray-50 active:bg-gray-100 active:scale-[0.98]"
              >
                Dashboard
              </Link>
              <span className="text-xs xs:text-sm sm:text-base text-gray-600 truncate max-w-[80px] xs:max-w-[100px] sm:max-w-none">
                {user.email}
              </span>
              <button 
                onClick={() => {
                  localStorage.removeItem('currentUser')
                  window.location.href = '/'
                }}
                className="text-xs xs:text-sm sm:text-base text-gray-600 transition-all duration-300 ease-in-out transform cursor-pointer hover:scale-110 touch-manipulation min-h-[44px] xs:min-h-[48px] flex items-center px-2 xs:px-3 rounded-lg hover:bg-gray-50 active:bg-gray-100 active:scale-[0.98]"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Settings Content */}
      <div className="bg-white">
        <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 bg-gray-50 touch-manipulation">
          <div className="max-w-2xl mx-auto px-3 xs:px-4 sm:px-6">
            <div className="text-center mb-6 xs:mb-7 sm:mb-8 md:mb-10 lg:mb-12">
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-3 xs:mb-4">
                Settings
              </h2>
              <p className="text-sm xs:text-base sm:text-lg text-gray-600 leading-relaxed">Manage your subscription and account preferences</p>
            </div>
            
            <div className="bg-white rounded-xl xs:rounded-2xl shadow-sm border border-gray-100 p-6 xs:p-7 sm:p-8 md:p-10">
              {/* Current Plan */}
              <div className="mb-6 xs:mb-7 sm:mb-8">
                <h3 className="text-lg xs:text-xl font-semibold text-gray-900 mb-3 xs:mb-4">Current Plan</h3>
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg xs:rounded-xl p-4 xs:p-5 sm:p-6 border border-gray-100">
                  <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-4 xs:gap-6">
                    <div className="flex-1">
                      <h4 className="text-base xs:text-lg font-semibold text-gray-900">
                        {userPlan === 'free' ? '🆓 Free Plan' : '🔥 Pro Plan'}
                      </h4>
                      <p className="text-xs xs:text-sm sm:text-base text-gray-600 mt-1 leading-relaxed">
                        {userPlan === 'free' 
                          ? 'Up to 1 reminder • Basic features • Community support'
                          : '$4.99/month • Unlimited reminders • Priority support • Advanced features'
                        }
                      </p>
                      {userPlan === 'pro' && (
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ✓ Active Subscription
                          </span>
                        </div>
                      )}
                    </div>
                    {userPlan === 'free' && (
                      <a 
                        href="/pricing"
                        className="bg-blue-500 text-white px-4 xs:px-5 py-2.5 xs:py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-105 font-medium shadow-md hover:shadow-lg touch-manipulation min-h-[44px] xs:min-h-[48px] flex items-center justify-center active:scale-[0.98] text-sm xs:text-base whitespace-nowrap"
                      >
                        Upgrade to Pro
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Subscription Management for Pro Users */}
              {userPlan === 'pro' && (
                <div className="mb-6 xs:mb-7 sm:mb-8">
                  <h3 className="text-lg xs:text-xl font-semibold text-gray-900 mb-3 xs:mb-4">Subscription Management</h3>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg xs:rounded-xl p-4 xs:p-5 sm:p-6">
                    <div className="flex flex-col xs:flex-row xs:items-start space-y-3 xs:space-y-0 xs:space-x-4">
                      <div className="flex-shrink-0 xs:mt-1">
                        <span className="text-xl xs:text-2xl">⚠️</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base xs:text-lg font-semibold text-orange-900 mb-2">Cancel Subscription</h4>
                        <p className="text-xs xs:text-sm sm:text-base text-orange-800 mb-4 leading-relaxed">
                          Switch back to our Free plan anytime. You&apos;ll keep access to Pro features until your current billing period ends, then enjoy 1 reminder per month on the house.
                        </p>
                        <button
                          onClick={handleDowngrade}
                          className="bg-orange-600 text-white px-4 xs:px-6 py-2.5 xs:py-3 rounded-lg xs:rounded-xl font-medium transition-all duration-300 ease-in-out hover:bg-orange-700 hover:shadow-xl hover:scale-105 cursor-pointer touch-manipulation min-h-[44px] xs:min-h-[48px] text-sm xs:text-base active:scale-[0.98]"
                        >
                          Switch to Free Plan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Support */}
              <div>
                <h3 className="text-lg xs:text-xl font-semibold text-gray-900 mb-3 xs:mb-4">Need Help?</h3>
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg xs:rounded-xl p-4 xs:p-5 sm:p-6">
                  <div className="flex flex-col xs:flex-row xs:items-center space-y-3 xs:space-y-0 xs:space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 xs:w-12 xs:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto xs:mx-0">
                      <span className="text-lg xs:text-xl">💜</span>
                    </div>
                    <div className="flex-1 text-center xs:text-left">
                      <h4 className="text-base xs:text-lg font-semibold text-purple-900">Contact Support</h4>
                      <p className="text-xs xs:text-sm sm:text-base text-purple-800 mt-1 leading-relaxed">
                        Questions about billing, features, or need assistance? Our friendly team is here to help you succeed.
                      </p>
                      <div className="mt-3">
                        <a 
                          href="mailto:cancelhelper@gmail.com"
                          className="inline-flex items-center text-purple-600 hover:text-purple-500 font-medium transition-colors duration-200 touch-manipulation min-h-[44px] xs:min-h-[48px] px-2 py-1 rounded-lg hover:bg-purple-100 active:scale-[0.98] text-sm xs:text-base"
                        >
                          <span>cancelhelper@gmail.com</span>
                          <svg className="ml-2 w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                  Are you sure you want to switch to the Free plan? You&apos;ll keep Pro features until your billing period ends, then have 1 reminder per month.
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