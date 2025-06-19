export async function POST(request: Request) {
  console.log('✅ Payment test API called')
  return Response.json({ 
    message: "PAYMENT TEST WORKS!",
    timestamp: Date.now()
  })
} 