import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  DollarSign, 
  Globe, 
  CheckCircle, 
  Users, 
  Calendar,
  MapPin,
  BookOpen,
  ArrowRight,
  Star
} from 'lucide-react';

export default function NetherlandsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-red-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="text-9xl">🇳🇱</div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Study in Netherlands</h1>
          <p className="text-xl lg:text-2xl mb-8">Experience innovative education in one of Europe's most progressive and international countries.</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>Affordable Education</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>English Programs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>No IELTS Required</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Innovation Hub</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">13</div>
              <div className="text-sm text-gray-600">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">€2K-15K</div>
              <div className="text-sm text-gray-600">Annual Tuition</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">80%</div>
              <div className="text-sm text-gray-600">Visa Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">1 Year</div>
              <div className="text-sm text-gray-600">Post-Study Work</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Netherlands */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Netherlands?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The Netherlands offers innovative education, international environment, and excellent career prospects in Europe's business hub.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Innovative Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Dutch universities are known for their practical, research-based approach and strong industry connections.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>English Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Over 2,000 English-taught programs available, making it perfect for international students.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>International Environment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  One of the most international student populations in Europe with students from 160+ countries.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle>Affordable Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Lower tuition fees compared to other European countries with excellent value for money.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Work Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Strong economy with many multinational companies offering excellent career prospects.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Quality of Life</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  High standard of living, excellent healthcare, and beautiful cities with rich culture.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Top Universities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Top Universities in Netherlands</h2>
            <p className="text-lg text-gray-600">
              Choose from world-renowned institutions known for academic excellence and innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">University of Amsterdam</h3>
                  <Badge variant="secondary">QS Top 50</Badge>
                </div>
                <p className="text-sm text-gray-600">Leading research university</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tuition:</span>
                    <span className="font-semibold">€2,168-15,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">IELTS:</span>
                    <span className="font-semibold">6.5-7.0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">1-3 years</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Delft University of Technology</h3>
                  <Badge variant="secondary">QS Top 100</Badge>
                </div>
                <p className="text-sm text-gray-600">World's best engineering university</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tuition:</span>
                    <span className="font-semibold">€2,168-15,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">IELTS:</span>
                    <span className="font-semibold">6.5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">2-3 years</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Erasmus University Rotterdam</h3>
                  <Badge variant="secondary">QS Top 200</Badge>
                </div>
                <p className="text-sm text-gray-600">Business and economics focus</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tuition:</span>
                    <span className="font-semibold">€2,168-15,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">IELTS:</span>
                    <span className="font-semibold">6.5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">1-2 years</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Programs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Popular Study Programs</h2>
            <p className="text-lg text-gray-600">
              Discover the most sought-after programs that lead to successful careers in the Netherlands and Europe.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Engineering</h3>
                </div>
                <p className="text-gray-600 mb-4">Civil, mechanical, and electrical engineering</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Duration: 2-3 years</span>
                  <Badge variant="outline">High Demand</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Business & Economics</h3>
                </div>
                <p className="text-gray-600 mb-4">International business and finance programs</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Duration: 1-2 years</span>
                  <Badge variant="outline">Popular</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Computer Science</h3>
                </div>
                <p className="text-gray-600 mb-4">Software engineering and data science</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Duration: 2 years</span>
                  <Badge variant="outline">Stable Career</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Study in Netherlands?</h2>
          <p className="text-xl mb-8">
            Join thousands of international students who have chosen the Netherlands for their study abroad journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              <Link href="/apply">
                Apply Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
              <Link href="/contact">
                Book Free Counselling
                <BookOpen className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 