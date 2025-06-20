import bcrypt from 'bcrypt'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
    console.log('✅ Signup API called!')
    const body = await request.json()
    console.log('✅ Request body received:', body)
    const { email, password } = body

    // Validation
    if (!email || !password) {
      console.log('❌ Missing email or password')
      return new Response(JSON.stringify({ error: 'Email and password required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Password length validation
    if (password.length < 8) {
      console.log('❌ Password too short')
      return new Response(JSON.stringify({ error: 'Password must be at least 8 characters long' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Comprehensive password validation - enforce ALL security rules
    if (!/[a-z]/.test(password)) {
      console.log('❌ Password missing lowercase letter')
      return new Response(JSON.stringify({ error: 'Password must contain at least one lowercase letter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (!/[A-Z]/.test(password)) {
      console.log('❌ Password missing uppercase letter')
      return new Response(JSON.stringify({ error: 'Password must contain at least one uppercase letter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (!/[0-9]/.test(password)) {
      console.log('❌ Password missing number')
      return new Response(JSON.stringify({ error: 'Password must contain at least one number' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (!/[@$!%*?&]/.test(password)) {
      console.log('❌ Password missing special character')
      return new Response(JSON.stringify({ error: 'Password must contain at least one special character (@$!%*?&)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    console.log('✅ Validation passed')

    // Hash password
    console.log('✅ About to hash password')
    const hashedPassword = await bcrypt.hash(password, 12)
    console.log('✅ Password hashed successfully')

    // Insert user into database
    console.log('✅ About to insert user into database')
    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password_hash: hashedPassword }])
      .select()

    console.log('✅ Database response:', { data, error })

    if (error) {
      console.log('❌ Database error:', error.message)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    console.log('✅ User created successfully in database!')
    return new Response(JSON.stringify({ 
      message: 'User created successfully!', 
      userId: data[0].id 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }