'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Pricing() {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = async () => {
    console.log('🚀 Button clicked! Starting upgrade process...')
    setIsLoading(true)
    console.log('🚀 Loading state set to true')
    
    // Get current user from localStorage
    const currentUser = localStorage.getItem('currentUser')
    if (!currentUser) {
      alert('Please log in first')
      setIsLoading(false)
      window.location.href = '/login'
      return
    }
    
    const userData = JSON.parse(currentUser)
    console.log('🚀 Using real user data:', userData.email)
    
    try {
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          userId: userData.id
        })
      })
      
      console.log('📡 Response status:', response.status)
      console.log('📡 Response ok:', response.ok)
      
      // Check if response is actually JSON
      const responseText = await response.text()
      console.log('📄 Raw response:', responseText)
      
      let data
      try {
        data = JSON.parse(responseText)
        console.log('📦 Parsed data:', data)
      } catch (parseError) {
        console.error('❌ JSON Parse Error:', parseError)
        console.log('📄 Response was:', responseText.substring(0, 200) + '...')
        throw new Error('Server returned invalid JSON response')
      }
      
      if (data.url) {
        console.log('✅ Redirecting to:', data.url)
        window.location.href = data.url
      } else {
        console.log('❌ No URL received')
        alert('Error: No checkout URL received')
        setIsLoading(false)
      }
      
    } catch (error) {
      console.error('❌ Error:', error)
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 xs:py-6 sm:py-8 md:py-12 px-3 xs:px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">Stop Losing Money</h1>
          <p className="text-base xs:text-lg sm:text-xl text-gray-600">Never get charged for something you forgot to cancel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 xs:p-5 sm:p-6 md:p-8 transform hover:-translate-y-1 touch-manipulation">
            <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">🆓 Free Plan</h2>
            <div className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-6">$0<span className="text-sm xs:text-base sm:text-lg text-gray-600">/month</span></div>
            <ul className="space-y-2 xs:space-y-3 sm:space-y-4 mb-3 xs:mb-4 sm:mb-6">
              <li className="flex items-center text-gray-600 text-xs xs:text-sm sm:text-base">
                <span className="text-green-500 mr-2 xs:mr-3 text-sm xs:text-base sm:text-lg">✅</span>
                Track up to 1 trial reminder
              </li>
              <li className="flex items-center text-gray-600 text-xs xs:text-sm sm:text-base">
                <span className="text-green-500 mr-2 xs:mr-3 text-sm xs:text-base sm:text-lg">✅</span>
                24-hour email reminders
              </li>
            </ul>
            <div className="text-gray-500 text-xs xs:text-sm mb-3 xs:mb-4 sm:mb-6">🪫 Great for trying it out</div>
            <Link 
              href="/signup" 
              className="block w-full bg-gray-200 text-gray-800 text-center py-3 xs:py-3.5 sm:py-4 rounded-lg xs:rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium text-xs xs:text-sm sm:text-base cursor-pointer touch-manipulation min-h-[44px] xs:min-h-[48px] flex items-center justify-center active:scale-[0.98]"
              style={{
                transform: 'scale(1)',
                transition: 'all 0.3s ease-in-out'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              Start Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 xs:p-5 sm:p-6 md:p-8 border-2 border-blue-500 ring-2 ring-blue-200 ring-opacity-50 relative transform hover:-translate-y-1 touch-manipulation">
            <div className="absolute -top-2 xs:-top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 xs:px-4 sm:px-6 py-0.5 xs:py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg">Most Popular</span>
            </div>
            <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4 mt-3 xs:mt-2 sm:mt-0">🔥 Pro Plan</h2>
            <div className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-6">$4.99<span className="text-sm xs:text-base sm:text-lg text-gray-600">/month</span></div>
            <ul className="space-y-2 xs:space-y-3 sm:space-y-4 mb-3 xs:mb-4 sm:mb-6">
              <li className="flex items-center text-gray-600 text-xs xs:text-sm sm:text-base">
                <span className="text-green-500 mr-2 xs:mr-3 text-sm xs:text-base sm:text-lg">✅</span>
                Unlimited trial reminders
              </li>
              <li className="flex items-center text-gray-600 text-xs xs:text-sm sm:text-base">
                <span className="text-green-500 mr-2 xs:mr-3 text-sm xs:text-base sm:text-lg">✅</span>
                Priority email support
              </li>
              <li className="flex items-center text-gray-600 text-xs xs:text-sm sm:text-base">
                <span className="text-green-500 mr-2 xs:mr-3 text-sm xs:text-base sm:text-lg">✅</span>
                Instant cancel links
              </li>
              <li className="flex items-center text-gray-600 text-xs xs:text-sm sm:text-base">
                <span className="text-green-500 mr-2 xs:mr-3 text-sm xs:text-base sm:text-lg">✅</span>
                Advanced tracking & insights
              </li>
            </ul>
            <div className="text-blue-600 text-xs xs:text-sm font-medium mb-3 xs:mb-4 sm:mb-6">💡 Save $273/year on average</div>
            <button 
              onClick={handleUpgrade}
              disabled={isLoading}
              className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 xs:py-3.5 sm:py-4 rounded-lg xs:rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs xs:text-sm sm:text-base touch-manipulation min-h-[44px] xs:min-h-[48px] flex items-center justify-center active:scale-[0.98]"
              style={{
                transform: 'scale(1)',
                transition: 'all 0.3s ease-in-out'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  (e.target as HTMLElement).style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              {isLoading ? 'Processing...' : 'Upgrade to Pro'}
            </button>
          </div>
        </div>

        <div className="text-center mt-6 xs:mt-8 sm:mt-10 md:mt-12">
          <p className="text-base xs:text-lg sm:text-xl text-gray-600 px-2 xs:px-4 sm:px-0 mb-3 xs:mb-4">No more "oops, I forgot to cancel." We've got your back</p>
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-500 mt-2 xs:mt-3 sm:mt-4 inline-block transition-colors text-xs xs:text-sm sm:text-base cursor-pointer touch-manipulation min-h-[44px] xs:min-h-[48px] flex items-center justify-center px-4 py-2 rounded-lg hover:bg-blue-50 active:bg-blue-100 active:scale-[0.98]"
            style={{
              transform: 'scale(1)',
              transition: 'all 0.3s ease-in-out'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = 'scale(1)';
            }}
          >
            ← Return to App
          </Link>
        </div>
      </div>
    </div>
  )
} 