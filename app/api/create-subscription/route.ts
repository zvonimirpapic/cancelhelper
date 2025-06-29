import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe only when needed to avoid build-time errors
const getStripeClient = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-05-28.basil',
  })
}

export async function POST(request: Request) {
  console.log('✅ Stripe subscription API called')
  
  try {
    const body = await request.json()
    console.log('✅ Request received:', { email: body.email })
    
    const { email, userId } = body
    
    if (!email || !userId) {
      console.log('❌ Missing email or userId')
      return NextResponse.json({ error: 'Email and userId required' }, { status: 400 })
    }
    
    console.log('✅ Creating Stripe checkout session')
    
    // Create Stripe checkout session
    const stripe = getStripeClient()
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'CancelHelper Pro',
              description: 'Unlimited trial reminders',
            },
            unit_amount: 499, // $4.99 in cents
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `https://cancelhelper.vercel.app/dashboard?upgrade=success`,
      cancel_url: `https://cancelhelper.vercel.app/pricing?canceled=true`,
      metadata: {
        userId: userId,
      },
    })
    
    console.log('✅ Checkout session created:', session.id)
    
    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    })
    
  } catch (error) {
    console.error('❌ Stripe error:', error)
    console.error('❌ Error details:', error instanceof Error ? error.message : String(error))
    return NextResponse.json({ 
      error: 'Failed to create subscription',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
} 