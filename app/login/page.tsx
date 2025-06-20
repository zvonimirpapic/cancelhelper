'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    // Basic validation
    if (!email || !password) {
      setMessage('❌ Please fill in all fields')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      
      console.log('LOGIN: API response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.json()
        console.log('LOGIN: Error from API:', errorData)
        setMessage('❌ ' + errorData.error)
        return // Don't redirect on error
      }
      
      const result = await response.json()
      console.log('LOGIN: Success from API:', result)
      setMessage('✅ ' + result.message)
      
      // Store user session
      localStorage.setItem('currentUser', JSON.stringify({
        email: result.user.email,
        id: result.user.id
      }))
      
      // Only redirect on success
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
      
    } catch (error) {
      console.error('LOGIN: Network error:', error)
      setMessage('❌ Network error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 bg-white shadow-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6">
          <div className="flex justify-between items-center py-3 xs:py-4 sm:py-5">
            <Link 
              href="/"
              className="text-base xs:text-lg sm:text-xl font-bold tracking-widest text-gray-900 cursor-pointer touch-manipulation min-h-[44px] xs:min-h-[48px] flex items-center"
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
              CH
            </Link>
            <div className="flex space-x-2 xs:space-x-3 sm:space-x-4 md:space-x-8">
              <Link 
                href="/about" 
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
                About
              </Link>
              <Link 
                href="/pricing" 
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
                Pricing
              </Link>
              <Link 
                href="/signup" 
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
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="py-8 xs:py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-lg mx-auto px-3 xs:px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-6 xs:mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4 lg:mb-5">
              Sign In
            </h1>
            <p className="text-base xs:text-lg sm:text-xl text-gray-600 leading-relaxed">
              Welcome back to Cancel Helper
            </p>
          </div>
          
          {/* Form Container */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 xs:p-6 sm:p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-5 sm:space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-xs xs:text-sm sm:text-base font-medium text-gray-900 mb-1.5 xs:mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 xs:px-4 sm:px-5 py-3 xs:py-3.5 sm:py-4 text-xs xs:text-sm sm:text-base border border-gray-200 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-300 ease-in-out placeholder-gray-400 touch-manipulation min-h-[44px] xs:min-h-[48px]"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              {/* Password Field */}
              <div>
                <label className="block text-xs xs:text-sm sm:text-base font-medium text-gray-900 mb-1.5 xs:mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 xs:px-4 sm:px-5 py-3 xs:py-3.5 sm:py-4 text-xs xs:text-sm sm:text-base border border-gray-200 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-300 ease-in-out placeholder-gray-400 touch-manipulation min-h-[44px] xs:min-h-[48px]"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              {/* Message Display */}
              {message && (
                <div className={`p-3 xs:p-4 sm:p-5 rounded-lg xs:rounded-xl text-xs xs:text-sm sm:text-base transition-all duration-300 ${
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
                className="w-full bg-blue-500 text-white px-6 xs:px-8 sm:px-10 py-3 xs:py-4 sm:py-5 rounded-lg xs:rounded-xl text-sm xs:text-base sm:text-lg font-semibold transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer touch-manipulation min-h-[44px] xs:min-h-[48px] flex items-center justify-center active:scale-[0.98]"
                style={{
                  transform: 'scale(1)',
                  backgroundColor: '#3b82f6',
                  transition: 'all 0.3s ease-in-out'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    const element = e.target as HTMLElement;
                    element.style.transform = 'scale(1.05)';
                    element.style.backgroundColor = '#2563eb';
                  }
                }}
                onMouseLeave={(e) => {
                  const element = e.target as HTMLElement;
                  element.style.transform = 'scale(1)';
                  element.style.backgroundColor = '#3b82f6';
                }}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            
            {/* Signup Link */}
            <div className="mt-4 xs:mt-5 sm:mt-6 md:mt-8 text-center">
              <p className="text-xs xs:text-sm sm:text-base text-gray-600 leading-relaxed">
                Don't have an account?{' '}
                <Link 
                  href="/signup" 
                  className="text-blue-600 font-medium cursor-pointer transition-all duration-300 ease-in-out inline-block touch-manipulation min-h-[44px] xs:min-h-[48px] py-2 px-1 rounded hover:bg-blue-50 active:bg-blue-100 active:scale-[0.98]"
                  style={{
                    transform: 'scale(1)',
                    transition: 'all 0.3s ease-in-out'
                  }}
                  onMouseEnter={(e) => {
                    const element = e.target as HTMLElement;
                    element.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    const element = e.target as HTMLElement;
                    element.style.transform = 'scale(1)';
                  }}
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
          
          {/* Return Link */}
          <div className="mt-6 xs:mt-8 sm:mt-10 text-center">
            <Link 
              href="/" 
              className="text-blue-600 text-xs xs:text-sm sm:text-base cursor-pointer transition-all duration-300 ease-in-out inline-block touch-manipulation min-h-[44px] xs:min-h-[48px] flex items-center justify-center px-4 py-2 rounded-lg hover:bg-blue-50 active:bg-blue-100 active:scale-[0.98]"
              style={{
                transform: 'scale(1)',
                transition: 'all 0.3s ease-in-out'
              }}
              onMouseEnter={(e) => {
                const element = e.target as HTMLElement;
                element.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                const element = e.target as HTMLElement;
                element.style.transform = 'scale(1)';
              }}
            >
              ← Return to App
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 