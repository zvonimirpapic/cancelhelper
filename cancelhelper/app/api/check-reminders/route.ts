import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('🔍 Manual reminder check triggered...')

    // Get all reminders in the database for analysis
    const { data: allReminders, error: allError } = await supabase
      .from('reminders')
      .select('*')
      .order('trial_end_date', { ascending: true })

    if (allError) {
      console.error('Database error:', allError)
      return NextResponse.json({ error: 'Database error', details: allError.message }, { status: 500 })
    }

    const now = new Date()
    const twentyThreeHoursFromNow = new Date(now.getTime() + 23 * 60 * 60 * 1000)
    const twentyFiveHoursFromNow = new Date(now.getTime() + 25 * 60 * 60 * 1000)

    // Find reminders due for sending
    const dueReminders = allReminders?.filter(reminder => {
      const trialDate = new Date(reminder.trial_end_date)
      return trialDate >= twentyThreeHoursFromNow && 
             trialDate <= twentyFiveHoursFromNow && 
             !reminder.reminder_sent
    }) || []

    // Categorize all reminders for better debugging
    const categorizedReminders = {
      total: allReminders?.length || 0,
      dueForReminder: dueReminders.length,
      alreadySent: allReminders?.filter(r => r.reminder_sent).length || 0,
      upcoming: allReminders?.filter(r => {
        const trialDate = new Date(r.trial_end_date)
        return trialDate > twentyFiveHoursFromNow && !r.reminder_sent
      }).length || 0,
      expired: allReminders?.filter(r => {
        const trialDate = new Date(r.trial_end_date)
        return trialDate <= now
      }).length || 0
    }

    return NextResponse.json({
      message: 'Reminder check completed',
      current_time: now.toISOString(),
      target_window: {
        start: twentyThreeHoursFromNow.toISOString(),
        end: twentyFiveHoursFromNow.toISOString()
      },
      stats: categorizedReminders,
      due_reminders: dueReminders.map(r => ({
        id: r.id,
        email: r.email,
        service: r.service_name,
        trial_end_date: r.trial_end_date,
        hours_until_trial: Math.round((new Date(r.trial_end_date).getTime() - now.getTime()) / (1000 * 60 * 60))
      })),
      next_steps: dueReminders.length > 0 
        ? 'Call POST /api/send-reminders to send these reminders'
        : 'No reminders due at this time',
      all_reminders: allReminders?.map(r => ({
        id: r.id,
        email: r.email,
        service: r.service_name,
        trial_end_date: r.trial_end_date,
        reminder_sent: r.reminder_sent,
        hours_until_trial: Math.round((new Date(r.trial_end_date).getTime() - now.getTime()) / (1000 * 60 * 60)),
        status: (() => {
          const trialDate = new Date(r.trial_end_date)
          if (r.reminder_sent) return 'reminder_sent'
          if (trialDate <= now) return 'expired'
          if (trialDate >= twentyThreeHoursFromNow && trialDate <= twentyFiveHoursFromNow) return 'due_for_reminder'
          if (trialDate > twentyFiveHoursFromNow) return 'upcoming'
          return 'past_reminder_window'
        })()
      })) || []
    })

  } catch (error) {
    console.error('Check reminders error:', error)
    return NextResponse.json(
      { error: 'Failed to check reminders', details: String(error) },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    console.log('🚀 Manual trigger: Calling send-reminders API...')
    
    // Make a request to our send-reminders endpoint
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'
    
    const response = await fetch(`${baseUrl}/api/send-reminders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()

    return NextResponse.json({
      message: 'Manual reminder trigger completed',
      trigger_status: response.ok ? 'success' : 'error',
      send_reminders_response: result
    })

  } catch (error) {
    console.error('Manual trigger error:', error)
    return NextResponse.json(
      { error: 'Failed to trigger reminder sending', details: String(error) },
      { status: 500 }
    )
  }
} 