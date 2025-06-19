'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Pricing() {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = async () => {
    console.log('🚀 Button clicked! Starting upgrade process...')
    setIsLoading(true)
    console.log('🚀 Loading state set to true')
    
    try {
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'demo@example.com',
          userId: 'demo-user-id'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 sm:py-8 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">Stop Losing Money</h1>
          <p className="text-lg sm:text-xl text-gray-600">Never get charged for something you forgot to cancel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8 transform hover:-translate-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 md:mb-4">🆓 Free Plan</h2>
            <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 md:mb-6">$0<span className="text-base sm:text-lg text-gray-600">/month</span></div>
            <ul className="space-y-3 sm:space-y-4 mb-4 md:mb-6">
              <li className="flex items-center text-gray-600 text-sm sm:text-base">
                <span className="text-green-500 mr-3 text-base sm:text-lg">✅</span>
                Track up to 3 trials
              </li>
              <li className="flex items-center text-gray-600 text-sm sm:text-base">
                <span className="text-green-500 mr-3 text-base sm:text-lg">✅</span>
                24-hour email reminders
              </li>
            </ul>
            <div className="text-gray-500 text-sm mb-4 md:mb-6">🪫 Great for trying it out</div>
            <Link 
              href="/signup" 
              className="block w-full bg-gray-200 text-gray-800 text-center py-3 sm:py-3 rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium text-sm sm:text-base cursor-pointer"
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
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8 border-2 border-blue-500 ring-2 ring-blue-200 ring-opacity-50 relative transform hover:-translate-y-1">
            <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg">Most Popular</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 md:mb-4 mt-2 sm:mt-0">🔥 Pro Plan</h2>
            <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 md:mb-6">$4.99<span className="text-base sm:text-lg text-gray-600">/month</span></div>
            <ul className="space-y-3 sm:space-y-4 mb-4 md:mb-6">
              <li className="flex items-center text-gray-600 text-sm sm:text-base">
                <span className="text-green-500 mr-3 text-base sm:text-lg">✅</span>
                Unlimited trial reminders
              </li>
              <li className="flex items-center text-gray-600 text-sm sm:text-base">
                <span className="text-green-500 mr-3 text-base sm:text-lg">✅</span>
                Priority email support
              </li>
              <li className="flex items-center text-gray-600 text-sm sm:text-base">
                <span className="text-green-500 mr-3 text-base sm:text-lg">✅</span>
                Instant cancel links
              </li>
              <li className="flex items-center text-gray-600 text-sm sm:text-base">
                <span className="text-green-500 mr-3 text-base sm:text-lg">✅</span>
                Advanced tracking & insights
              </li>
            </ul>
            <div className="text-blue-600 text-sm font-medium mb-4 md:mb-6">💡 Save $273/year on average</div>
            <button 
              onClick={handleUpgrade}
              disabled={isLoading}
              className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 sm:py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base"
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

        <div className="text-center mt-8 md:mt-12">
          <p className="text-lg sm:text-xl text-gray-600 px-4 sm:px-0 mb-4">No more "oops, I forgot to cancel." We've got your back</p>
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-500 mt-3 md:mt-4 inline-block transition-colors text-sm sm:text-base cursor-pointer"
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