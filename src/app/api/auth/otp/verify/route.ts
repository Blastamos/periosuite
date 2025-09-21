import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()
    
    // Mock OTP verification - accept any 6-digit code
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      return NextResponse.json({ 
        message: 'Login successful (mock)',
        user: {
          id: 'admin-1',
          email: 'joaorsouteiro@gmail.com',
          name: 'Admin User',
          role: 'admin',
          is_admin: true
        }
      })
    } else {
      return NextResponse.json({ error: 'Please enter a valid 6-digit code' }, { status: 400 })
    }
    
  } catch (error) {
    console.error('OTP verification error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
