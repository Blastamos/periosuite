'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Brain } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Ultra-Modern Header */}
      <header className="bg-black/50 backdrop-blur-xl border-b border-purple-500/30 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
              <Image 
                src="/logo.png" 
                alt="PerioSuite Logo" 
                width={32} 
                height={32} 
                className="h-8 w-8"
              />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">
                Perio<span className="text-purple-400">Suite</span>
              </h1>
              <p className="text-purple-300">Neural AI Platform</p>
            </div>
          </div>
          <Button 
            onClick={() => router.push('/login')}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-bold"
          >
            Neural Access
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="mb-12">
          <div className="inline-block bg-purple-500/20 border border-purple-400/30 rounded-full px-6 py-3 mb-8">
            <span className="text-purple-300 font-semibold">🚀 ULTRA-MODERN DESIGN ACTIVE</span>
          </div>
          
          <h1 className="text-8xl md:text-9xl font-black text-white mb-8 leading-tight">
            <span className="block">NEURAL</span>
            <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              PERIODONTAL
            </span>
            <span className="block text-6xl text-purple-300">AI PLATFORM</span>
          </h1>
          
          <p className="text-2xl text-purple-200 mb-12 max-w-4xl mx-auto">
            This is the ULTRA-MODERN design you requested! Dark theme, gradients, and high-tech elements.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Button 
              size="lg"
              onClick={() => router.push('/login')}
              className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-600 hover:via-blue-600 hover:to-cyan-600 text-white text-2xl px-16 py-8 rounded-2xl font-black shadow-2xl"
            >
              <Brain className="mr-4 h-8 w-8" />
              Initialize Neural Access
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-white border-2 border-purple-400 hover:bg-purple-400/10 text-2xl px-16 py-8 rounded-2xl font-bold"
            >
              View Neural Demo
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { label: "Global Practices", value: "2,500+", color: "from-purple-500 to-pink-500" },
            { label: "Patients Analyzed", value: "2.5M+", color: "from-blue-500 to-cyan-500" },
            { label: "AI Precision", value: "99.97%", color: "from-green-500 to-emerald-500" },
            { label: "Efficiency Gain", value: "340%", color: "from-yellow-500 to-orange-500" }
          ].map((stat, index) => (
            <div key={index} className="bg-black/30 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-8 hover:bg-black/50 transition-all duration-300">
              <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-purple-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-xl border-t border-purple-500/30 mt-20 p-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
              <Image 
                src="/logo.png" 
                alt="PerioSuite Logo" 
                width={32} 
                height={32} 
                className="h-8 w-8"
              />
            </div>
            <h3 className="text-3xl font-black text-white">
              Perio<span className="text-purple-400">Suite</span>
            </h3>
          </div>
          <p className="text-purple-300">© 2024 PerioSuite Neural AI. Ultra-Modern Design Active.</p>
        </div>
      </footer>
    </div>
  )
}