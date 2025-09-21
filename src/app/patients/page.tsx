'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  Brain,
  Shield,
  Sparkles,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  TrendingUp
} from 'lucide-react'

interface Patient {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  email?: string
  phone?: string
  lastAssessment?: string
  riskLevel: 'LOW_RISK' | 'MODERATE_RISK' | 'HIGH_RISK'
  status: 'ACTIVE' | 'INACTIVE'
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [filterRisk, setFilterRisk] = useState<string>('ALL')
  const router = useRouter()

  useEffect(() => {
    // Simulate loading patients data
    const loadPatients = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock data
        const mockPatients: Patient[] = [
          {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '1985-03-15',
            email: 'john.doe@email.com',
            phone: '+1 (555) 123-4567',
            lastAssessment: '2024-01-15',
            riskLevel: 'MODERATE_RISK',
            status: 'ACTIVE'
          },
          {
            id: '2',
            firstName: 'Jane',
            lastName: 'Smith',
            dateOfBirth: '1978-07-22',
            email: 'jane.smith@email.com',
            phone: '+1 (555) 234-5678',
            lastAssessment: '2024-01-10',
            riskLevel: 'HIGH_RISK',
            status: 'ACTIVE'
          },
          {
            id: '3',
            firstName: 'Bob',
            lastName: 'Johnson',
            dateOfBirth: '1992-11-08',
            email: 'bob.johnson@email.com',
            phone: '+1 (555) 345-6789',
            lastAssessment: '2024-01-05',
            riskLevel: 'LOW_RISK',
            status: 'ACTIVE'
          }
        ]
        
        setPatients(mockPatients)
      } catch (error) {
        console.error('Failed to load patients:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPatients()
  }, [])

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRisk = filterRisk === 'ALL' || patient.riskLevel === filterRisk
    
    return matchesSearch && matchesRisk
  })

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case 'HIGH_RISK':
        return 'destructive'
      case 'MODERATE_RISK':
        return 'secondary'
      case 'LOW_RISK':
        return 'default'
      default:
        return 'default'
    }
  }

  const getRiskLabel = (riskLevel: string) => {
    switch (riskLevel) {
      case 'HIGH_RISK':
        return 'High Risk'
      case 'MODERATE_RISK':
        return 'Moderate Risk'
      case 'LOW_RISK':
        return 'Low Risk'
      default:
        return 'Unknown'
    }
  }

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-75"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
              <Users className="h-12 w-12 text-white animate-pulse" />
            </div>
          </div>
          <p className="text-blue-200 mt-6 text-lg">Loading AI Patient Database...</p>
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard')}
                className="text-white hover:bg-white/10 mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Patient Management</h1>
                  <p className="text-sm text-blue-200">AI-Powered Patient Database</p>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => router.push('/patients/new')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-200">Total Patients</p>
                  <p className="text-2xl font-bold text-white">{patients.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-200">Low Risk</p>
                  <p className="text-2xl font-bold text-white">{patients.filter(p => p.riskLevel === 'LOW_RISK').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-200">Moderate Risk</p>
                  <p className="text-2xl font-bold text-white">{patients.filter(p => p.riskLevel === 'MODERATE_RISK').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-200">High Risk</p>
                  <p className="text-2xl font-bold text-white">{patients.filter(p => p.riskLevel === 'HIGH_RISK').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
                  <Input
                    placeholder="Search patients by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={filterRisk}
                  onChange={(e) => setFilterRisk(e.target.value)}
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-sm text-white"
                >
                  <option value="ALL" className="bg-slate-800">All Risk Levels</option>
                  <option value="LOW_RISK" className="bg-slate-800">Low Risk</option>
                  <option value="MODERATE_RISK" className="bg-slate-800">Moderate Risk</option>
                  <option value="HIGH_RISK" className="bg-slate-800">High Risk</option>
                </select>
                <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patients List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredPatients.length === 0 ? (
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="text-center py-16">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                    <Users className="h-12 w-12 text-blue-400" />
                  </div>
                </div>
                <p className="text-white text-xl mb-2">No patients found</p>
                <p className="text-blue-200 mb-6">
                  {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first patient'}
                </p>
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => router.push('/patients/new')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Patient
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredPatients.map((patient) => (
              <Card key={patient.id} className="group bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                            {patient.firstName[0]}{patient.lastName[0]}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                            patient.riskLevel === 'HIGH_RISK' ? 'bg-red-500' :
                            patient.riskLevel === 'MODERATE_RISK' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                            {patient.firstName} {patient.lastName}
                          </h3>
                          <p className="text-blue-200">
                            Age {calculateAge(patient.dateOfBirth)} • {patient.dateOfBirth}
                          </p>
                        </div>
                        <Badge 
                          className={`px-3 py-1 text-sm font-medium ${
                            patient.riskLevel === 'HIGH_RISK' ? 'bg-red-500/20 text-red-200 border-red-400/30' :
                            patient.riskLevel === 'MODERATE_RISK' ? 'bg-yellow-500/20 text-yellow-200 border-yellow-400/30' :
                            'bg-green-500/20 text-green-200 border-green-400/30'
                          }`}
                        >
                          {getRiskLabel(patient.riskLevel)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        {patient.email && (
                          <div className="flex items-center text-blue-200">
                            <Mail className="h-4 w-4 mr-2 text-blue-400" />
                            {patient.email}
                          </div>
                        )}
                        {patient.phone && (
                          <div className="flex items-center text-blue-200">
                            <Phone className="h-4 w-4 mr-2 text-blue-400" />
                            {patient.phone}
                          </div>
                        )}
                        {patient.lastAssessment && (
                          <div className="flex items-center text-blue-200">
                            <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                            Last assessment: {new Date(patient.lastAssessment).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/patients/${patient.id}`)}
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/patients/${patient.id}/edit`)}
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        size="sm"
                        onClick={() => router.push(`/patients/${patient.id}/assessment`)}
                      >
                        <Brain className="h-4 w-4 mr-1" />
                        AI Assessment
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
