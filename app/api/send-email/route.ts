import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, subject, text } = body

    // Basic validation
    if (!to || !subject || !text) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, text' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if using placeholder API key
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_placeholder_key') {
      // Simulate sending for testing
      console.log('📧 SIMULATED EMAIL SEND:')
      console.log('To:', to)
      console.log('Subject:', subject)
      console.log('Text:', text)
      
      return NextResponse.json({
        success: true,
        message: 'Email simulated successfully (using placeholder API key)',
        id: 'simulated-' + Date.now()
      })
    }

    // Send actual email using Resend
    const resend = new Resend(process.env.RESEND_API_KEY)
    const result = await resend.emails.send({
      from: 'CancelHelper <noreply@your-domain.com>',
      to: [to],
      subject: subject,
      text: text
    })

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      id: result.data?.id || 'real'
    })

  } catch (error) {
    console.error('Email sending error:', error)
    
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

// GET method for testing the API endpoint
export async function GET() {
  return NextResponse.json({
    message: 'Email API is working',
    note: 'Use POST method to send emails with fields: to, subject, text'
  })
} 