export async function POST() {
  console.log('✅ Payment test API called')
  return Response.json({ 
    message: "PAYMENT TEST WORKS!",
    timestamp: Date.now()
  })
} 