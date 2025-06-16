import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { get24HourReminderTemplate } from '@/lib/email-templates'
import { Resend } from 'resend'

export async function POST() {
  try {
    // Calculate 24 hours from now (with some tolerance for exact timing)
    const now = new Date()
    const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
    const twentyThreeHoursFromNow = new Date(now.getTime() + 23 * 60 * 60 * 1000)
    const twentyFiveHoursFromNow = new Date(now.getTime() + 25 * 60 * 60 * 1000)

    console.log('🔍 Checking for reminders to send...')
    console.log('Target window:', twentyThreeHoursFromNow.toISOString(), 'to', twentyFiveHoursFromNow.toISOString())

    // Find trials ending in approximately 24 hours that haven't been reminded yet
    const { data: reminders, error } = await supabase
      .from('reminders')
      .select('*')
      .gte('trial_end_date', twentyThreeHoursFromNow.toISOString())
      .lte('trial_end_date', twentyFiveHoursFromNow.toISOString())
      .eq('reminder_sent', false)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Database error', details: error.message }, { status: 500 })
    }

    if (!reminders || reminders.length === 0) {
      console.log('✅ No reminders to send at this time')
      return NextResponse.json({ 
        message: 'No reminders to send', 
        checked_window: `${twentyThreeHoursFromNow.toISOString()} to ${twentyFiveHoursFromNow.toISOString()}`,
        found: 0 
      })
    }

    console.log(`📧 Found ${reminders.length} reminder(s) to send`)

    const results = []
    let sentCount = 0
    let errorCount = 0

    for (const reminder of reminders) {
      try {
        // Generate email content
        const emailTemplate = get24HourReminderTemplate({
          serviceName: reminder.service_name,
          trialEndDate: reminder.trial_end_date,
          cancelUrl: reminder.cancel_url
        })

        // Check if using placeholder API key
        if (process.env.RESEND_API_KEY === 're_placeholder_key') {
          // Simulate sending
          console.log('📧 SIMULATED EMAIL SEND:')
          console.log('To:', reminder.email)
          console.log('Subject:', emailTemplate.subject)
          console.log('Service:', reminder.service_name)
          console.log('Trial ends:', reminder.trial_end_date)
          
          // Mark as sent in database
          const { error: updateError } = await supabase
            .from('reminders')
            .update({ reminder_sent: true })
            .eq('id', reminder.id)

          if (updateError) {
            console.error('Error updating reminder status:', updateError)
            results.push({ 
              email: reminder.email, 
              service: reminder.service_name,
              status: 'error', 
              error: 'Failed to update database' 
            })
            errorCount++
            continue
          }

          results.push({ 
            email: reminder.email, 
            service: reminder.service_name,
            status: 'simulated',
            message: 'Email simulated successfully (using placeholder API key)' 
          })
          sentCount++

        } else {
          // Send actual email
          const resend = new Resend(process.env.RESEND_API_KEY)
          const emailResult = await resend.emails.send({
            from: 'CancelHelper <noreply@your-domain.com>',
            to: [reminder.email],
            subject: emailTemplate.subject,
            html: emailTemplate.html,
            text: emailTemplate.text
          })

          if (emailResult.error) {
            console.error('Resend error:', emailResult.error)
            results.push({ 
              email: reminder.email, 
              service: reminder.service_name,
              status: 'error', 
              error: emailResult.error 
            })
            errorCount++
            continue
          }

          // Mark as sent in database
          const { error: updateError } = await supabase
            .from('reminders')
            .update({ reminder_sent: true })
            .eq('id', reminder.id)

          if (updateError) {
            console.error('Error updating reminder status:', updateError)
            results.push({ 
              email: reminder.email, 
              service: reminder.service_name,
              status: 'error', 
              error: 'Email sent but failed to update database' 
            })
            errorCount++
            continue
          }

          console.log(`✅ Email sent successfully to ${reminder.email} for ${reminder.service_name}`)
          results.push({ 
            email: reminder.email, 
            service: reminder.service_name,
            status: 'sent',
            emailId: emailResult.data?.id 
          })
          sentCount++
        }

      } catch (emailError) {
        console.error('Error processing reminder:', emailError)
        results.push({ 
          email: reminder.email, 
          service: reminder.service_name,
          status: 'error', 
          error: String(emailError) 
        })
        errorCount++
      }
    }

    console.log(`📊 Results: ${sentCount} sent, ${errorCount} errors`)

    return NextResponse.json({
      success: true,
      message: `Processed ${reminders.length} reminder(s)`,
      sent: sentCount,
      errors: errorCount,
      results: results,
      checked_window: `${twentyThreeHoursFromNow.toISOString()} to ${twentyFiveHoursFromNow.toISOString()}`
    })

  } catch (error) {
    console.error('Send reminders error:', error)
    return NextResponse.json(
      { error: 'Failed to send reminders', details: String(error) },
      { status: 500 }
    )
  }
}

// GET method for testing/info
export async function GET() {
  const now = new Date()
  const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
  
  return NextResponse.json({
    message: 'Send Reminders API',
    note: 'Use POST method to send reminders for trials ending in ~24 hours',
    current_time: now.toISOString(),
    target_time_range: `${new Date(now.getTime() + 23 * 60 * 60 * 1000).toISOString()} to ${new Date(now.getTime() + 25 * 60 * 60 * 1000).toISOString()}`,
    usage: 'POST /api/send-reminders'
  })
} 