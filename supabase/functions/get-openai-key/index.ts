import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const OPENAI_KEY = Deno.env.get('OPENAI_API_KEY')

serve(async (req) => {
  // Verify authentication
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'No authorization header' }),
      { status: 401 }
    )
  }

  return new Response(
    JSON.stringify({ 
      publicKey: OPENAI_KEY 
    }),
    { 
      headers: { 'Content-Type': 'application/json' },
      status: 200 
    },
  )
})