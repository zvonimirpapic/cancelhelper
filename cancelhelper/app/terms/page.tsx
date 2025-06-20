'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Terms() {
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


        {/* Terms of Service Section - Mobile Optimized */}
        <section className="px-3 xs:px-4 sm:px-6 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50/50 to-transparent p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-100/50 shadow-sm hover:shadow-lg transition-all duration-500 mb-6 xs:mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 xs:mb-5 sm:mb-6 md:mb-8 tracking-tight">
                Terms of Service
              </h2>
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div className="group">
                  <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1.5 xs:mb-2 sm:mb-2.5">What we do:</h3>
                  <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">CancelHelper sends you email reminders before your free trials end so you don&apos;t get charged unexpectedly.</p>
                </div>
                
                <div className="group">
                  <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1.5 xs:mb-2 sm:mb-2.5">Your account:</h3>
                  <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">You&apos;re responsible for keeping your login information secure. We&apos;ll never share your data with third parties.</p>
                </div>
                
                <div className="group">
                  <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1.5 xs:mb-2 sm:mb-2.5">Free plan:</h3>
                  <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">You can create 1 trial reminder for free. Pro plan ($4.99/month) gives you unlimited reminders.</p>
                </div>
                
                <div className="group">
                  <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1.5 xs:mb-2 sm:mb-2.5">Email reminders:</h3>
                  <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">We send reminders 24 hours before your trial ends. We can&apos;t guarantee email delivery due to spam filters, so check your inbox regularly.</p>
                </div>
                
                <div className="group">
                  <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1.5 xs:mb-2 sm:mb-2.5">Cancellation:</h3>
                  <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">You can delete your account anytime. Pro subscriptions can be cancelled anytime with no fees.</p>
                </div>
                
                <div className="group">
                  <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1.5 xs:mb-2 sm:mb-2.5">Changes:</h3>
                  <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">We may update these terms occasionally. We&apos;ll notify you of any major changes.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

                {/* Privacy Policy Section - Mobile Optimized */}
        <section className="px-3 xs:px-4 sm:px-6 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-slate-50/80 via-blue-50/60 to-indigo-50/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.05),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-white/60 to-transparent"></div>
          <div className="max-w-4xl mx-auto relative">
            <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl border border-white/50 p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] touch-manipulation">
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 xs:mb-5 sm:mb-6 md:mb-8 tracking-tight">
                Privacy Policy
              </h2>
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div className="group">
                  <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1.5 xs:mb-2 sm:mb-2.5">What we collect:</h3>
                  <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">Your email address, trial information you enter, and basic usage data to make the service work.</p>
                </div>
                
                <div className="group">
                  <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1.5 xs:mb-2 sm:mb-2.5">How we use it:</h3>
                  <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">Only to send you trial reminders and improve our service. We never sell your data.</p>
                </div>
                
                <div className="group">
                  <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1.5 xs:mb-2 sm:mb-2.5">Email communications:</h3>
                  <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">We only send you the trial reminders you request, plus occasional service updates.</p>
                </div>
                
                <div className="group">
                  <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1.5 xs:mb-2 sm:mb-2.5">Data security:</h3>
                  <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">Your data is stored securely and encrypted. We use industry-standard security practices.</p>
                </div>
                
                <div className="group">
                  <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1.5 xs:mb-2 sm:mb-2.5">Your rights:</h3>
                  <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">You can request to see, update, or delete your data anytime by contacting us.</p>
                </div>
                
                <div className="group">
                  <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1.5 xs:mb-2 sm:mb-2.5">Contact:</h3>
                  <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                    Questions about privacy? Email us at{' '}
                    <a 
                      href="mailto:cancelhelper@gmail.com"
                      className="text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors duration-200 font-medium touch-manipulation min-h-[44px] inline-block py-1"
                    >
                      cancelhelper@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Return Link - Mobile Optimized */}
        <section className="px-3 xs:px-4 sm:px-6 py-6 xs:py-8 sm:py-10 md:py-12">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 sm:gap-3 text-blue-600 text-sm xs:text-base sm:text-lg md:text-xl font-medium hover:text-blue-700 transition-all duration-300 hover:scale-105 group min-h-[44px] xs:min-h-[48px] touch-manipulation px-4 xs:px-5 sm:px-6 py-3 xs:py-3.5 rounded-lg xs:rounded-xl hover:bg-blue-50 active:bg-blue-100 active:scale-[0.98]"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
              Back to App
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}