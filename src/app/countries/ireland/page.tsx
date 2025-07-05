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

export default function IrelandPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="text-9xl">🇮🇪</div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Study in Ireland</h1>
          <p className="text-xl lg:text-2xl mb-8">Experience world-class education in the Emerald Isle with rich culture, innovation, and career opportunities.</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>Affordable Education</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>English Speaking</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>No IELTS Required</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Tech Hub</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">7</div>
              <div className="text-sm text-gray-600">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">€10K-25K</div>
              <div className="text-sm text-gray-600">Annual Tuition</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">88%</div>
              <div className="text-sm text-gray-600">Visa Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">2 Years</div>
              <div className="text-sm text-gray-600">Post-Study Work</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Ireland */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Ireland?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ireland offers a perfect blend of academic excellence, cultural richness, and career opportunities in Europe's tech hub.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>World-Class Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Home to Trinity College Dublin and University College Dublin, Ireland offers internationally recognized degrees with strong industry connections.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>English Speaking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No language barriers! All programs are taught in English, making it perfect for international students.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Tech Hub</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Dublin is Europe's tech capital with Google, Facebook, Apple, and Microsoft having major offices here.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle>Affordable Living</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Compared to other European countries, Ireland offers reasonable living costs with excellent quality of life.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Post-Study Work</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Stay in Ireland for up to 2 years after graduation to gain valuable work experience in your field.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Rich Culture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Experience Irish hospitality, music, literature, and beautiful landscapes while studying.
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
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Top Universities in Ireland</h2>
            <p className="text-lg text-gray-600">
              Choose from Ireland's leading institutions known for academic excellence and research innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Trinity College Dublin</h3>
                  <Badge variant="secondary">QS Top 100</Badge>
                </div>
                <p className="text-sm text-gray-600">Founded in 1592, Ireland's oldest university</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tuition:</span>
                    <span className="font-semibold">€15,000-25,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">IELTS:</span>
                    <span className="font-semibold">6.5-7.0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">1-4 years</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">University College Dublin</h3>
                  <Badge variant="secondary">QS Top 200</Badge>
                </div>
                <p className="text-sm text-gray-600">Ireland's largest university</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tuition:</span>
                    <span className="font-semibold">€12,000-22,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">IELTS:</span>
                    <span className="font-semibold">6.5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">1-4 years</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">National University of Ireland Galway</h3>
                  <Badge variant="secondary">QS Top 300</Badge>
                </div>
                <p className="text-sm text-gray-600">Located in beautiful Galway</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tuition:</span>
                    <span className="font-semibold">€10,000-18,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">IELTS:</span>
                    <span className="font-semibold">6.5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">1-4 years</span>
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
              Discover the most sought-after programs that lead to successful careers in Ireland and beyond.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Computer Science</h3>
                </div>
                <p className="text-gray-600 mb-4">Software engineering, AI, and data science programs</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Duration: 1-4 years</span>
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
                  <h3 className="text-lg font-semibold">Business & Finance</h3>
                </div>
                <p className="text-gray-600 mb-4">MBA, accounting, and international business</p>
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
                  <h3 className="text-lg font-semibold">Engineering</h3>
                </div>
                <p className="text-gray-600 mb-4">Mechanical, electrical, and civil engineering</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Duration: 4 years</span>
                  <Badge variant="outline">Stable Career</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Study in Ireland?</h2>
          <p className="text-xl mb-8">
            Join thousands of international students who have chosen Ireland for their study abroad journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              <Link href="/apply">
                Apply Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
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