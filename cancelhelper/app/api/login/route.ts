import bcrypt from 'bcrypt'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  console.log('✅ Login API called')
  
  try {
    const body = await request.json()
    console.log('✅ Login request received:', { email: body.email })
    
    const { email, password } = body
    
    if (!email || !password) {
      console.log('❌ Missing email or password')
      return new Response(JSON.stringify({ error: 'Email and password required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // Check if user exists in database
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    console.log('✅ Database lookup result:', { user: users?.email, error })

    if (error || !users) {
      console.log('❌ User not found')
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ message: 'User found! Login will work soon.', user: { email: users.email, id: users.id } }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
    
  } catch (error) {
    console.error('❌ Login error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
} 