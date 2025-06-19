import Link from 'next/link'

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Privacy</h1>
          <p className="text-xl text-gray-600">Simple terms for a simple service</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms of Service</h2>
          <div className="prose text-gray-600 space-y-4">
            <p><strong>What we do:</strong> CancelHelper sends you email reminders before your free trials end so you don't get charged unexpectedly.</p>
            
            <p><strong>Your account:</strong> You're responsible for keeping your login information secure. We'll never share your data with third parties.</p>
            
            <p><strong>Free plan:</strong> You can create up to 3 trial reminders for free. Pro plan ($1.99/month) gives you unlimited reminders.</p>
            
            <p><strong>Email reminders:</strong> We send reminders 24 hours before your trial ends. We can't guarantee email delivery due to spam filters, so check your inbox regularly.</p>
            
            <p><strong>Cancellation:</strong> You can delete your account anytime. Pro subscriptions can be cancelled anytime with no fees.</p>
            
            <p><strong>Changes:</strong> We may update these terms occasionally. We'll notify you of any major changes.</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h2>
          <div className="prose text-gray-600 space-y-4">
            <p><strong>What we collect:</strong> Your email address, trial information you enter, and basic usage data to make the service work.</p>
            
            <p><strong>How we use it:</strong> Only to send you trial reminders and improve our service. We never sell your data.</p>
            
            <p><strong>Email communications:</strong> We only send you the trial reminders you request, plus occasional service updates.</p>
            
            <p><strong>Data security:</strong> Your data is stored securely and encrypted. We use industry-standard security practices.</p>
            
            <p><strong>Your rights:</strong> You can request to see, update, or delete your data anytime by contacting us.</p>
            
            <p><strong>Contact:</strong> Questions about privacy? Email us at privacy@cancelhelper.com</p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-500">
            ← Back to App
          </Link>
        </div>
      </div>
    </div>
  )
} 