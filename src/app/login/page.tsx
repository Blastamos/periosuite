'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Loader2, Mail, Shield, ArrowLeft, Sparkles, Brain, CheckCircle, Lock } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'email' | 'otp'>('email')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Mock authentication - only allow admin email
    if (email === 'joaorsouteiro@gmail.com') {
      setTimeout(() => {
        setStep('otp')
        setLoading(false)
      }, 1000)
    } else {
      setError('Only admin email is allowed for demo')
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Mock OTP verification - accept any 6-digit code
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      setTimeout(() => {
        // Set a simple session in localStorage
        localStorage.setItem('periosuite-session', JSON.stringify({
          user: {
            id: 'admin-1',
            email: 'joaorsouteiro@gmail.com',
            name: 'Admin User',
            role: 'admin',
            is_admin: true
          }
        }))
        router.push('/dashboard')
        setLoading(false)
      }, 1000)
    } else {
      setError('Please enter a valid 6-digit code')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-75"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">
            PerioSuite
          </h2>
          <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 border-blue-400/30 px-4 py-2">
            <Brain className="mr-2 h-4 w-4" />
            AI-Powered Platform
          </Badge>
        </div>

        {/* Login Card */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                {step === 'email' ? (
                  <Mail className="h-8 w-8 text-blue-400" />
                ) : (
                  <Lock className="h-8 w-8 text-purple-400" />
                )}
              </div>
            </div>
            <CardTitle className="text-2xl text-white">
              {step === 'email' ? 'Secure Admin Access' : 'Verification Required'}
            </CardTitle>
            <CardDescription className="text-blue-200">
              {step === 'email' 
                ? 'Enter your admin credentials to access the platform'
                : 'Enter the 6-digit verification code sent to your email'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert className="bg-red-500/10 border-red-500/20 text-red-200">
                <AlertDescription className="flex items-center">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {step === 'email' ? (
              <form onSubmit={handleSendOTP} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="joaorsouteiro@gmail.com"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 h-12 text-lg"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      Sending Code...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-3 h-5 w-5" />
                      Send Verification Code
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-white font-medium">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="000000"
                    maxLength={6}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 h-12 text-center text-2xl tracking-widest font-mono"
                  />
                  <p className="text-sm text-blue-300 text-center">
                    Check your email for the 6-digit code
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('email')}
                    className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10 h-12"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white h-12 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Verify Code
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}

            {/* Security Notice */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-center space-x-2 text-sm text-blue-300">
                <Shield className="h-4 w-4" />
                <span>Secure authentication powered by AI</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="text-blue-300 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
