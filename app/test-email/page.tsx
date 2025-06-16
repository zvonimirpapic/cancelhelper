'use client'
import { useState } from 'react'

export default function TestEmail() {
  const [email, setEmail] = useState('test@example.com')
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [reminderLoading, setReminderLoading] = useState(false)
  const [reminderResult, setReminderResult] = useState('')

  const sendTestEmail = async () => {
    setIsLoading(true)
    setResult('')
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: 'Test Email from CancelHelper',
          text: 'This is a test email to verify the email integration is working correctly.'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult(`✅ ${data.message} (ID: ${data.id})`)
      } else {
        setResult(`❌ Error: ${data.error}`)
      }
    } catch (error) {
      setResult(`❌ Network error: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const sendRemindersNow = async () => {
    setReminderLoading(true)
    setReminderResult('')
    
    try {
      const response = await fetch('/api/send-reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        if (data.sent > 0) {
          setReminderResult(`✅ ${data.message} - Sent: ${data.sent}, Errors: ${data.errors}`)
        } else {
          setReminderResult(`ℹ️ ${data.message} - No reminders due at this time`)
        }
      } else {
        setReminderResult(`❌ Error: ${data.error}`)
      }
    } catch (error) {
      setReminderResult(`❌ Network error: ${error}`)
    } finally {
      setReminderLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📧 Email Test</h1>
          <p className="text-gray-600">Test basic email sending functionality</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Test Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="test@example.com"
              />
            </div>
            
            <button
              onClick={sendTestEmail}
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Sending...' : '📧 Send Test Email'}
            </button>
            
            {result && (
              <div className={`p-3 rounded-md text-sm ${
                result.includes('✅') 
                  ? 'bg-green-50 text-green-800' 
                  : 'bg-red-50 text-red-800'
              }`}>
                {result}
              </div>
            )}
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Email functionality ready. 
                Check the console for email details.
              </p>
            </div>
          </div>
        </div>

        {/* Reminder Testing Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">📅 Reminder System Test</h2>
            <p className="text-gray-600 text-sm">Test the automated reminder sending system</p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={sendRemindersNow}
              disabled={reminderLoading}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {reminderLoading ? 'Processing...' : '📅 Send Reminders Now'}
            </button>
            
            {reminderResult && (
              <div className={`p-3 rounded-md text-sm ${
                reminderResult.includes('✅') 
                  ? 'bg-green-50 text-green-800'
                  : reminderResult.includes('ℹ️')
                  ? 'bg-blue-50 text-blue-800'
                  : 'bg-red-50 text-red-800'
              }`}>
                {reminderResult}
              </div>
            )}
            
            <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-md">
              <p className="text-sm text-purple-700">
                <strong>How it works:</strong> This checks for trials ending in 24 hours and sends reminder emails. 
                Create a reminder with trial date ~24 hours from now to test.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 