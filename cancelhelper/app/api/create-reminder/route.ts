import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getReminderConfirmationTemplate } from '@/lib/email-templates'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { serviceName, trialEndDate, email, userPlan = 'free' } = body
    
    console.log('📝 CREATE REMINDER: Request received', { 
      serviceName, 
      trialEndDate, 
      email,
      userPlan 
    })
    
    // Validation
    if (!serviceName || !trialEndDate || !email) {
      console.log('❌ CREATE REMINDER: Missing required fields')
      return NextResponse.json({ 
        error: 'Service name, trial end date, and email are required' 
      }, { status: 400 })
    }

    // Check reminder limit for free users
    if (userPlan === 'free') {
      const { data: existingReminders, error: countError } = await supabase
        .from('reminders')
        .select('id')
        .eq('email', email)

      if (countError) {
        console.error('❌ CREATE REMINDER: Error checking existing reminders:', countError)
        return NextResponse.json({ 
          error: 'Failed to check reminder limit', 
          details: countError.message 
        }, { status: 500 })
      }

      if (existingReminders && existingReminders.length >= 1) {
        console.log('❌ CREATE REMINDER: Free user limit exceeded')
        return NextResponse.json({ 
          error: 'Free plan allows only 1 reminder. Upgrade to Pro for unlimited reminders.' 
        }, { status: 403 })
      }
    }
    
    // Validate date format and future date
    const trialDate = new Date(trialEndDate)
    const now = new Date()
    
    if (isNaN(trialDate.getTime())) {
      console.log('❌ CREATE REMINDER: Invalid date format')
      return NextResponse.json({ 
        error: 'Invalid date format' 
      }, { status: 400 })
    }
    
    if (trialDate <= now) {
      console.log('❌ CREATE REMINDER: Date is in the past')
      return NextResponse.json({ 
        error: 'Trial end date must be in the future' 
      }, { status: 400 })
    }
    
    // Insert into database
    const { data, error } = await supabase
      .from('reminders')
      .insert([
        {
          email: email,
          service_name: serviceName,
          trial_end_date: trialDate.toISOString(),
          cancel_url: null, // No longer supporting cancel URLs
          reminder_sent: false,
          created_at: new Date().toISOString()
        }
      ])
      .select()
    
    if (error) {
      console.error('❌ CREATE REMINDER: Database error:', error)
      return NextResponse.json({ 
        error: 'Failed to create reminder', 
        details: error.message 
      }, { status: 500 })
    }
    
    console.log('✅ CREATE REMINDER: Successfully created', data?.[0]?.id)
    
    // Send immediate confirmation email
    try {
      console.log('📧 CONFIRMATION EMAIL: Sending to', email)
      
      const emailTemplate = getReminderConfirmationTemplate({
        serviceName,
        trialEndDate: trialDate.toISOString(),
        customerEmail: email
      })
      
      const emailResult = await resend.emails.send({
        from: 'CancelHelper <reminders@cancelhelper.app>',
        to: email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      })
      
      console.log('✅ CONFIRMATION EMAIL: Sent successfully', emailResult.data?.id)
    } catch (emailError) {
      console.error('❌ CONFIRMATION EMAIL: Failed to send', emailError)
      // Don't fail the whole request if email fails - reminder is still created
    }
    
    // Calculate time until trial ends
    const hoursUntilTrial = Math.round((trialDate.getTime() - now.getTime()) / (1000 * 60 * 60))
    
    return NextResponse.json({
      success: true,
      message: `Reminder created! Check your email for confirmation. We'll remind you 24 hours before your ${serviceName} trial ends.`,
      reminder: {
        id: data?.[0]?.id,
        serviceName,
        trialEndDate: trialDate.toISOString(),
        hoursUntilTrial
      }
    })
    
  } catch (error) {
    console.error('❌ CREATE REMINDER: Server error:', error)
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: String(error) 
    }, { status: 500 })
  }
}

// GET method for getting user's reminders
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json({ 
        error: 'Email parameter required' 
      }, { status: 400 })
    }
    
    console.log('📋 GET REMINDERS: Fetching for', email)
    
    const { data: reminders, error } = await supabase
      .from('reminders')
      .select('*')
      .eq('email', email)
      .order('trial_end_date', { ascending: true })
    
    if (error) {
      console.error('❌ GET REMINDERS: Database error:', error)
      return NextResponse.json({ 
        error: 'Failed to fetch reminders', 
        details: error.message 
      }, { status: 500 })
    }
    
    console.log('✅ GET REMINDERS: Found', reminders?.length || 0, 'reminders')
    
    const now = new Date()
    const processedReminders = reminders?.map(reminder => ({
      id: reminder.id,
      serviceName: reminder.service_name,
      trialEndDate: reminder.trial_end_date,
      reminderSent: reminder.reminder_sent,
      hoursUntilTrial: Math.round((new Date(reminder.trial_end_date).getTime() - now.getTime()) / (1000 * 60 * 60)),
      status: (() => {
        const trialDate = new Date(reminder.trial_end_date)
        if (reminder.reminder_sent) return 'reminded'
        if (trialDate <= now) return 'expired'
        return 'active'
      })()
    })) || []
    
    return NextResponse.json({
      success: true,
      reminders: processedReminders,
      total: processedReminders.length
    })
    
  } catch (error) {
    console.error('❌ GET REMINDERS: Server error:', error)
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: String(error) 
    }, { status: 500 })
  }
}