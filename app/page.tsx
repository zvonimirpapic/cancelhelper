'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 bg-white shadow-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4 sm:py-5">
            <div className="text-lg sm:text-xl font-bold tracking-widest text-gray-900">
              CH
            </div>
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
        {/* Why Use It Section */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12 sm:mb-16 lg:mb-20">
              Why People Love Cancel Helper
            </h2>
            <div className="grid gap-8 sm:gap-10 lg:gap-12 md:grid-cols-3">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                  <span className="text-2xl sm:text-4xl">💰</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-5">Save Money</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Never get charged for something you forgot to cancel 💸</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                  <span className="text-2xl sm:text-4xl">😌</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-5">Stop stressing</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Relax. We remember so you don't have to</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                  <span className="text-2xl sm:text-4xl">📧</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-5">Clean inbox</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">No spam. Just one helpful email.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12 sm:mb-16 lg:mb-20">
              How It Works
            </h2>
            <div className="grid gap-8 sm:gap-10 lg:gap-12 md:grid-cols-3">
              <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                  <span className="text-xl sm:text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-5">Add what you signed up for</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Takes 10 seconds. Just tell us the service and when it ends.</p>
              </div>
              
              <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                  <span className="text-xl sm:text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-5">We lock it down 🔒</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Your info is encrypted and stored securely.</p>
              </div>
              
              <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                  <span className="text-xl sm:text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-5">We remind you</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">One email. 24 hours before your trial ends.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-blue-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 lg:mb-10">
              Ready to stop wasting money?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 lg:mb-12 leading-relaxed max-w-2xl mx-auto">
              Join thousands of users who never forget to cancel trials anymore.
            </p>
            <Link 
              href="/signup"
              className="inline-block bg-blue-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl cursor-pointer"
              style={{
                transform: 'scale(1)',
                backgroundColor: '#3b82f6',
                transition: 'all 0.3s ease-in-out'
              }}
              onMouseEnter={(e) => {
                const element = e.target as HTMLElement;
                element.style.transform = 'scale(1.1)';
                element.style.backgroundColor = '#2563eb';
              }}
              onMouseLeave={(e) => {
                const element = e.target as HTMLElement;
                element.style.transform = 'scale(1)';
                element.style.backgroundColor = '#3b82f6';
              }}
            >
              Start for Free
            </Link>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12 sm:mb-16 lg:mb-20">
              What Our Users Say
            </h2>
            <div className="grid gap-6 sm:gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-3">
              {/* Kevin Chan */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-start mb-5 sm:mb-6">
                  <img 
                    src="/kevin-chan.png" 
                    alt="Kevin Chan profile picture"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover object-top mr-3 sm:mr-4 flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Kevin Chan</p>
                    <p className="text-xs sm:text-sm text-gray-500">@kevin_chan</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">Hey I used @CancelHelper as a freelancer, and in just 2 weeks, I realized how many trials I always forget to cancel 🙋</p>
              </div>

              {/* Trendline Capital */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-start mb-5 sm:mb-6">
                  <img 
                    src="/trendline-capital.png" 
                    alt="Trendline Capital profile picture"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover object-top mr-3 sm:mr-4 flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Trendline Capital</p>
                    <p className="text-xs sm:text-sm text-gray-500">@trendline_cap</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">Thank you so much, <span className="font-semibold">simple efficient and so cheap</span></p>
              </div>

              {/* Warren X */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-start mb-5 sm:mb-6">
                  <img 
                    src="/warren-x.png" 
                    alt="Warren X profile picture"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover object-top mr-3 sm:mr-4 flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Warren X.</p>
                    <p className="text-xs sm:text-sm text-gray-500">@warrenxofficial</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">Set up once and forget about it, super easy and simple. great job</p>
              </div>


            </div>
          </div>
        </section>

        {/* Premium Service Logos */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h3 className="text-lg sm:text-xl font-semibold text-center text-gray-600 mb-12 sm:mb-16 lg:mb-20">
              Track subscriptions from your favorite services
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 items-center justify-items-center max-w-5xl mx-auto">
              
              {/* Netflix */}
              <div className="flex items-center justify-center h-16 sm:h-20">
                <div className="text-red-600 font-bold text-2xl sm:text-3xl tracking-tight">NETFLIX</div>
              </div>

              {/* Disney+ */}
              <div className="flex items-center justify-center h-16 sm:h-20 relative">
                <div className="text-center relative">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-3 border-t-4 border-blue-500 rounded-t-full"></div>
                  <div className="text-blue-600 font-bold text-lg sm:text-xl" style={{fontFamily: 'serif'}}>Disney</div>
                  <div className="text-blue-600 font-bold text-xl sm:text-2xl absolute -right-4 top-0">+</div>
                </div>
              </div>

              {/* Apple TV */}
              <div className="flex items-center justify-center h-16 sm:h-20">
                <div className="flex items-center space-x-1">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span className="text-black font-medium text-xl sm:text-2xl">tv</span>
                </div>
              </div>

              {/* Spotify */}
              <div className="flex items-center justify-center h-16 sm:h-20">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center relative">
                    <div className="absolute top-2 left-1 w-5 h-1 bg-white rounded-full"></div>
                    <div className="absolute top-3 left-1 w-6 h-1 bg-white rounded-full"></div>
                    <div className="absolute top-4 left-1 w-5 h-1 bg-white rounded-full"></div>
                  </div>
                  <span className="text-black font-medium text-lg sm:text-xl">Spotify</span>
                </div>
              </div>

              {/* YouTube Premium */}
              <div className="flex items-center justify-center h-16 sm:h-20">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-6 sm:w-10 sm:h-7 bg-red-600 rounded-lg flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
                  </div>
                  <span className="text-black font-medium text-lg sm:text-xl">YouTube Premium</span>
                </div>
              </div>

              {/* Max */}
              <div className="flex items-center justify-center h-16 sm:h-20">
                <div className="text-blue-600 font-bold text-2xl sm:text-3xl lowercase">max</div>
              </div>

              {/* Hulu */}
              <div className="flex items-center justify-center h-16 sm:h-20">
                <div className="text-green-500 font-bold text-2xl sm:text-3xl lowercase">hulu</div>
              </div>

              {/* Prime */}
              <div className="flex items-center justify-center h-16 sm:h-20">
                <div className="text-center">
                  <div className="text-blue-600 font-medium text-xl sm:text-2xl">prime</div>
                  <div className="w-8 h-1 bg-blue-600 rounded-full mx-auto relative">
                    <div className="absolute right-0 top-0 w-0 h-0 border-l-[4px] border-l-blue-600 border-t-[2px] border-t-transparent border-b-[2px] border-b-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Audible */}
              <div className="flex items-center justify-center h-16 sm:h-20">
                <div className="flex items-center space-x-1">
                  <span className="text-black font-medium text-lg sm:text-xl">audible</span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-2 bg-orange-400 rounded-full"></div>
                    <div className="w-1 h-3 bg-orange-400 rounded-full"></div>
                    <div className="w-1 h-4 bg-orange-400 rounded-full"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-10 lg:mb-12">
              <div className="text-lg sm:text-xl font-bold tracking-widest mb-6 sm:mb-0">
                Cancel Helper
              </div>
              <div className="flex space-x-6 sm:space-x-8 text-sm">
                <Link 
                  href="/terms" 
                  className="text-gray-300 hover:text-white transition-all duration-300 ease-in-out transform cursor-pointer"
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
                  Terms
                </Link>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8 sm:pt-10 lg:pt-12 text-center">
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                © 2025 Cancel Helper. Save money, never forget to cancel.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}