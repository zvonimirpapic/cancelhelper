'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    
    console.log('SIGNUP: Form submitted with:', { email, password })

    // Basic validation
    if (!email || !password || !confirmPassword) {
      setMessage('❌ Please fill in all fields')
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setMessage('❌ Passwords do not match')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setMessage('❌ Password must be at least 6 characters long')
      setIsLoading(false)
      return
    }

    try {
      // Call our signup API
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
        }),
      })
      
      console.log('SIGNUP: API response:', response)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.log('SIGNUP ERROR:', errorText)
        setMessage('Signup failed please try again')
        return
      }
      const result = await response.json()
      console.log('SIGNUP: API result:', result)

      setMessage('✅ Account created successfully!')
      
      // Store user data in localStorage for dashboard access
      localStorage.setItem('currentUser', JSON.stringify({
        email: email,
        id: result.userId || email // Use userId from response or fallback to email
      }))
      
      router.push('/dashboard') // Redirect to dashboard to create first reminder
    } catch (error) {
      console.error('Sign up error:', error)
      setMessage('❌ An error occurred. Please try again.')
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
                href="/login" 
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
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 touch-manipulation">
        <div className="max-w-lg mx-auto px-3 xs:px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-6 xs:mb-7 sm:mb-8 md:mb-10 lg:mb-12">
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4 lg:mb-5">
              Sign Up
            </h1>
            <p className="text-base xs:text-lg sm:text-xl text-gray-600 leading-relaxed">
              Create your Cancel Helper account
            </p>
          </div>
          
          {/* Form Container */}
          <div className="bg-white rounded-xl xs:rounded-2xl shadow-sm border border-gray-100 p-6 xs:p-7 sm:p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-5 sm:space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-xs xs:text-sm sm:text-base font-medium text-gray-900 mb-1 xs:mb-2 touch-manipulation">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 xs:px-4 sm:px-5 py-3 xs:py-3.5 sm:py-4 text-sm xs:text-base border border-gray-200 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-300 ease-in-out placeholder-gray-400 touch-manipulation min-h-[44px] xs:min-h-[48px]"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              {/* Password Field */}
              <div>
                <label className="block text-xs xs:text-sm sm:text-base font-medium text-gray-900 mb-1 xs:mb-2 touch-manipulation">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 xs:px-4 sm:px-5 py-3 xs:py-3.5 sm:py-4 text-sm xs:text-base border border-gray-200 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-300 ease-in-out placeholder-gray-400 touch-manipulation min-h-[44px] xs:min-h-[48px]"
                  placeholder="Create a password"
                  required
                />
              </div>

              {/* Password Requirements */}
              <div className="bg-gray-50 rounded-lg xs:rounded-xl p-3 xs:p-4 sm:p-5 touch-manipulation">
                <p className="text-xs xs:text-sm sm:text-base font-medium text-gray-900 mb-2 xs:mb-3">Password must contain:</p>
                <ul className="space-y-1.5 xs:space-y-2">
                  <li className={`flex items-center text-xs xs:text-sm transition-all duration-300 touch-manipulation min-h-[32px] ${password.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                    <span className="mr-2 xs:mr-3 text-sm xs:text-base flex-shrink-0">{password.length >= 8 ? '✅' : '○'}</span>
                    At least 8 characters
                  </li>
                  <li className={`flex items-center text-xs xs:text-sm transition-all duration-300 touch-manipulation min-h-[32px] ${/[a-z]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                    <span className="mr-2 xs:mr-3 text-sm xs:text-base flex-shrink-0">{/[a-z]/.test(password) ? '✅' : '○'}</span>
                    One lowercase letter
                  </li>
                  <li className={`flex items-center text-xs xs:text-sm transition-all duration-300 touch-manipulation min-h-[32px] ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                    <span className="mr-2 xs:mr-3 text-sm xs:text-base flex-shrink-0">{/[A-Z]/.test(password) ? '✅' : '○'}</span>
                    One uppercase letter
                  </li>
                  <li className={`flex items-center text-xs xs:text-sm transition-all duration-300 touch-manipulation min-h-[32px] ${/[0-9]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                    <span className="mr-2 xs:mr-3 text-sm xs:text-base flex-shrink-0">{/[0-9]/.test(password) ? '✅' : '○'}</span>
                    One number
                  </li>
                  <li className={`flex items-center text-xs xs:text-sm transition-all duration-300 touch-manipulation min-h-[32px] ${/[@$!%*?&]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                    <span className="mr-2 xs:mr-3 text-sm xs:text-base flex-shrink-0">{/[@$!%*?&]/.test(password) ? '✅' : '○'}</span>
                    One special character (@$!%*?&)
                  </li>
                </ul>
              </div>
              
              {/* Confirm Password Field */}
              <div>
                <label className="block text-xs xs:text-sm sm:text-base font-medium text-gray-900 mb-1 xs:mb-2 touch-manipulation">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 xs:px-4 sm:px-5 py-3 xs:py-3.5 sm:py-4 text-sm xs:text-base border border-gray-200 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-300 ease-in-out placeholder-gray-400 touch-manipulation min-h-[44px] xs:min-h-[48px]"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              
              {/* Message Display */}
              {message && (
                <div className={`p-3 xs:p-4 sm:p-5 rounded-lg xs:rounded-xl text-xs xs:text-sm sm:text-base transition-all duration-300 touch-manipulation ${
                  message.includes('Error') || message.includes('❌') || message.includes('failed')
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
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
            
            {/* Login Link */}
            <div className="mt-5 xs:mt-6 sm:mt-8 text-center">
              <p className="text-xs xs:text-sm sm:text-base text-gray-600 leading-relaxed">
                Already have an account?{' '}
                <Link 
                  href="/login" 
                  className="text-blue-600 font-medium cursor-pointer touch-manipulation min-h-[44px] inline-flex items-center px-1 py-1 rounded active:scale-[0.98]"
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
                  Sign in here
                </Link>
              </p>
            </div>
            

          </div>
          
          {/* Return Link */}
          <div className="mt-6 xs:mt-7 sm:mt-8 md:mt-10 text-center">
            <Link 
              href="/" 
              className="text-blue-600 text-xs xs:text-sm sm:text-base cursor-pointer transition-all duration-300 ease-in-out inline-flex items-center px-3 py-2 rounded-lg hover:bg-blue-50 touch-manipulation min-h-[44px] xs:min-h-[48px] active:scale-[0.98]"
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