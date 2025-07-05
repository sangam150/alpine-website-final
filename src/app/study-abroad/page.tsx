import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Users, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Study Abroad Services - Alpine Education & Visa Services',
  description: 'Comprehensive study abroad services including university applications, visa assistance, test preparation, and counseling. Start your international education journey with Alpine.',
};

const services = [
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: 'University Applications',
    description: 'Expert guidance for university applications to top institutions worldwide.',
    features: [
      'Profile evaluation and course selection',
      'Application form assistance',
      'Document preparation and verification',
      'Statement of purpose writing',
      'Letter of recommendation guidance'
    ],
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: 'Visa Services',
    description: 'Complete visa application support with high success rates.',
    features: [
      'Visa application preparation',
      'Document checklist and verification',
      'Interview preparation',
      'Financial documentation',
      'Visa tracking and updates'
    ],
    color: 'bg-green-100 text-green-600'
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: 'Test Preparation',
    description: 'IELTS, PTE, GRE, GMAT preparation with expert instructors.',
    features: [
      'Personalized study plans',
      'Mock tests and practice materials',
      'One-on-one tutoring',
      'Score improvement strategies',
      'Test day preparation'
    ],
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Counseling Services',
    description: 'Professional counseling to help you make informed decisions.',
    features: [
      'Career guidance and planning',
      'Country and university selection',
      'Scholarship opportunities',
      'Application timeline planning',
      'Pre-departure orientation'
    ],
    color: 'bg-orange-100 text-orange-600'
  }
];

const countries = [
  { name: 'Australia', flag: '🇦🇺', students: '500+', universities: '50+' },
  { name: 'United Kingdom', flag: '🇬🇧', students: '400+', universities: '40+' },
  { name: 'Canada', flag: '🇨🇦', students: '300+', universities: '30+' },
  { name: 'Germany', flag: '🇩🇪', students: '200+', universities: '25+' },
  { name: 'New Zealand', flag: '🇳🇿', students: '150+', universities: '20+' },
  { name: 'United States', flag: '🇺🇸', students: '250+', universities: '35+' }
];

export default function StudyAbroadPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Study Abroad with Confidence
            </h1>
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
              Your trusted partner for international education. We&apos;ve helped thousands of students 
              achieve their study abroad dreams with personalized guidance and proven success rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/apply">Start Your Journey</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/contact">Free Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">3000+</div>
              <div className="text-gray-600">Students Placed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">12+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-gray-600">Universities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Comprehensive Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From initial counseling to post-arrival support, we provide end-to-end assistance 
              for your study abroad journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${service.color}`}>
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Popular Study Destinations
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We have strong partnerships with universities in these countries and have successfully 
              placed thousands of students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((country, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-3xl">{country.flag}</span>
                    <h3 className="text-xl font-semibold">{country.name}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Students Placed:</span>
                      <span className="font-semibold">{country.students}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Partner Universities:</span>
                      <span className="font-semibold">{country.universities}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <Link href={`/countries/${country.name.toLowerCase().replace(' ', '-')}`}>
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Your Journey to Study Abroad
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our proven 6-step process ensures your success in studying abroad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Initial Consultation', description: 'Free counseling session to understand your goals and requirements.' },
              { step: '02', title: 'Profile Evaluation', description: 'Comprehensive assessment of your academic and professional background.' },
              { step: '03', title: 'University Selection', description: 'Recommendation of suitable universities and courses based on your profile.' },
              { step: '04', title: 'Application Process', description: 'Complete assistance with university applications and document preparation.' },
              { step: '05', title: 'Visa Application', description: 'Expert guidance for visa application with high success rates.' },
              { step: '06', title: 'Pre-Departure Support', description: 'Orientation and support for a smooth transition to your new country.' }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Your Study Abroad Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who have achieved their international education dreams with Alpine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/apply">Apply Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/contact">Book Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 