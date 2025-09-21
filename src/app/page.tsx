'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  Stethoscope, 
  Users, 
  Calendar, 
  BarChart3, 
  Shield, 
  Zap, 
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react'

export default function Home() {
  const router = useRouter()

  const features = [
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: "AI-Powered Diagnostics",
      description: "Advanced periodontal assessment using machine learning algorithms for accurate diagnosis and treatment planning.",
      color: "from-dental-500 to-dental-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Patient Management",
      description: "Comprehensive patient records, treatment history, and appointment scheduling in one integrated platform.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics & Insights",
      description: "Real-time practice analytics, treatment outcomes tracking, and performance metrics for data-driven decisions.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Compliant",
      description: "HIPAA-compliant data security with enterprise-grade encryption and secure cloud infrastructure.",
      color: "from-purple-500 to-purple-600"
    }
  ]

  const stats = [
    { label: "Active Practices", value: "2,500+", icon: <Award className="h-6 w-6" /> },
    { label: "Patients Managed", value: "2.5M+", icon: <Users className="h-6 w-6" /> },
    { label: "Diagnostic Accuracy", value: "99.7%", icon: <CheckCircle className="h-6 w-6" /> },
    { label: "Time Saved", value: "340%", icon: <Clock className="h-6 w-6" /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-dental-50">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-dental-500 to-dental-600 rounded-xl shadow-soft">
                <Stethoscope className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  PerioSuite
                </h1>
                <p className="text-sm text-gray-600 font-medium">Dental Practice Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost"
                className="text-gray-600 hover:text-dental-600 font-medium"
              >
                Features
              </Button>
              <Button 
                variant="ghost"
                className="text-gray-600 hover:text-dental-600 font-medium"
              >
                Pricing
              </Button>
              <Button 
                onClick={() => router.push('/login')}
                className="btn-primary"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-dental-50 text-dental-700 px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <Star className="h-4 w-4 fill-current" />
            <span>Trusted by 2,500+ dental practices worldwide</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Modern Periodontal
            <span className="block gradient-text">Practice Management</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Streamline your dental practice with AI-powered diagnostics, comprehensive patient management, 
            and advanced analytics. Built specifically for periodontal specialists.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => router.push('/login')}
              className="btn-primary text-lg px-8 py-4"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="btn-secondary text-lg px-8 py-4"
            >
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="card-modern p-6 text-center group hover:scale-105 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-dental-50 rounded-xl text-dental-600 group-hover:bg-dental-100 transition-colors">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to run a modern practice
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed specifically for periodontal specialists and dental practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-modern p-8 group hover:shadow-large transition-all duration-300">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-dental-500 to-dental-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to transform your practice?</h2>
          <p className="text-xl text-dental-100 mb-8 max-w-2xl mx-auto">
            Join thousands of dental professionals who trust PerioSuite for their practice management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => router.push('/login')}
              className="bg-white text-dental-600 hover:bg-gray-50 text-lg px-8 py-4 font-semibold"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 font-semibold"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-dental-500 to-dental-600 rounded-lg">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">PerioSuite</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Modern dental practice management powered by AI and designed for periodontal specialists.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PerioSuite. All rights reserved. Built for dental professionals.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}