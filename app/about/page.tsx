'use client'
import Link from 'next/link'

export default function About() {
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
            <div className="flex space-x-4 sm:space-x-8">
              <Link 
                href="/about" 
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
                About
              </Link>
              <Link 
                href="/pricing" 
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
                Pricing
              </Link>
              <Link 
                href="/login" 
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
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-white">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 lg:mb-10">
              About Cancel Helper
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12">
              We're on a mission to help people stop wasting money on forgotten subscriptions and free trials. 
              Simple, reliable, and built to keep things stress-free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">$273</div>
                <div className="text-sm sm:text-base text-gray-600">Average saved per year</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600">10,000+</div>
                <div className="text-sm sm:text-base text-gray-600">Happy users</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600">87%</div>
                <div className="text-sm sm:text-base text-gray-600">People forget trials</div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12 sm:mb-16 lg:mb-20">
              Our Mission
            </h2>
            <div className="grid gap-8 sm:gap-10 lg:gap-12 md:grid-cols-2">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 sm:mb-8">
                  Why We Built This
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  We've all been there - signing up for a "free" trial and completely forgetting about it until we see the unexpected charge on our credit card statement. It's frustrating, and frankly, it shouldn't happen.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  That's why we created Cancel Helper. We believe technology should work for you, not against you. Our simple reminder system puts the power back in your hands.
                </p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 sm:mb-8">
                  Our Values
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                      <span className="text-blue-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Privacy First</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Your data is encrypted and never shared with third parties.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Simple & Reliable</h4>
                      <p className="text-xs sm:text-sm text-gray-600">No confusing features. Just one job done really well.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                      <span className="text-purple-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Customer Focused</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Built by people who hate unexpected charges too.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/60 to-transparent"></div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
            <div className="mb-8 sm:mb-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-sm border border-white/50 backdrop-blur-sm">
                <span className="text-2xl sm:text-3xl">💌</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 lg:mb-10 tracking-tight">
                Let's Talk
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12">
                Got a question, suggestion, or just want to say hi? We're real humans who care about you and your money.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 sm:p-8 lg:p-10 transform transition-all duration-500 hover:shadow-xl hover:scale-105">
              <p className="text-sm sm:text-base text-gray-500 mb-3 sm:mb-4 font-medium tracking-wide uppercase">
                📩 Reach out anytime
              </p>
              <a 
                href="mailto:cancelhelper@gmail.com"
                className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 hover:text-blue-600 transition-all duration-300 ease-in-out cursor-pointer group inline-flex items-center gap-3"
                style={{
                  transform: 'scale(1)',
                  transition: 'all 0.3s ease-in-out'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = 'scale(1)';
                }}
              >
                <span className="group-hover:scale-110 transition-transform duration-300">📧</span>
                cancelhelper@gmail.com
              </a>
              <p className="text-sm sm:text-base text-gray-500 mt-4 sm:mt-6 italic">
                We usually reply within a few hours — fast and friendly.
              </p>
            </div>
          </div>
        </section>

        {/* Return Link */}
        <section className="py-8 sm:py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <Link 
              href="/" 
              className="text-blue-600 text-sm sm:text-base cursor-pointer transition-all duration-300 ease-in-out inline-block"
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
        </section>
      </div>
    </div>
  )
} 