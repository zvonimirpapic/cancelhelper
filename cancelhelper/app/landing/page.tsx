import Link from 'next/link'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">CancelHelper</h1>
        </div>

        {/* Main Content */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Never Waste Money on Forgotten Trials Again
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get reminded 24 hours before your free trial ends
          </p>
          
          <Link 
            href="/"
            className="inline-block bg-blue-600 text-white py-3 px-8 rounded-md text-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Set Your First Reminder
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl mb-4">⏰</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">24-Hour Notice</h3>
            <p className="text-gray-600">Get notified exactly when you need to cancel</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Reminders</h3>
            <p className="text-gray-600">Receive beautiful email alerts with cancel links</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Money</h3>
            <p className="text-gray-600">Never pay for services you forgot to cancel</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm">
          <p>&copy; 2024 CancelHelper. Help people save money on forgotten subscriptions.</p>
        </footer>
        
      </div>
    </div>
  )
} 