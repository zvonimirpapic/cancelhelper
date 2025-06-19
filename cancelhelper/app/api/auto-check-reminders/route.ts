import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { get24HourReminderTemplate } from '@/lib/email-templates'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Auto-check endpoint that runs more frequently for development
export async function GET() {
  console.log('🔄 AUTO-CHECK: Checking for reminders to send at:', new Date().toISOString())
  
  try {
    // Check for reminders in the next 26 hours (more lenient for development)
    const now = new Date()
    const twentySixHoursFromNow = new Date(now.getTime() + 26 * 60 * 60 * 1000)

    console.log('🔍 AUTO-CHECK: Looking for trials ending before:', twentySixHoursFromNow.toISOString())

    // Find trials ending in the next 26 hours that haven't been reminded yet
    const { data: reminders, error } = await supabase
      .from('reminders')
      .select('*')
      .lte('trial_end_date', twentySixHoursFromNow.toISOString())
      .eq('reminder_sent', false)

    if (error) {
      console.error('❌ AUTO-CHECK: Database error:', error)
      return NextResponse.json({ 
        success: false,
        error: 'Database error', 
        details: error.message,
        timestamp: now.toISOString(),
        type: 'auto_check'
      }, { status: 500 })
    }

    if (!reminders || reminders.length === 0) {
      console.log('✅ AUTO-CHECK: No reminders to send at this time')
      return NextResponse.json({ 
        success: true,
        message: 'No reminders to send', 
        checked_until: twentySixHoursFromNow.toISOString(),
        found: 0,
        sent: 0,
        errors: 0,
        timestamp: now.toISOString(),
        type: 'auto_check'
      })
    }

    console.log(`📧 AUTO-CHECK: Found ${reminders.length} reminder(s) to send`)

    const results = []
    let sentCount = 0
    let errorCount = 0

    for (const reminder of reminders) {
      try {
        console.log(`🔄 AUTO-CHECK: Processing reminder for ${reminder.email} (${reminder.service_name})`)
        console.log(`🔄 AUTO-CHECK: Trial ends at ${reminder.trial_end_date}`)
        
        // Calculate hours until trial
        const trialDate = new Date(reminder.trial_end_date)
        const hoursUntilTrial = Math.round((trialDate.getTime() - now.getTime()) / (1000 * 60 * 60))
        
        console.log(`⏰ AUTO-CHECK: ${hoursUntilTrial} hours until trial ends`)
        
        // Generate email content
        const emailTemplate = get24HourReminderTemplate({
          serviceName: reminder.service_name,
          trialEndDate: reminder.trial_end_date,
          cancelUrl: reminder.cancel_url
        })

        // Send email
        const emailResult = await resend.emails.send({
          from: 'CancelHelper <reminders@cancelhelper.app>',
          to: [reminder.email],
          subject: emailTemplate.subject,
          html: emailTemplate.html,
          text: emailTemplate.text
        })

        if (emailResult.error) {
          console.error('❌ AUTO-CHECK: Resend error:', emailResult.error)
          results.push({ 
            email: reminder.email, 
            service: reminder.service_name,
            status: 'error', 
            error: emailResult.error,
            hoursUntilTrial
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
          console.error('❌ AUTO-CHECK: Error updating reminder status:', updateError)
          results.push({ 
            email: reminder.email, 
            service: reminder.service_name,
            status: 'error', 
            error: 'Email sent but failed to update database',
            hoursUntilTrial
          })
          errorCount++
          continue
        }

        console.log(`✅ AUTO-CHECK: 24-hour reminder sent successfully to ${reminder.email} for ${reminder.service_name}`)
        console.log(`✅ AUTO-CHECK: Email ID: ${emailResult.data?.id}`)
        results.push({ 
          email: reminder.email, 
          service: reminder.service_name,
          status: 'sent',
          emailId: emailResult.data?.id,
          trialEndDate: reminder.trial_end_date,
          hoursUntilTrial
        })
        sentCount++

      } catch (emailError) {
        console.error('❌ AUTO-CHECK: Error processing reminder:', emailError)
        results.push({ 
          email: reminder.email, 
          service: reminder.service_name,
          status: 'error', 
          error: String(emailError)
        })
        errorCount++
      }
    }

    console.log(`📊 AUTO-CHECK: Final results - ${sentCount} sent, ${errorCount} errors`)

    return NextResponse.json({
      success: true,
      message: `AUTO-CHECK: Processed ${reminders.length} reminder(s)`,
      sent: sentCount,
      errors: errorCount,
      results: results,
      checked_until: twentySixHoursFromNow.toISOString(),
      timestamp: now.toISOString(),
      type: 'auto_check'
    })

  } catch (error) {
    console.error('❌ AUTO-CHECK: Send reminders error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to send reminders', 
        details: String(error),
        timestamp: new Date().toISOString(),
        type: 'auto_check'
      },
      { status: 500 }
    )
  }
} 