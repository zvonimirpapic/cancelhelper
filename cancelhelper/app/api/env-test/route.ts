export async function GET() {
  console.log('🔍 Environment test API called')
  
  return Response.json({
    message: "Environment Variables Status",
    variables: {
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
      STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    },
    summary: {
      total_loaded: [
        !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        !!process.env.RESEND_API_KEY,
        !!process.env.NEXTAUTH_URL,
        !!process.env.STRIPE_SECRET_KEY,
        !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      ].filter(Boolean).length,
      total_required: 6,
      all_loaded: [
        !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        !!process.env.RESEND_API_KEY,
        !!process.env.NEXTAUTH_URL,
        !!process.env.STRIPE_SECRET_KEY,
        !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      ].every(Boolean)
    }
  })
} 