import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

// Initialize Stripe only when needed to avoid build-time errors
const getStripeClient = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-05-28.basil',
  })
}

const getWebhookSecret = () => {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not configured')
  }
  return process.env.STRIPE_WEBHOOK_SECRET
}

export async function POST(request: Request) {
  console.log('🔔 Stripe webhook received')
  
  try {
    const body = await request.text()
    const sig = request.headers.get('stripe-signature')!
    
    let event: Stripe.Event
    
    try {
      const stripe = getStripeClient()
      const webhookSecret = getWebhookSecret()
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
    }
    
    console.log('✅ Webhook event type:', event.type)
    
    // Handle successful subscription creation
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      console.log('💳 Checkout session completed:', session.id)
      
      if (session.mode === 'subscription' && session.subscription) {
        const subscriptionId = session.subscription as string
        const customerEmail = session.customer_email
        const userId = session.metadata?.userId
        
        console.log('🚀 Storing subscription:', { subscriptionId, customerEmail, userId })
        
        // Update user with Stripe subscription ID
        const { error } = await supabase
          .from('users')
          .update({ 
            stripe_subscription_id: subscriptionId,
            plan: 'pro'
          })
          .eq('email', customerEmail)
        
        if (error) {
          console.error('❌ Failed to update user subscription ID:', error)
        } else {
          console.log('✅ User subscription ID stored successfully')
        }
      }
    }
    
    // Handle subscription cancellation
    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription
      console.log('🗑️ Subscription cancelled:', subscription.id)
      
      // Downgrade user to free plan
      const { error } = await supabase
        .from('users')
        .update({ 
          plan: 'free',
          stripe_subscription_id: null
        })
        .eq('stripe_subscription_id', subscription.id)
      
      if (error) {
        console.error('❌ Failed to downgrade user after cancellation:', error)
      } else {
        console.log('✅ User downgraded after subscription cancellation')
      }
    }
    
    return NextResponse.json({ received: true })
    
  } catch (error) {
    console.error('❌ Webhook error:', error)
    return NextResponse.json({ 
      error: 'Webhook handler failed',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
} 