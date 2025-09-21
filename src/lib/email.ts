import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set')
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOTPEmail(email: string, otpCode: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'PerioSuite <noreply@resend.dev>', // Using Resend's default domain for testing
      to: [email],
      subject: 'Your PerioSuite Admin Login Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">PerioSuite Admin Access</h2>
          <p>Your one-time login code is:</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1f2937;">${otpCode}</span>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p style="color: #6b7280; font-size: 14px;">
            If you didn't request this code, please ignore this email.
          </p>
        </div>
      `,
      text: `Your PerioSuite admin login code is: ${otpCode}. This code expires in 10 minutes.`
    })

    if (error) {
      console.error('Failed to send OTP email:', error)
      return { success: false, error }
    }

    console.log(`📧 OTP Email sent successfully to: ${email}`)
    console.log(`🔐 OTP Code: ${otpCode}`)
    return { success: true, data }
  } catch (error) {
    console.error('Failed to send OTP email:', error)
    return { success: false, error }
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'PerioSuite <welcome@resend.dev>', // Using Resend's default domain for testing
      to: [email],
      subject: 'Welcome to PerioSuite',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Welcome to PerioSuite, ${name}!</h2>
          <p>Your account has been successfully created. You can now start managing your patients and conducting periodontal assessments.</p>
          <div style="margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
               style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Access Your Dashboard
            </a>
          </div>
          <p>If you have any questions, feel free to contact our support team.</p>
        </div>
      `
    })

    if (error) {
      console.error('Failed to send welcome email:', error)
      return { success: false, error }
    }

    console.log(`📧 Welcome email sent successfully to: ${email}`)
    return { success: true, data }
  } catch (error) {
    console.error('Failed to send welcome email:', error)
    return { success: false, error }
  }
}
