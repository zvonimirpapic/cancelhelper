import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { get24HourReminderTemplate } from '@/lib/email-templates'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST() {
  try {
    // Calculate 24 hours from now (with some tolerance for exact timing)
    const now = new Date()
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
          const emailResult = await resend.emails.send({
            from: 'CancelHelper <reminders@cancelhelper.app>',
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
  console.log('🧪 MANUAL REMINDER TEST - Started at:', new Date().toISOString())
  
  try {
    // For testing: Check for reminders in the next 25 hours instead of just 23-25 hours
    // This makes it easier to test with recently created reminders
    const now = new Date()
    const twentyFiveHoursFromNow = new Date(now.getTime() + 25 * 60 * 60 * 1000)

    console.log('🔍 MANUAL TEST: Checking for reminders to send...')
    console.log('🕐 MANUAL TEST: Looking for trials ending before:', twentyFiveHoursFromNow.toISOString())

    // Find trials ending in the next 25 hours that haven't been reminded yet
    const { data: reminders, error } = await supabase
      .from('reminders')
      .select('*')
      .lte('trial_end_date', twentyFiveHoursFromNow.toISOString())
      .eq('reminder_sent', false)

    if (error) {
      console.error('❌ MANUAL TEST: Database error:', error)
      return NextResponse.json({ 
        success: false,
        error: 'Database error', 
        details: error.message,
        timestamp: now.toISOString(),
        type: 'manual_test'
      }, { status: 500 })
    }

    if (!reminders || reminders.length === 0) {
      console.log('✅ MANUAL TEST: No reminders found to send')
      return NextResponse.json({ 
        success: true,
        message: 'No reminders found to send', 
        checked_until: twentyFiveHoursFromNow.toISOString(),
        found: 0,
        sent: 0,
        errors: 0,
        timestamp: now.toISOString(),
        type: 'manual_test'
      })
    }

    console.log(`📧 MANUAL TEST: Found ${reminders.length} reminder(s) to process`)

    const results = []
    let sentCount = 0
    let errorCount = 0

    for (const reminder of reminders) {
      try {
        console.log(`🔄 MANUAL TEST: Processing reminder for ${reminder.email} (${reminder.service_name})`)
        console.log(`🔄 MANUAL TEST: Trial ends at ${reminder.trial_end_date}`)
        
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
          console.error('❌ MANUAL TEST: Resend error:', emailResult.error)
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
          console.error('❌ MANUAL TEST: Error updating reminder status:', updateError)
          results.push({ 
            email: reminder.email, 
            service: reminder.service_name,
            status: 'error', 
            error: 'Email sent but failed to update database' 
          })
          errorCount++
          continue
        }

        console.log(`✅ MANUAL TEST: 24-hour reminder sent successfully to ${reminder.email} for ${reminder.service_name}`)
        console.log(`✅ MANUAL TEST: Email ID: ${emailResult.data?.id}`)
        results.push({ 
          email: reminder.email, 
          service: reminder.service_name,
          status: 'sent',
          emailId: emailResult.data?.id,
          trialEndDate: reminder.trial_end_date
        })
        sentCount++

      } catch (emailError) {
        console.error('❌ MANUAL TEST: Error processing reminder:', emailError)
        results.push({ 
          email: reminder.email, 
          service: reminder.service_name,
          status: 'error', 
          error: String(emailError) 
        })
        errorCount++
      }
    }

    console.log(`📊 MANUAL TEST: Final results - ${sentCount} sent, ${errorCount} errors`)
    console.log('✅ MANUAL TEST COMPLETED at:', new Date().toISOString())

    return NextResponse.json({
      success: true,
      message: `MANUAL TEST: Processed ${reminders.length} reminder(s)`,
      sent: sentCount,
      errors: errorCount,
      results: results,
      checked_until: twentyFiveHoursFromNow.toISOString(),
      timestamp: now.toISOString(),
      type: 'manual_test'
    })

  } catch (error) {
    console.error('❌ MANUAL TEST: Send reminders error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to send reminders', 
        details: String(error),
        timestamp: new Date().toISOString(),
        type: 'manual_test'
      },
      { status: 500 }
    )
  }
} 