import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { get24HourReminderTemplate } from '@/lib/email-templates'
import { Resend } from 'resend'

export async function GET() {
  console.log('⏰ CRON JOB STARTED - Automatic reminder check at:', new Date().toISOString())
  
  try {
    // Calculate 24 hours from now (with some tolerance for exact timing)
    const now = new Date()
    const twentyThreeHoursFromNow = new Date(now.getTime() + 23 * 60 * 60 * 1000)
    const twentyFiveHoursFromNow = new Date(now.getTime() + 25 * 60 * 60 * 1000)

    console.log('🔍 CRON: Checking for reminders to send...')
    console.log('🕐 CRON: Target window:', twentyThreeHoursFromNow.toISOString(), 'to', twentyFiveHoursFromNow.toISOString())

    // Find trials ending in approximately 24 hours that haven't been reminded yet
    const { data: reminders, error } = await supabase
      .from('reminders')
      .select('*')
      .gte('trial_end_date', twentyThreeHoursFromNow.toISOString())
      .lte('trial_end_date', twentyFiveHoursFromNow.toISOString())
      .eq('reminder_sent', false)

    if (error) {
      console.error('❌ CRON: Database error:', error)
      return NextResponse.json({ 
        success: false,
        error: 'Database error', 
        details: error.message,
        timestamp: now.toISOString(),
        type: 'cron'
      }, { status: 500 })
    }

    if (!reminders || reminders.length === 0) {
      console.log('✅ CRON: No reminders to send at this time')
      return NextResponse.json({ 
        success: true,
        message: 'No reminders to send', 
        checked_window: `${twentyThreeHoursFromNow.toISOString()} to ${twentyFiveHoursFromNow.toISOString()}`,
        found: 0,
        sent: 0,
        errors: 0,
        timestamp: now.toISOString(),
        type: 'cron'
      })
    }

    console.log(`📧 CRON: Found ${reminders.length} reminder(s) to send`)

    const results = []
    let sentCount = 0
    let errorCount = 0

    for (const reminder of reminders) {
      try {
        console.log(`🔄 CRON: Processing reminder for ${reminder.email} (${reminder.service_name})`)
        
        // Generate email content
        const emailTemplate = get24HourReminderTemplate({
          serviceName: reminder.service_name,
          trialEndDate: reminder.trial_end_date,
          cancelUrl: reminder.cancel_url
        })

        // Check if using placeholder API key
        if (process.env.RESEND_API_KEY === 're_placeholder_key') {
          // Simulate sending
          console.log('📧 CRON: SIMULATED EMAIL SEND:')
          console.log('📧 CRON: To:', reminder.email)
          console.log('📧 CRON: Subject:', emailTemplate.subject)
          console.log('📧 CRON: Service:', reminder.service_name)
          console.log('📧 CRON: Trial ends:', reminder.trial_end_date)
          
          // Mark as sent in database
          const { error: updateError } = await supabase
            .from('reminders')
            .update({ reminder_sent: true })
            .eq('id', reminder.id)

          if (updateError) {
            console.error('❌ CRON: Error updating reminder status:', updateError)
            results.push({ 
              email: reminder.email, 
              service: reminder.service_name,
              status: 'error', 
              error: 'Failed to update database' 
            })
            errorCount++
            continue
          }

          console.log(`✅ CRON: Simulated email for ${reminder.email} (${reminder.service_name})`)
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
            from: 'CancelHelper <onboarding@resend.dev>',
            to: [reminder.email],
            subject: emailTemplate.subject,
            html: emailTemplate.html,
            text: emailTemplate.text
          })

          if (emailResult.error) {
            console.error('❌ CRON: Resend error:', emailResult.error)
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
            console.error('❌ CRON: Error updating reminder status:', updateError)
            results.push({ 
              email: reminder.email, 
              service: reminder.service_name,
              status: 'error', 
              error: 'Email sent but failed to update database' 
            })
            errorCount++
            continue
          }

          console.log(`✅ CRON: Email sent successfully to ${reminder.email} for ${reminder.service_name}`)
          results.push({ 
            email: reminder.email, 
            service: reminder.service_name,
            status: 'sent',
            emailId: emailResult.data?.id 
          })
          sentCount++
        }

      } catch (emailError) {
        console.error('❌ CRON: Error processing reminder:', emailError)
        results.push({ 
          email: reminder.email, 
          service: reminder.service_name,
          status: 'error', 
          error: String(emailError) 
        })
        errorCount++
      }
    }

    console.log(`📊 CRON: Final results - ${sentCount} sent, ${errorCount} errors`)
    console.log('✅ CRON JOB COMPLETED at:', new Date().toISOString())

    return NextResponse.json({
      success: true,
      message: `CRON: Processed ${reminders.length} reminder(s)`,
      sent: sentCount,
      errors: errorCount,
      results: results,
      checked_window: `${twentyThreeHoursFromNow.toISOString()} to ${twentyFiveHoursFromNow.toISOString()}`,
      timestamp: now.toISOString(),
      type: 'cron'
    })

  } catch (error) {
    console.error('❌ CRON: Send reminders error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to send reminders', 
        details: String(error),
        timestamp: new Date().toISOString(),
        type: 'cron'
      },
      { status: 500 }
    )
  }
} 