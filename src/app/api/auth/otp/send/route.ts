import { NextRequest, NextResponse } from 'next/server'

const ADMIN_EMAIL = "joaorsouteiro@gmail.com"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    // Mock authentication - only allow admin email
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Only admin email is allowed for demo' }, { status: 401 })
    }
    
    // Return success for mock authentication
    return NextResponse.json({ message: 'OTP sent successfully (mock)' })
    
  } catch (error) {
    console.error('OTP generation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
