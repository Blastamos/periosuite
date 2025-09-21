'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  FileText, 
  BarChart3, 
  Plus, 
  Search,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Brain,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Activity
} from 'lucide-react'

interface DashboardStats {
  totalPatients: number
  recentAssessments: number
  highRiskPatients: number
  pendingAssessments: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPatients: 0,
    recentAssessments: 0,
    highRiskPatients: 0,
    pendingAssessments: 0
  })
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)
  const router = useRouter()

  // Mock session for demo - no login required
  useEffect(() => {
    const mockSession = {
      user: {
        id: 'admin-1',
        email: 'joaorsouteiro@gmail.com',
        name: 'Admin User',
        role: 'admin',
        is_admin: true
      }
    }
    setSession(mockSession)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('periosuite-session')
    router.push('/login')
  }

  useEffect(() => {
    // Simulate loading dashboard data
    const loadDashboardData = async () => {
      try {
        // In a real app, this would fetch from your API
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setStats({
          totalPatients: 156,
          recentAssessments: 23,
          highRiskPatients: 8,
          pendingAssessments: 12
        })
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-75"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
              <Brain className="h-12 w-12 text-white animate-pulse" />
            </div>
          </div>
          <p className="text-blue-200 mt-6 text-lg">Loading AI Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-75"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                  <Brain className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">PerioSuite</h1>
                <p className="text-sm text-blue-200">AI-Powered Practice Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500/20 text-green-200 border-green-400/30">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                System Online
              </Badge>
              <Button 
                onClick={handleLogout} 
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Shield className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <h2 className="text-4xl font-bold text-white">Welcome back!</h2>
            <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-xl text-blue-200">
            Here's what's happening with your AI-powered practice today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-200">Total Patients</CardTitle>
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Users className="h-4 w-4 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats.totalPatients}</div>
              <div className="flex items-center space-x-2 mt-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <p className="text-sm text-green-200">+12% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-200">AI Assessments</CardTitle>
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <Brain className="h-4 w-4 text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats.recentAssessments}</div>
              <div className="flex items-center space-x-2 mt-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <p className="text-sm text-blue-200">This week</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-200">High Risk Patients</CardTitle>
              <div className="p-2 rounded-lg bg-red-500/20">
                <AlertTriangle className="h-4 w-4 text-red-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-400">{stats.highRiskPatients}</div>
              <div className="flex items-center space-x-2 mt-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                <p className="text-sm text-yellow-200">Require attention</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-200">Pending Assessments</CardTitle>
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Calendar className="h-4 w-4 text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats.pendingAssessments}</div>
              <div className="flex items-center space-x-2 mt-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <p className="text-sm text-green-200">Awaiting completion</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card 
              className="group bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer"
              onClick={() => router.push('/patients/new')}
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Plus className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-white group-hover:text-blue-200 transition-colors">
                      New Patient
                    </CardTitle>
                    <CardDescription className="text-blue-200">
                      Register with AI risk assessment
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-white/10 text-blue-200 border-blue-400/30">
                    {stats.totalPatients} Total
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            <Card 
              className="group bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10 cursor-pointer"
              onClick={() => router.push('/patients')}
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Search className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-white group-hover:text-emerald-200 transition-colors">
                      Search Patients
                    </CardTitle>
                    <CardDescription className="text-blue-200">
                      Find and manage patient records
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-white/10 text-blue-200 border-blue-400/30">
                    AI-Powered
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            <Card 
              className="group bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer"
              onClick={() => router.push('/assessments')}
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-white group-hover:text-purple-200 transition-colors">
                      AI Analytics
                    </CardTitle>
                    <CardDescription className="text-blue-200">
                      View intelligent insights
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-white/10 text-blue-200 border-blue-400/30">
                    {stats.recentAssessments} This Week
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6 text-blue-400" />
              <CardTitle className="text-2xl text-white">Recent Activity</CardTitle>
            </div>
            <CardDescription className="text-blue-200">Latest AI assessments and patient updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group">
                <div className="p-3 rounded-full bg-blue-500/10 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-4 w-4 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-medium text-white group-hover:text-blue-200 transition-colors">
                    AI Assessment Completed
                  </p>
                  <p className="text-blue-200">John Doe - High risk classification detected</p>
                </div>
                <div className="text-sm text-blue-300">2 hours ago</div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="p-3 rounded-full bg-emerald-500/10 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-medium text-white group-hover:text-emerald-200 transition-colors">
                    New Patient Registered
                  </p>
                  <p className="text-blue-200">Jane Smith - Initial AI risk screening</p>
                </div>
                <div className="text-sm text-blue-300">4 hours ago</div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="p-3 rounded-full bg-red-500/10 group-hover:scale-110 transition-transform duration-300">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-medium text-white group-hover:text-red-200 transition-colors">
                    High Risk Alert
                  </p>
                  <p className="text-blue-200">3 patients require immediate attention</p>
                </div>
                <div className="text-sm text-blue-300">6 hours ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
