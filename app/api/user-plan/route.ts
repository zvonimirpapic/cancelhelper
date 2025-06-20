import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'
import Stripe from 'stripe'
import { getThankYouTemplate, getCancellationTemplate } from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
})

// GET: Fetch user's current plan
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json({ error: 'Email parameter required' }, { status: 400 })
    }
    
    console.log('📋 GET USER PLAN: Fetching for', email)
    
    const { data: user, error } = await supabase
      .from('users')
      .select('plan')
      .eq('email', email)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        // User not found - return default free plan
        console.log('⚠️ GET USER PLAN: User not found, returning free plan')
        return NextResponse.json({
          success: true,
          plan: 'free'
        })
      }
      console.error('❌ GET USER PLAN: Database error:', error)
      return NextResponse.json({ 
        error: 'Failed to fetch user plan', 
        details: error.message 
      }, { status: 500 })
    }
    
    console.log('✅ GET USER PLAN: Found plan:', user?.plan || 'free')
    
    return NextResponse.json({
      success: true,
      plan: user?.plan || 'free'
    })
    
  } catch (error) {
    console.error('❌ GET USER PLAN: Server error:', error)
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: String(error) 
    }, { status: 500 })
  }
}

// POST: Update user's plan (for Stripe success)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, plan } = body
    
    if (!email || !plan) {
      return NextResponse.json({ error: 'Email and plan required' }, { status: 400 })
    }
    
    if (!['free', 'pro'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan type' }, { status: 400 })
    }
    
    console.log('🚀 UPDATE USER PLAN: Upgrading', email, 'to', plan)
    
    // If downgrading to free, first cancel Stripe subscription
    if (plan === 'free') {
      console.log('🗑️ CANCELLING STRIPE: Looking up subscription for', email)
      
      // Get user's Stripe subscription ID
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('stripe_subscription_id')
        .eq('email', email)
        .single()
      
      if (userError) {
        console.error('❌ CANCELLING STRIPE: Failed to find user:', userError)
        return NextResponse.json({ 
          error: 'Failed to find user for cancellation', 
          details: userError.message 
        }, { status: 404 })
      }
      
      if (userData?.stripe_subscription_id) {
        try {
          console.log('🗑️ CANCELLING STRIPE: Cancelling subscription', userData.stripe_subscription_id)
          
          // Cancel the Stripe subscription immediately
          await stripe.subscriptions.cancel(userData.stripe_subscription_id)
          
          console.log('✅ CANCELLING STRIPE: Successfully cancelled subscription')
        } catch (stripeError) {
          console.error('❌ CANCELLING STRIPE: Failed to cancel subscription:', stripeError)
          return NextResponse.json({ 
            error: 'Failed to cancel Stripe subscription', 
            details: stripeError instanceof Error ? stripeError.message : String(stripeError)
          }, { status: 500 })
        }
      } else {
        console.log('⚠️ CANCELLING STRIPE: No subscription ID found, proceeding with downgrade')
      }
    }
    
    const { data, error } = await supabase
      .from('users')
      .update({ 
        plan: plan,
        // Clear subscription ID when downgrading to free
        ...(plan === 'free' && { stripe_subscription_id: null })
      })
      .eq('email', email)
      .select()
    
    if (error) {
      console.error('❌ UPDATE USER PLAN: Database error:', error)
      return NextResponse.json({ 
        error: 'Failed to update user plan', 
        details: error.message 
      }, { status: 500 })
    }
    
    if (!data || data.length === 0) {
      console.error('❌ UPDATE USER PLAN: User not found for update')
      return NextResponse.json({ 
        error: 'User not found', 
        details: 'Unable to find user to update plan' 
      }, { status: 404 })
    }
    
    console.log('✅ UPDATE USER PLAN: Successfully upgraded to', plan)
    
    // Send thank you email for Pro upgrades
    if (plan === 'pro') {
      try {
        console.log('📧 THANK YOU EMAIL: Sending to', email)
        
        const emailTemplate = getThankYouTemplate()
        
        const emailResult = await resend.emails.send({
          from: 'reminders@cancelhelper.app',
          to: email,
          subject: emailTemplate.subject,
          html: emailTemplate.html,
          text: emailTemplate.text,
        })
        
        console.log('✅ THANK YOU EMAIL: Sent successfully', emailResult.data?.id)
      } catch (emailError) {
        console.error('❌ THANK YOU EMAIL: Failed to send', emailError)
        // Don't fail the whole request if email fails
      }
    }
    
    // Send cancellation email for downgrades to free
    if (plan === 'free') {
      try {
        console.log('📧 CANCELLATION EMAIL: Sending to', email)
        
        const emailTemplate = getCancellationTemplate()
        
        const emailResult = await resend.emails.send({
          from: 'reminders@cancelhelper.app',
          to: email,
          subject: emailTemplate.subject,
          html: emailTemplate.html,
          text: emailTemplate.text,
        })
        
        console.log('✅ CANCELLATION EMAIL: Sent successfully', emailResult.data?.id)
      } catch (emailError) {
        console.error('❌ CANCELLATION EMAIL: Failed to send', emailError)
        // Don't fail the whole request if email fails
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Plan updated to ${plan}`,
      plan: plan
    })
    
  } catch (error) {
    console.error('❌ UPDATE USER PLAN: Server error:', error)
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: String(error) 
    }, { status: 500 })
  }
} 