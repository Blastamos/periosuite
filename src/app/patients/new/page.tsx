'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, Save, User, Heart, Activity } from 'lucide-react'

const patientSchema = z.object({
  // Demographics
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
  
  // Insurance
  insuranceProvider: z.string().optional(),
  policyNumber: z.string().optional(),
  groupNumber: z.string().optional(),
  
  // Medical History
  medicalConditions: z.array(z.string()).optional(),
  medications: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional(),
  previousDentalWork: z.array(z.string()).optional(),
  
  // Risk Factors
  smokingStatus: z.enum(['NEVER', 'FORMER', 'LIGHT', 'MODERATE', 'HEAVY']),
  smokingPackYears: z.number().optional(),
  diabetesType: z.enum(['NONE', 'TYPE1', 'TYPE2', 'GESTATIONAL']),
  diabetesHba1c: z.string().optional(),
  familyHistoryPerio: z.boolean(),
  stressLevel: z.enum(['LOW', 'MODERATE', 'HIGH']),
  
  // Lifestyle
  oralHygieneFreq: z.enum(['RARELY', 'ONCE_DAILY', 'TWICE_DAILY', 'MORE_THAN_TWICE']),
  flossingFreq: z.enum(['NEVER', 'OCCASIONALLY', 'WEEKLY', 'DAILY']),
  mouthwashUse: z.boolean(),
  dietaryHabits: z.enum(['BALANCED', 'HIGH_SUGAR', 'LOW_NUTRITION', 'ACIDIC']),
  alcoholConsumption: z.enum(['NONE', 'LIGHT', 'MODERATE', 'HEAVY'])
})

type PatientFormData = z.infer<typeof patientSchema>

export default function NewPatientPage() {
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      gender: 'MALE',
      smokingStatus: 'NEVER',
      diabetesType: 'NONE',
      familyHistoryPerio: false,
      stressLevel: 'LOW',
      oralHygieneFreq: 'TWICE_DAILY',
      flossingFreq: 'DAILY',
      mouthwashUse: false,
      dietaryHabits: 'BALANCED',
      alcoholConsumption: 'NONE'
    }
  })

  const onSubmit = async (data: PatientFormData) => {
    setLoading(true)
    try {
      // In a real app, this would save to the database
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Patient data:', data)
      router.push('/patients')
    } catch (error) {
      console.error('Failed to save patient:', error)
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { id: 1, title: 'Demographics', icon: User },
    { id: 2, title: 'Medical History', icon: Heart },
    { id: 3, title: 'Risk Factors', icon: Activity }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/patients')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Patients
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Add New Patient</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 py-4">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.id}
                  className={`flex items-center space-x-2 ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{step.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Demographics */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Patient Demographics</CardTitle>
                <CardDescription>
                  Basic information about the patient
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      {...register('firstName')}
                      className="mt-1"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      {...register('lastName')}
                      className="mt-1"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      {...register('dateOfBirth')}
                      className="mt-1"
                    />
                    {errors.dateOfBirth && (
                      <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select onValueChange={(value) => setValue('gender', value as any)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      {...register('phone')}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="mt-1"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    {...register('address')}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      {...register('emergencyContact')}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyPhone">Emergency Phone</Label>
                    <Input
                      id="emergencyPhone"
                      {...register('emergencyPhone')}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Medical History */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Medical History</CardTitle>
                <CardDescription>
                  Medical conditions, medications, and dental history
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Medical Conditions</Label>
                  <Textarea
                    placeholder="List any medical conditions (one per line)"
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Current Medications</Label>
                  <Textarea
                    placeholder="List current medications (one per line)"
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Allergies</Label>
                  <Textarea
                    placeholder="List any allergies (one per line)"
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Previous Dental Work</Label>
                  <Textarea
                    placeholder="List previous dental procedures or treatments"
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label>Insurance Provider</Label>
                    <Input className="mt-1" />
                  </div>
                  <div>
                    <Label>Policy Number</Label>
                    <Input className="mt-1" />
                  </div>
                  <div>
                    <Label>Group Number</Label>
                    <Input className="mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Risk Factors */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Risk Factors & Lifestyle</CardTitle>
                <CardDescription>
                  Factors that may affect periodontal health
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Smoking Status</Label>
                    <Select onValueChange={(value) => setValue('smokingStatus', value as any)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select smoking status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NEVER">Never</SelectItem>
                        <SelectItem value="FORMER">Former</SelectItem>
                        <SelectItem value="LIGHT">Light</SelectItem>
                        <SelectItem value="MODERATE">Moderate</SelectItem>
                        <SelectItem value="HEAVY">Heavy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Pack Years (if applicable)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Diabetes Type</Label>
                    <Select onValueChange={(value) => setValue('diabetesType', value as any)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select diabetes type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NONE">None</SelectItem>
                        <SelectItem value="TYPE1">Type 1</SelectItem>
                        <SelectItem value="TYPE2">Type 2</SelectItem>
                        <SelectItem value="GESTATIONAL">Gestational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>HbA1c Level</Label>
                    <Input
                      placeholder="e.g., 6.5%"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="familyHistoryPerio"
                    onCheckedChange={(checked) => setValue('familyHistoryPerio', !!checked)}
                  />
                  <Label htmlFor="familyHistoryPerio">
                    Family history of periodontal disease
                  </Label>
                </div>

                <div>
                  <Label>Stress Level</Label>
                  <Select onValueChange={(value) => setValue('stressLevel', value as any)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select stress level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MODERATE">Moderate</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Oral Hygiene Frequency</Label>
                    <Select onValueChange={(value) => setValue('oralHygieneFreq', value as any)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RARELY">Rarely</SelectItem>
                        <SelectItem value="ONCE_DAILY">Once Daily</SelectItem>
                        <SelectItem value="TWICE_DAILY">Twice Daily</SelectItem>
                        <SelectItem value="MORE_THAN_TWICE">More Than Twice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Flossing Frequency</Label>
                    <Select onValueChange={(value) => setValue('flossingFreq', value as any)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NEVER">Never</SelectItem>
                        <SelectItem value="OCCASIONALLY">Occasionally</SelectItem>
                        <SelectItem value="WEEKLY">Weekly</SelectItem>
                        <SelectItem value="DAILY">Daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mouthwashUse"
                    onCheckedChange={(checked) => setValue('mouthwashUse', !!checked)}
                  />
                  <Label htmlFor="mouthwashUse">
                    Uses mouthwash regularly
                  </Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Dietary Habits</Label>
                    <Select onValueChange={(value) => setValue('dietaryHabits', value as any)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select dietary habits" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BALANCED">Balanced</SelectItem>
                        <SelectItem value="HIGH_SUGAR">High Sugar</SelectItem>
                        <SelectItem value="LOW_NUTRITION">Low Nutrition</SelectItem>
                        <SelectItem value="ACIDIC">Acidic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Alcohol Consumption</Label>
                    <Select onValueChange={(value) => setValue('alcoholConsumption', value as any)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select alcohol consumption" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NONE">None</SelectItem>
                        <SelectItem value="LIGHT">Light</SelectItem>
                        <SelectItem value="MODERATE">Moderate</SelectItem>
                        <SelectItem value="HEAVY">Heavy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            <div className="flex space-x-2">
              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                >
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Patient
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
