'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Users, Award, Globe, Star, Phone, Mail, MapPin, GraduationCap, Heart, Shield, Clock, FileText, BookOpen, Download, HelpCircle, Play, ArrowRight, Search, Calendar, Eye, FileDown, Flag, Timer, Target } from 'lucide-react'
import Link from 'next/link'

export default function MockTestsClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 md:px-0 flex flex-col items-center max-w-7xl mx-auto text-center">
        <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 rounded-full font-medium">
          <span className="inline-flex items-center gap-2">
            <Play className="w-4 h-4 text-blue-500" />
            Free Practice Tests
          </span>
        </Badge>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Mock Tests for IELTS, TOEFL & PTE
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl">
          Practice with our free mock tests and improve your English proficiency scores. 
          Get detailed explanations, scoring, and expert tips to ace your exams.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 text-lg">
            <span className="inline-flex items-center gap-2">
              🎯 Start Practice Test
            </span>
          </Button>
          <Button size="lg" variant="outline" className="border-blue-600 text-blue-700 font-semibold px-8 py-4 text-lg hover:bg-blue-50">
            <span className="inline-flex items-center gap-2">
              📊 View Results
            </span>
          </Button>
        </div>
      </section>

      {/* Test Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Test
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select from our comprehensive range of practice tests designed to help you succeed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* IELTS */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">IELTS</h3>
              <p className="text-gray-700 mb-6 text-center">
                International English Language Testing System
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Full-length practice tests
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  All 4 modules covered
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Detailed explanations
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Band score calculator
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Duration: 2h 45m</span>
                <span className="text-sm text-blue-600 font-medium">15 Tests</span>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Play className="w-4 h-4 mr-2" />
                Start IELTS Test
              </Button>
            </div>
            
            {/* TOEFL */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">TOEFL</h3>
              <p className="text-gray-700 mb-6 text-center">
                Test of English as a Foreign Language
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Computer-based tests
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  All 4 sections included
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Score predictions
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Academic focus
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Duration: 3h</span>
                <span className="text-sm text-green-600 font-medium">12 Tests</span>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Play className="w-4 h-4 mr-2" />
                Start TOEFL Test
              </Button>
            </div>
            
            {/* PTE */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">PTE</h3>
              <p className="text-gray-700 mb-6 text-center">
                Pearson Test of English Academic
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Computer-delivered tests
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  AI scoring system
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Quick results
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Global recognition
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Duration: 2h 45m</span>
                <span className="text-sm text-purple-600 font-medium">10 Tests</span>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Play className="w-4 h-4 mr-2" />
                Start PTE Test
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tests */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Practice Tests
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Most popular and highly-rated practice tests to help you prepare effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* IELTS Academic */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Target className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">IELTS Academic</Badge>
                  <span className="text-xs text-gray-500">2h 45m</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  IELTS Academic Full Test
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete IELTS Academic test with all four modules: Listening, Reading, Writing, and Speaking.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">4.8/5 (2.3k reviews)</span>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Play className="w-4 h-4 mr-2" />
                    Start Test
                  </Button>
                </div>
              </div>
            </div>
            
            {/* TOEFL iBT */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                <Target className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">TOEFL iBT</Badge>
                  <span className="text-xs text-gray-500">3h</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  TOEFL iBT Complete Test
                </h3>
                <p className="text-gray-600 mb-4">
                  Full TOEFL iBT practice test with Reading, Listening, Speaking, and Writing sections.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">4.7/5 (1.8k reviews)</span>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    Start Test
                  </Button>
                </div>
              </div>
            </div>
            
            {/* PTE Academic */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Target className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">PTE Academic</Badge>
                  <span className="text-xs text-gray-500">2h 45m</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  PTE Academic Full Test
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete PTE Academic test with Speaking, Writing, Reading, and Listening sections.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">4.6/5 (1.5k reviews)</span>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Play className="w-4 h-4 mr-2" />
                    Start Test
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Mock Tests?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our practice tests are designed to give you the most realistic exam experience and help you improve your scores.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Realistic Format</h3>
              <p className="text-gray-600">Tests mirror actual exam format and difficulty level</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Timer className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Timed Practice</h3>
              <p className="text-gray-600">Practice under real exam time constraints</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Analysis</h3>
              <p className="text-gray-600">Get comprehensive feedback and explanations</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Score Prediction</h3>
              <p className="text-gray-600">Accurate score predictions based on performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">37</div>
              <div className="text-gray-600">Practice Tests</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">15K+</div>
              <div className="text-gray-600">Students Tested</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">4.8/5</div>
              <div className="text-gray-600">Student Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Practice?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start your practice test today and improve your English proficiency scores with our expert-designed mock tests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg">
              <span className="inline-flex items-center gap-2">
                <Play className="w-5 h-5" /> Start Free Test
              </span>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg">
              <span className="inline-flex items-center gap-2">
                <Phone className="w-5 h-5" /> Get Help
              </span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 