import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  console.log('🧪 WEBHOOK TEST: Endpoint called')
  
  try {
    const body = await request.text()
    const headers = Object.fromEntries(request.headers.entries())
    
    console.log('🧪 WEBHOOK TEST: Headers:', headers)
    console.log('🧪 WEBHOOK TEST: Body:', body)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Webhook test endpoint working',
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('🧪 WEBHOOK TEST: Error:', error)
    return NextResponse.json({ 
      error: 'Webhook test failed',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
} 