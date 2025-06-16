'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [email, setEmail] = useState('')
  const [serviceName, setServiceName] = useState('')
  const [trialEndDate, setTrialEndDate] = useState('')
  const [cancelUrl, setCancelUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [showOtherInput, setShowOtherInput] = useState(false)

  const serviceUrls = {
    'Netflix': 'https://www.netflix.com/cancelplan',
    'Spotify': 'https://www.spotify.com/account/subscription',
    'Disney+': 'https://www.disneyplus.com/account/subscription'
  }

  const handleServiceChange = (selectedService: string) => {
    setServiceName(selectedService)
    setShowOtherInput(selectedService === 'Other')
    
    // Auto-fill cancel URL if service has a predefined URL and user hasn't entered one
    if (selectedService in serviceUrls && !cancelUrl) {
      setCancelUrl(serviceUrls[selectedService as keyof typeof serviceUrls])
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')
    
    try {
      // Validate the trial end date is in the future
      const trialDate = new Date(trialEndDate)
      if (trialDate <= new Date()) {
        throw new Error('Trial end date must be in the future')
      }

      const { data, error } = await supabase
        .from('reminders')
        .insert([
          {
            email: email,
            service_name: serviceName,
            trial_end_date: trialDate.toISOString(),
            cancel_url: cancelUrl || null
          }
        ])
        .select()
      
      if (error) {
        throw error
      }
      
      console.log('Reminder created successfully:', data)
      setMessage('✅ Reminder set successfully! We&apos;ll email you before your trial ends.')
      
      // Reset form
      setEmail('')
      setServiceName('')
      setTrialEndDate('')
      setCancelUrl('')
      
    } catch (error) {
      console.error('Error setting reminder:', error)
      
      let errorMessage = 'Please try again.'
      if (error instanceof Error) {
        if (error.message.includes('relation "reminders" does not exist')) {
          errorMessage = 'Database setup required. Please contact support.'
        } else if (error.message.includes('duplicate key')) {
          errorMessage = 'A reminder for this email and service already exists.'
        } else {
          errorMessage = error.message
        }
      }
      
      setMessage(`❌ Error setting reminder: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CancelHelper</h1>
          <p className="text-gray-600">Never forget to cancel a trial again</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Name
              </label>
              <select
                value={showOtherInput ? 'Other' : serviceName}
                onChange={(e) => handleServiceChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              >
                <option value="">Select a service...</option>
                <option value="Netflix">Netflix 🎬</option>
                <option value="Spotify">Spotify 🎵</option>
                <option value="Disney+">Disney+ 🏰</option>
                <option value="Hulu">Hulu 📺</option>
                <option value="Apple TV+">Apple TV+ 🍎</option>
                <option value="Amazon Prime">Amazon Prime 📦</option>
                <option value="YouTube Premium">YouTube Premium ▶️</option>
                <option value="Other">Other 💻</option>
              </select>
              
              {showOtherInput && (
                <input
                  type="text"
                  value={serviceName === 'Other' ? '' : serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 mt-2"
                  placeholder="Enter custom service name..."
                  required
                />
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trial End Date & Time
              </label>
              <input
                type="datetime-local"
                value={trialEndDate}
                onChange={(e) => setTrialEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cancel URL (Optional)
              </label>
              <input
                type="url"
                value={cancelUrl}
                onChange={(e) => setCancelUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="https://service.com/cancel"
              />
            </div>
            
            {message && (
              <div className={`p-3 rounded-md text-sm ${
                message.includes('Error') 
                  ? 'bg-red-50 text-red-800' 
                  : 'bg-green-50 text-green-800'
              }`}>
                {message}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Setting Reminder...' : 'Set Reminder'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>We&apos;ll send you 1 reminder:</p>
            <p className="text-xs mt-1">24 hours before your trial ends</p>
          </div>
        </div>
      </div>
    </div>
  )
}