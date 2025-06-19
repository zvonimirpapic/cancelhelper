'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile-First Navigation */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4 sm:py-5">
            <Link 
              href="/"
              className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 hover:text-blue-600 transition-all duration-300"
            >
              Cancel Helper
            </Link>
            
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

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-3 rounded-xl hover:bg-gray-100 transition-all duration-300 touch-manipulation active:bg-gray-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
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

      <div className="bg-white">
        {/* Hero Section - Mobile Optimized */}
        <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-blue-50/80 via-white to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
          <div className="max-w-5xl mx-auto text-center relative">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 leading-[1.1] tracking-tight">
              About Cancel Helper
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-2">
              We're on a mission to help people stop wasting money on forgotten subscriptions and free trials. 
              Simple, reliable, and built to keep things stress-free.
            </p>
            
            {/* Stats Cards - Mobile Stack */}
            <div className="flex flex-col space-y-4 sm:space-y-6 md:flex-row md:space-y-0 md:gap-4 lg:gap-6 xl:gap-8 justify-center items-center">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-none md:flex-1 bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-100/50 shadow-sm hover:shadow-lg transition-all duration-300 touch-manipulation active:scale-[0.98]">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-2">$273</div>
                <div className="text-sm sm:text-base md:text-lg text-gray-600 font-medium">Average saved per year</div>
              </div>
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-none md:flex-1 bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-100/50 shadow-sm hover:shadow-lg transition-all duration-300 touch-manipulation active:scale-[0.98]">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-600 mb-2">10,000+</div>
                <div className="text-sm sm:text-base md:text-lg text-gray-600 font-medium">Happy users</div>
              </div>
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-none md:flex-1 bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-100/50 shadow-sm hover:shadow-lg transition-all duration-300 touch-manipulation active:scale-[0.98]">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-600 mb-2">87%</div>
                <div className="text-sm sm:text-base md:text-lg text-gray-600 font-medium">People forget trials</div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section - Mobile Optimized */}
        <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-8 sm:mb-12 md:mb-16 lg:mb-20 tracking-tight px-2">
              Our Mission
            </h2>
            <div className="space-y-6 sm:space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 lg:gap-8 xl:gap-12">
              {/* Why We Built This */}
              <div className="bg-gradient-to-br from-blue-50/50 to-transparent p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl md:rounded-3xl border border-gray-100/50 shadow-sm hover:shadow-lg transition-all duration-500 touch-manipulation">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4 sm:mb-6 md:mb-8 leading-tight">
                  Why We Built This
                </h3>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  We've all been there - signing up for a "free" trial and completely forgetting about it until we see the unexpected charge on our credit card statement. It's frustrating, and frankly, it shouldn't happen.
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  That's why we created Cancel Helper. We believe technology should work for you, not against you. Our simple reminder system puts the power back in your hands.
                </p>
              </div>
              
              {/* Our Values */}
              <div className="bg-gradient-to-br from-purple-50/50 to-transparent p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl md:rounded-3xl border border-gray-100/50 shadow-sm hover:shadow-lg transition-all duration-500 touch-manipulation">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4 sm:mb-6 md:mb-8 leading-tight">
                  Our Values
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start group touch-manipulation">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center mt-1 mr-3 sm:mr-4 md:mr-6 flex-shrink-0 group-hover:bg-blue-200 transition-all duration-300">
                      <span className="text-blue-600 text-sm sm:text-lg md:text-xl font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">Privacy First</h4>
                      <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">Your data is encrypted and never shared with third parties.</p>
                    </div>
                  </div>
                  <div className="flex items-start group touch-manipulation">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center mt-1 mr-3 sm:mr-4 md:mr-6 flex-shrink-0 group-hover:bg-green-200 transition-all duration-300">
                      <span className="text-green-600 text-sm sm:text-lg md:text-xl font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">Simple & Reliable</h4>
                      <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">No confusing features. Just one job done really well.</p>
                    </div>
                  </div>
                  <div className="flex items-start group touch-manipulation">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-purple-100 rounded-xl sm:rounded-2xl flex items-center justify-center mt-1 mr-3 sm:mr-4 md:mr-6 flex-shrink-0 group-hover:bg-purple-200 transition-all duration-300">
                      <span className="text-purple-600 text-sm sm:text-lg md:text-xl font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">Customer Focused</h4>
                      <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">Built by people who hate unexpected charges too.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Mobile Optimized */}
        <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50/80 via-blue-50/60 to-indigo-50/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.05),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-white/60 to-transparent"></div>
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="mb-8 sm:mb-12 md:mb-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 md:mb-10 shadow-lg border border-white/50 backdrop-blur-sm hover:scale-105 transition-all duration-500 touch-manipulation">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">💌</span>
              </div>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 tracking-tight leading-[1.1] px-2">
                Let's Talk
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16 px-2">
                Got a question, suggestion, or just want to say hi? We're real humans who care about you and your money.
              </p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-white/50 p-6 sm:p-8 md:p-10 lg:p-14 transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] max-w-2xl mx-auto touch-manipulation">
              <p className="text-sm sm:text-base md:text-lg text-gray-500 mb-4 sm:mb-6 font-medium">
                📩 Reach out anytime
              </p>
              <a 
                href="mailto:cancelhelper@gmail.com"
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 hover:text-blue-600 transition-all duration-300 group flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 min-h-[48px] touch-manipulation active:scale-[0.98] p-3 rounded-xl hover:bg-gray-50"
              >
                <span className="group-hover:scale-110 transition-transform duration-300 text-xl sm:text-2xl md:text-3xl">📧</span>
                <span className="break-all text-center sm:text-left">cancelhelper@gmail.com</span>
              </a>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 mt-4 sm:mt-6 md:mt-8 italic leading-relaxed">
                We usually reply within a few hours — fast and friendly.
              </p>
            </div>
          </div>
        </section>

        {/* Return Link - Mobile Optimized */}
        <section className="px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 sm:gap-3 text-blue-600 text-base sm:text-lg md:text-xl font-medium hover:text-blue-700 transition-all duration-300 hover:scale-105 group min-h-[48px] touch-manipulation px-4 sm:px-6 py-3 rounded-xl hover:bg-blue-50 active:bg-blue-100 active:scale-[0.98]"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
              Return to App
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
} 