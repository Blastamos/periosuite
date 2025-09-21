'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Save, Camera, Download, BarChart3, Brain, Shield, Sparkles, Activity, AlertTriangle, CheckCircle, Clock, Zap, TrendingUp, Users, FileText } from 'lucide-react'

interface ToothData {
  toothNumber: number
  mesial: {
    pocket: number
    recession: number
    bleeding: boolean
    mobility: number
  }
  buccal: {
    pocket: number
    recession: number
    bleeding: boolean
    mobility: number
  }
  distal: {
    pocket: number
    recession: number
    bleeding: boolean
    mobility: number
  }
  lingual: {
    pocket: number
    recession: number
    bleeding: boolean
    mobility: number
  }
}

interface Patient {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  riskLevel: 'LOW_RISK' | 'MODERATE_RISK' | 'HIGH_RISK'
}

export default function AssessmentPage({ params }: { params: { id: string } }) {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [toothData, setToothData] = useState<ToothData[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Simulate loading patient data
    const loadPatient = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock patient data
        setPatient({
          id: params.id,
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '1985-03-15',
          riskLevel: 'MODERATE_RISK'
        })

        // Initialize tooth data for 32 teeth
        const initialToothData: ToothData[] = []
        for (let i = 1; i <= 32; i++) {
          initialToothData.push({
            toothNumber: i,
            mesial: { pocket: 0, recession: 0, bleeding: false, mobility: 0 },
            buccal: { pocket: 0, recession: 0, bleeding: false, mobility: 0 },
            distal: { pocket: 0, recession: 0, bleeding: false, mobility: 0 },
            lingual: { pocket: 0, recession: 0, bleeding: false, mobility: 0 }
          })
        }
        setToothData(initialToothData)
      } catch (error) {
        console.error('Failed to load patient:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPatient()
  }, [params.id])

  const updateToothData = (toothNumber: number, surface: string, field: string, value: any) => {
    setToothData(prev => prev.map(tooth => 
      tooth.toothNumber === toothNumber 
        ? {
            ...tooth,
            [surface]: {
              ...tooth[surface as keyof ToothData],
              [field]: value
            }
          }
        : tooth
    ))
  }

  const getToothPosition = (toothNumber: number) => {
    if (toothNumber >= 1 && toothNumber <= 8) return 'maxillary-right'
    if (toothNumber >= 9 && toothNumber <= 16) return 'maxillary-left'
    if (toothNumber >= 17 && toothNumber <= 24) return 'mandibular-left'
    if (toothNumber >= 25 && toothNumber <= 32) return 'mandibular-right'
    return 'unknown'
  }

  const getToothName = (toothNumber: number) => {
    const names: { [key: number]: string } = {
      1: 'Central Incisor', 2: 'Lateral Incisor', 3: 'Canine', 4: 'First Premolar',
      5: 'Second Premolar', 6: 'First Molar', 7: 'Second Molar', 8: 'Third Molar'
    }
    return names[((toothNumber - 1) % 8) + 1] || 'Unknown'
  }

  const calculateBOP = () => {
    const totalSites = toothData.length * 4 // 4 surfaces per tooth
    const bleedingSites = toothData.reduce((count, tooth) => {
      return count + Object.values(tooth).filter(surface => 
        typeof surface === 'object' && 'bleeding' in surface && surface.bleeding
      ).length
    }, 0)
    return totalSites > 0 ? ((bleedingSites / totalSites) * 100).toFixed(1) : '0.0'
  }

  const calculateSitesWithPPD5mm = () => {
    return toothData.reduce((count, tooth) => {
      return count + Object.values(tooth).filter(surface => 
        typeof surface === 'object' && 'pocket' in surface && surface.pocket >= 5
      ).length
    }, 0)
  }

  const calculateMissingTeeth = () => {
    // In a real app, this would be determined by the chart data
    return 0
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // In a real app, this would save to the database
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Assessment saved:', toothData)
      router.push(`/patients/${params.id}`)
    } catch (error) {
      console.error('Failed to save assessment:', error)
    } finally {
      setSaving(false)
    }
  }

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
          <p className="text-blue-200 mt-6 text-lg">Loading AI Assessment Interface...</p>
        </div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="p-4 rounded-full bg-red-500/20 mb-4">
            <AlertTriangle className="h-12 w-12 text-red-400" />
          </div>
          <p className="text-white text-xl mb-4">Patient not found</p>
          <Button 
            onClick={() => router.push('/patients')} 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            Back to Patients
          </Button>
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
                onClick={() => router.push(`/patients/${params.id}`)}
                className="text-white hover:bg-white/10 mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Patient
              </Button>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    AI Periodontal Assessment
                  </h1>
                  <p className="text-sm text-blue-200">
                    {patient.firstName} {patient.lastName}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={`px-3 py-1 text-sm font-medium ${
                patient.riskLevel === 'HIGH_RISK' ? 'bg-red-500/20 text-red-200 border-red-400/30' :
                patient.riskLevel === 'MODERATE_RISK' ? 'bg-yellow-500/20 text-yellow-200 border-yellow-400/30' :
                'bg-green-500/20 text-green-200 border-green-400/30'
              }`}>
                {patient.riskLevel.replace('_', ' ')}
              </Badge>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Camera className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={saving}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Assessment
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Assessment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-200">Bleeding on Probing</p>
                  <p className="text-3xl font-bold text-white">{calculateBOP()}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-200">Sites with PPD ≥5mm</p>
                  <p className="text-3xl font-bold text-white">{calculateSitesWithPPD5mm()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-gray-500 to-slate-500">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-200">Missing Teeth</p>
                  <p className="text-3xl font-bold text-white">{calculateMissingTeeth()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-200">Assessment Status</p>
                  <p className="text-3xl font-bold text-white">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Periodontal Chart */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Brain className="h-6 w-6 text-blue-400" />
              <CardTitle className="text-2xl text-white">AI-Enhanced 32-Tooth Periodontal Chart</CardTitle>
            </div>
            <CardDescription className="text-blue-200">
              Record pocket depths, recession, bleeding, and mobility for each tooth surface with AI-powered analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Maxillary Teeth */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                  <h3 className="text-xl font-bold text-white">Maxillary (Upper) Teeth</h3>
                </div>
                <div className="grid grid-cols-8 gap-3">
                  {toothData.slice(0, 16).map((tooth) => (
                    <div key={tooth.toothNumber} className="text-center group">
                      <div className="text-sm font-bold text-white mb-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-8 h-8 flex items-center justify-center mx-auto">
                        {tooth.toothNumber}
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 space-y-2 group-hover:bg-white/10 transition-all duration-300">
                        {Object.entries(tooth).filter(([key]) => key !== 'toothNumber').map(([surface, data]) => (
                          <div key={surface} className="text-xs">
                            <div className="font-bold capitalize mb-2 text-blue-200">{surface}</div>
                            <div className="space-y-2">
                              <input
                                type="number"
                                placeholder="PPD"
                                value={data.pocket || ''}
                                onChange={(e) => updateToothData(tooth.toothNumber, surface, 'pocket', parseInt(e.target.value) || 0)}
                                className="w-full text-xs px-2 py-1 bg-white/10 border border-white/20 rounded text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                                min="0"
                                max="15"
                              />
                              <input
                                type="number"
                                placeholder="REC"
                                value={data.recession || ''}
                                onChange={(e) => updateToothData(tooth.toothNumber, surface, 'recession', parseInt(e.target.value) || 0)}
                                className="w-full text-xs px-2 py-1 bg-white/10 border border-white/20 rounded text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                                min="0"
                                max="10"
                              />
                              <div className="flex items-center justify-center space-x-1">
                                <input
                                  type="checkbox"
                                  checked={data.bleeding}
                                  onChange={(e) => updateToothData(tooth.toothNumber, surface, 'bleeding', e.target.checked)}
                                  className="w-3 h-3 rounded border-white/20 bg-white/10 text-red-500 focus:ring-red-500/20"
                                />
                                <span className="text-xs text-red-200 font-medium">B</span>
                              </div>
                              <input
                                type="number"
                                placeholder="Mob"
                                value={data.mobility || ''}
                                onChange={(e) => updateToothData(tooth.toothNumber, surface, 'mobility', parseInt(e.target.value) || 0)}
                                className="w-full text-xs px-2 py-1 bg-white/10 border border-white/20 rounded text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                                min="0"
                                max="3"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mandibular Teeth */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                  <h3 className="text-xl font-bold text-white">Mandibular (Lower) Teeth</h3>
                </div>
                <div className="grid grid-cols-8 gap-3">
                  {toothData.slice(16, 32).map((tooth) => (
                    <div key={tooth.toothNumber} className="text-center group">
                      <div className="text-sm font-bold text-white mb-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-8 h-8 flex items-center justify-center mx-auto">
                        {tooth.toothNumber}
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 space-y-2 group-hover:bg-white/10 transition-all duration-300">
                        {Object.entries(tooth).filter(([key]) => key !== 'toothNumber').map(([surface, data]) => (
                          <div key={surface} className="text-xs">
                            <div className="font-bold capitalize mb-2 text-emerald-200">{surface}</div>
                            <div className="space-y-2">
                              <input
                                type="number"
                                placeholder="PPD"
                                value={data.pocket || ''}
                                onChange={(e) => updateToothData(tooth.toothNumber, surface, 'pocket', parseInt(e.target.value) || 0)}
                                className="w-full text-xs px-2 py-1 bg-white/10 border border-white/20 rounded text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20"
                                min="0"
                                max="15"
                              />
                              <input
                                type="number"
                                placeholder="REC"
                                value={data.recession || ''}
                                onChange={(e) => updateToothData(tooth.toothNumber, surface, 'recession', parseInt(e.target.value) || 0)}
                                className="w-full text-xs px-2 py-1 bg-white/10 border border-white/20 rounded text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20"
                                min="0"
                                max="10"
                              />
                              <div className="flex items-center justify-center space-x-1">
                                <input
                                  type="checkbox"
                                  checked={data.bleeding}
                                  onChange={(e) => updateToothData(tooth.toothNumber, surface, 'bleeding', e.target.checked)}
                                  className="w-3 h-3 rounded border-white/20 bg-white/10 text-red-500 focus:ring-red-500/20"
                                />
                                <span className="text-xs text-red-200 font-medium">B</span>
                              </div>
                              <input
                                type="number"
                                placeholder="Mob"
                                value={data.mobility || ''}
                                onChange={(e) => updateToothData(tooth.toothNumber, surface, 'mobility', parseInt(e.target.value) || 0)}
                                className="w-full text-xs px-2 py-1 bg-white/10 border border-white/20 rounded text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20"
                                min="0"
                                max="3"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="mt-6 bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="h-6 w-6 text-blue-400" />
              <h3 className="text-xl font-bold text-white">AI Chart Legend</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <div>
                  <strong className="text-blue-200">PPD:</strong> 
                  <span className="text-blue-100 ml-1">Probing Pocket Depth (mm)</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                <div>
                  <strong className="text-emerald-200">REC:</strong> 
                  <span className="text-blue-100 ml-1">Gingival Recession (mm)</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500"></div>
                <div>
                  <strong className="text-red-200">B:</strong> 
                  <span className="text-blue-100 ml-1">Bleeding on Probing</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <div>
                  <strong className="text-purple-200">Mob:</strong> 
                  <span className="text-blue-100 ml-1">Tooth Mobility (0-3)</span>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-400/20">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="h-5 w-5 text-blue-400" />
                <span className="text-blue-200 font-semibold">AI Analysis</span>
              </div>
              <p className="text-blue-100 text-sm">
                Real-time AI analysis provides instant risk assessment and treatment recommendations based on your periodontal measurements.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
