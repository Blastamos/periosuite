import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { sendOTPEmail } from '@/lib/email'
import crypto from 'crypto'

const ADMIN_EMAIL = "joaorsouteiro@gmail.com"

export async function POST(request: NextRequest) {
  try {
    // Skip during build time
    if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({ error: 'Service not configured' }, { status: 503 })
    }
    
    const { email } = await request.json()
    
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const supabase = createServiceClient()
    
    // Generate 6-digit OTP
    const otpCode = crypto.randomInt(100000, 999999).toString()
    
    // Store OTP in database
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .eq('is_admin', true)
      .single()
    
    if (!user) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 404 })
    }
    
    const { error: otpError } = await supabase
      .from('otp_tokens')
      .insert({
        user_id: user.id,
        token: otpCode,
        expires_at: expiresAt.toISOString()
      })
    
    if (otpError) {
      console.error('Failed to store OTP:', otpError)
      return NextResponse.json({ error: 'Failed to generate OTP' }, { status: 500 })
    }
    
    // Send OTP via Resend
    const emailResult = await sendOTPEmail(email, otpCode)
    
    if (!emailResult.success) {
      return NextResponse.json({ error: 'Failed to send OTP email' }, { status: 500 })
    }
    
    return NextResponse.json({ message: 'OTP sent successfully' })
    
  } catch (error) {
    console.error('OTP generation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
