import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { cookies } from 'next/headers'

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
    
    // Original Supabase code (commented out for demo)
    /*
    if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({ error: 'Service not configured' }, { status: 503 })
    }
    
    const supabase = createServiceClient()
    
    // Verify OTP
    const { data: otpData, error: otpError } = await supabase
      .from('otp_tokens')
      .select('*')
      .eq('token', otp)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .single()
    
    if (otpError || !otpData) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 })
    }
    
    // Get user data
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', otpData.user_id)
      .eq('email', email)
      .single()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    // Mark OTP as used
    await supabase
      .from('otp_tokens')
      .update({ used: true })
      .eq('id', otpData.id)
    
    // Create session (simplified - in production use proper session management)
    const sessionData = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        is_admin: user.is_admin
      }
    }
    
    // Set session cookie
    const cookieStore = cookies()
    cookieStore.set('periosuite-session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })
    
    return NextResponse.json({ 
      message: 'Login successful',
      user: sessionData.user
    })
    
  } catch (error) {
    console.error('OTP verification error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
