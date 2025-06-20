'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile-First Navigation */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4 sm:py-5">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
              Cancel Helper
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link href="/about" className="text-base lg:text-lg text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-gray-50">
                About
              </Link>
              <Link href="/pricing" className="text-base lg:text-lg text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-gray-50">
                Pricing
              </Link>
              <Link href="/login" className="text-base lg:text-lg bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-200 font-semibold shadow-sm hover:shadow-md">
                Login
              </Link>
            </div>

            {/* Mobile Menu Button - Enhanced */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 touch-manipulation"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu - Enhanced */}
          {isMenuOpen && (
            <div className="md:hidden pb-6 border-t border-gray-100 mt-4 pt-4 animate-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col space-y-3">
                <Link 
                  href="/about" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-gray-700 hover:text-gray-900 font-medium px-4 py-4 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 text-lg touch-manipulation"
                >
                  About
                </Link>
                <Link 
                  href="/pricing" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-gray-700 hover:text-gray-900 font-medium px-4 py-4 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 text-lg touch-manipulation"
                >
                  Pricing
                </Link>
                <Link 
                  href="/login" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="bg-gray-900 text-white font-semibold px-4 py-4 rounded-xl hover:bg-gray-800 active:bg-gray-700 transition-colors duration-200 text-center text-lg touch-manipulation shadow-lg"
                >
                  Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Mobile Optimized */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23919191%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 sm:mb-8 lg:mb-10 leading-[1.1] tracking-tight">
              Never forget to{' '}
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                cancel again
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 mb-10 sm:mb-12 lg:mb-16 leading-relaxed max-w-3xl mx-auto px-2">
              We&apos;ll remind you before any subscription renews
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
              <Link href="/signup" className="w-full sm:w-auto group inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 bg-gray-900 text-white rounded-2xl text-lg sm:text-xl font-semibold hover:bg-gray-800 active:bg-gray-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 min-h-[56px] touch-manipulation">
                Start for Free
                <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <p className="text-base sm:text-lg text-gray-500 font-medium px-2">
                ✨ No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Mobile Enhanced */}
      <section className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
              Why People Love Cancel Helper
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Join thousands who never get surprised by unexpected charges
            </p>
          </div>
            <div className="grid gap-8 sm:gap-10 lg:gap-12 md:grid-cols-3">
            <div className="group text-center p-8 sm:p-10 rounded-3xl hover:bg-gray-50 active:bg-gray-100 transition-all duration-300 touch-manipulation">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl flex items-center justify-center mx-auto mb-8 sm:mb-10 group-hover:scale-110 group-active:scale-105 transition-transform duration-300">
                <span className="text-4xl sm:text-5xl">💰</span>
                </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Save Money</h3>
              <p className="text-gray-600 leading-relaxed text-lg sm:text-xl">Never get charged for something you forgot to cancel</p>
              </div>
              
            <div className="group text-center p-8 sm:p-10 rounded-3xl hover:bg-gray-50 active:bg-gray-100 transition-all duration-300 touch-manipulation">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mx-auto mb-8 sm:mb-10 group-hover:scale-110 group-active:scale-105 transition-transform duration-300">
                <span className="text-4xl sm:text-5xl">😌</span>
                </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Stop Stressing</h3>
              <p className="text-gray-600 leading-relaxed text-lg sm:text-xl">Relax. We remember so you don&apos;t have to</p>
              </div>
              
            <div className="group text-center p-8 sm:p-10 rounded-3xl hover:bg-gray-50 active:bg-gray-100 transition-all duration-300 md:col-span-3 md:max-w-md md:mx-auto lg:col-span-1 lg:max-w-none touch-manipulation">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl flex items-center justify-center mx-auto mb-8 sm:mb-10 group-hover:scale-110 group-active:scale-105 transition-transform duration-300">
                <span className="text-4xl sm:text-5xl">📧</span>
                </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Clean Inbox</h3>
              <p className="text-gray-600 leading-relaxed text-lg sm:text-xl">No spam. Just one helpful email.</p>
              </div>
            </div>
          </div>
        </section>

      {/* How It Works - Mobile Enhanced */}
      <section className="py-20 sm:py-24 lg:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Three simple steps to never worry about forgotten trials again
            </p>
          </div>
            <div className="grid gap-8 sm:gap-10 lg:gap-12 md:grid-cols-3">
            <div className="relative bg-white p-8 sm:p-10 lg:p-12 rounded-3xl shadow-lg border border-gray-100 text-center group hover:shadow-xl active:shadow-lg transition-all duration-300 touch-manipulation">
              <div className="absolute -top-4 sm:-top-5 left-1/2 transform -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-sm sm:text-base font-bold text-white">1</span>
                </div>
              <div className="w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mx-auto mb-8 sm:mb-10 group-hover:scale-110 group-active:scale-105 transition-transform duration-300">
                <span className="text-2xl sm:text-3xl font-bold text-blue-600">+</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Add Your Trial</h3>
              <p className="text-gray-600 leading-relaxed text-lg sm:text-xl">Takes 10 seconds. Just tell us the service and when it ends.</p>
              </div>
              
            <div className="relative bg-white p-8 sm:p-10 lg:p-12 rounded-3xl shadow-lg border border-gray-100 text-center group hover:shadow-xl active:shadow-lg transition-all duration-300 touch-manipulation">
              <div className="absolute -top-4 sm:-top-5 left-1/2 transform -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-sm sm:text-base font-bold text-white">2</span>
                </div>
              <div className="w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl flex items-center justify-center mx-auto mb-8 sm:mb-10 group-hover:scale-110 group-active:scale-105 transition-transform duration-300">
                <span className="text-3xl sm:text-4xl">🔒</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">We Secure It</h3>
              <p className="text-gray-600 leading-relaxed text-lg sm:text-xl">Your info is encrypted and stored securely.</p>
              </div>
              
            <div className="relative bg-white p-8 sm:p-10 lg:p-12 rounded-3xl shadow-lg border border-gray-100 text-center group hover:shadow-xl active:shadow-lg transition-all duration-300 md:col-span-3 md:max-w-md md:mx-auto lg:col-span-1 lg:max-w-none touch-manipulation">
              <div className="absolute -top-4 sm:-top-5 left-1/2 transform -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-sm sm:text-base font-bold text-white">3</span>
                </div>
              <div className="w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl flex items-center justify-center mx-auto mb-8 sm:mb-10 group-hover:scale-110 group-active:scale-105 transition-transform duration-300">
                <span className="text-3xl sm:text-4xl">⏰</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Get Reminded</h3>
              <p className="text-gray-600 leading-relaxed text-lg sm:text-xl">One email. 24 hours before your trial ends.</p>
            </div>
          </div>
          </div>
        </section>

      {/* Testimonials - Mobile Enhanced */}
      <section className="py-20 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
              What Our Users Say
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Real stories from people who saved money with Cancel Helper
            </p>
          </div>
          <div className="grid gap-8 sm:gap-10 lg:gap-12 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                         <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl active:shadow-lg transition-all duration-300 touch-manipulation">
               <div className="flex items-start mb-6 sm:mb-8">
                 <img src="/kevin-chan.png" alt="Kevin Chan" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover object-top mr-4 sm:mr-5 flex-shrink-0 ring-2 ring-gray-100" />
                  <div>
                   <p className="font-bold text-gray-900 mb-1 text-lg sm:text-xl">Kevin Chan</p>
                   <p className="text-sm sm:text-base text-gray-500">@kevin_chan</p>
                  </div>
                </div>
               <p className="text-gray-700 leading-relaxed text-lg sm:text-xl">Hey I used @CancelHelper as a freelancer, and in just 2 weeks, I realized how many trials I always forget to cancel 🙋</p>
              </div>

            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl active:shadow-lg transition-all duration-300 touch-manipulation">
              <div className="flex items-start mb-6 sm:mb-8">
                <img src="/trendline-capital.png" alt="Trendline Capital" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover mr-4 sm:mr-5 flex-shrink-0 ring-2 ring-gray-100" />
                  <div>
                  <p className="font-bold text-gray-900 mb-1 text-lg sm:text-xl">Trendline Capital</p>
                  <p className="text-sm sm:text-base text-gray-500">@trendline_cap</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg sm:text-xl">Thank you so much, <span className="font-semibold text-gray-900">simple efficient and so cheap</span></p>
              </div>

            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl active:shadow-lg transition-all duration-300 md:col-span-2 lg:col-span-1 touch-manipulation">
              <div className="flex items-start mb-6 sm:mb-8">
                <img src="/warren-x.png" alt="Warren X" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover object-top mr-4 sm:mr-5 flex-shrink-0 ring-2 ring-gray-100" />
                  <div>
                  <p className="font-bold text-gray-900 mb-1 text-lg sm:text-xl">Warren X.</p>
                  <p className="text-sm sm:text-base text-gray-500">@warrenxofficial</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg sm:text-xl">Set up once and forget about it, super easy and simple. great job</p>
            </div>
            </div>
          </div>
        </section>

      {/* Services Section - Mobile Enhanced */}
      <section className="py-20 sm:py-24 lg:py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Track Any Service
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto px-4">
              Works with all your favorite streaming, software, and subscription services
            </p>
              </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 items-center justify-items-center max-w-6xl mx-auto">
            <div className="flex items-center justify-center h-16 sm:h-20 lg:h-24 group touch-manipulation">
              <div className="text-red-600 font-bold text-lg sm:text-xl lg:text-2xl tracking-tight group-hover:scale-110 group-active:scale-105 transition-transform duration-200">NETFLIX</div>
            </div>

            <div className="flex items-center justify-center h-16 sm:h-20 lg:h-24 group touch-manipulation">
              <div className="text-center relative group-hover:scale-110 group-active:scale-105 transition-transform duration-200">
                <div className="absolute -top-1 sm:-top-2 left-1/2 transform -translate-x-1/2 w-10 sm:w-12 lg:w-14 h-2 sm:h-3 border-t-2 sm:border-t-4 border-blue-500 rounded-t-full"></div>
                <div className="text-blue-600 font-bold text-base sm:text-lg lg:text-xl" style={{fontFamily: 'serif'}}>Disney</div>
                <div className="text-blue-600 font-bold text-lg sm:text-xl lg:text-2xl absolute -right-2 sm:-right-3 lg:-right-4 top-0">+</div>
                </div>
              </div>

            <div className="flex items-center justify-center h-16 sm:h-20 lg:h-24 group touch-manipulation">
              <div className="flex items-center space-x-1 sm:space-x-2 group-hover:scale-110 group-active:scale-105 transition-transform duration-200">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                <span className="text-black font-medium text-base sm:text-lg lg:text-xl">tv</span>
              </div>
                  </div>

            <div className="flex items-center justify-center h-16 sm:h-20 lg:h-24 group touch-manipulation">
              <div className="flex items-center space-x-2 sm:space-x-3 group-hover:scale-110 group-active:scale-105 transition-transform duration-200">
                <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-green-500 rounded-full flex items-center justify-center relative">
                  <div className="absolute top-2 sm:top-2.5 left-1.5 w-3 sm:w-4 lg:w-5 h-0.5 sm:h-1 bg-white rounded-full"></div>
                  <div className="absolute top-3 sm:top-3.5 left-1.5 w-4 sm:w-5 lg:w-6 h-0.5 sm:h-1 bg-white rounded-full"></div>
                  <div className="absolute top-4 sm:top-4.5 left-1.5 w-3 sm:w-4 lg:w-5 h-0.5 sm:h-1 bg-white rounded-full"></div>
                </div>
                <span className="text-black font-medium text-base sm:text-lg lg:text-xl">Spotify</span>
              </div>
                  </div>

            <div className="flex items-center justify-center h-16 sm:h-20 lg:h-24 group touch-manipulation">
              <div className="flex items-center space-x-2 sm:space-x-3 group-hover:scale-110 group-active:scale-105 transition-transform duration-200">
                <div className="w-7 h-5 sm:w-8 sm:h-6 lg:w-9 lg:h-7 bg-red-600 rounded-lg flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[7px] sm:border-l-[8px] lg:border-l-[9px] border-l-white border-t-[3.5px] sm:border-t-[4px] lg:border-t-[4.5px] border-t-transparent border-b-[3.5px] sm:border-b-[4px] lg:border-b-[4.5px] border-b-transparent ml-0.5 sm:ml-1"></div>
                </div>
                <span className="text-black font-medium text-sm sm:text-base lg:text-lg">YouTube</span>
              </div>
              </div>

            <div className="flex items-center justify-center h-16 sm:h-20 lg:h-24 group touch-manipulation">
              <div className="text-green-500 font-bold text-lg sm:text-xl lg:text-2xl lowercase group-hover:scale-110 group-active:scale-105 transition-transform duration-200">hulu</div>
              </div>

            <div className="flex items-center justify-center h-16 sm:h-20 lg:h-24 group touch-manipulation">
              <div className="text-center group-hover:scale-110 group-active:scale-105 transition-transform duration-200">
                <div className="text-blue-600 font-medium text-lg sm:text-xl lg:text-2xl">prime</div>
                <div className="w-7 sm:w-8 lg:w-9 h-0.5 sm:h-1 bg-blue-600 rounded-full mx-auto relative">
                  <div className="absolute right-0 top-0 w-0 h-0 border-l-[4px] sm:border-l-[5px] border-l-blue-600 border-t-[2px] sm:border-t-[2.5px] border-t-transparent border-b-[2px] sm:border-b-[2.5px] border-b-transparent"></div>
                  </div>
                </div>
              </div>

            <div className="flex items-center justify-center h-16 sm:h-20 lg:h-24 group touch-manipulation">
              <div className="text-blue-600 font-bold text-lg sm:text-xl lg:text-2xl lowercase group-hover:scale-110 group-active:scale-105 transition-transform duration-200">max</div>
            </div>

            <div className="flex items-center justify-center h-16 sm:h-20 lg:h-24 group touch-manipulation">
              <div className="flex items-center space-x-2 group-hover:scale-110 group-active:scale-105 transition-transform duration-200">
                <span className="text-black font-medium text-base sm:text-lg lg:text-xl">audible</span>
                <div className="flex space-x-1 sm:space-x-1.5">
                  <div className="w-1 sm:w-1.5 h-2 sm:h-2.5 bg-orange-400 rounded-full"></div>
                  <div className="w-1 sm:w-1.5 h-3 sm:h-3.5 bg-orange-400 rounded-full"></div>
                  <div className="w-1 sm:w-1.5 h-4 sm:h-4.5 bg-orange-400 rounded-full"></div>
                  </div>
                </div>
              </div>

            <div className="flex items-center justify-center h-16 sm:h-20 lg:h-24 group col-span-2 sm:col-span-1 touch-manipulation">
              <div className="text-gray-400 font-medium text-base sm:text-lg lg:text-xl group-hover:text-gray-600 transition-colors duration-200">+ 1000s more</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Mobile Enhanced */}
      <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
            Ready to Stop Wasting Money?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 sm:mb-12 lg:mb-16 leading-relaxed max-w-2xl mx-auto px-4">
            Join thousands who never forget to cancel trials anymore. Start protecting your wallet today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center px-4">
            <Link href="/signup" className="w-full sm:w-auto group inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 bg-white text-gray-900 rounded-2xl text-lg sm:text-xl font-semibold hover:bg-gray-100 active:bg-gray-200 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 min-h-[56px] touch-manipulation">
              Get Started Free
              <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-base sm:text-lg text-gray-400 font-medium px-2">
              ✨ Free forever • No credit card required
            </p>
            </div>
          </div>
        </section>

      {/* Footer - Mobile Enhanced */}
        <footer className="bg-gray-900 text-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-10 lg:mb-12">
            <div className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 sm:mb-0">
                Cancel Helper
              </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-6 sm:gap-8 lg:gap-10">
              <Link href="/about" className="text-gray-400 hover:text-white active:text-gray-300 transition-colors duration-200 px-3 py-2 text-lg touch-manipulation">
                About
              </Link>
              <Link href="/pricing" className="text-gray-400 hover:text-white active:text-gray-300 transition-colors duration-200 px-3 py-2 text-lg touch-manipulation">
                Pricing
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white active:text-gray-300 transition-colors duration-200 px-3 py-2 text-lg touch-manipulation">
                  Terms
                </Link>
              </div>
            </div>
          <div className="border-t border-gray-800 pt-8 sm:pt-10 lg:pt-12 text-center">
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                © 2025 Cancel Helper. Save money, never forget to cancel.
              </p>
            </div>
          </div>
        </footer>
      </div>
  )
}