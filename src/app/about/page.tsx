"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Award, 
  Globe, 
  Target, 
  CheckCircle, 
  Star,
  GraduationCap,
  Heart,
  Shield,
  Zap,
  Phone
} from "lucide-react";

const stats = [
  {
    number: "5000+",
    label: "Students Placed",
    icon: Users,
    color: "text-blue-600"
  },
  {
    number: "95%",
    label: "Success Rate",
    icon: Award,
    color: "text-green-600"
  },
  {
    number: "12+",
    label: "Countries",
    icon: Globe,
    color: "text-purple-600"
  },
  {
    number: "15+",
    label: "Years Experience",
    icon: Target,
    color: "text-orange-600"
  }
];

const timeline = [
  {
    year: "2010",
    title: "Foundation",
    description: "Alpine Education & Visa Services was established in Kathmandu with a vision to help Nepali students achieve their international education dreams."
  },
  {
    year: "2015",
    title: "Expansion",
    description: "Expanded services to 8 countries and helped over 1000 students successfully secure admissions and visas."
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description: "Launched comprehensive online platform with AI-powered counseling, document management, and real-time tracking."
  },
  {
    year: "2025",
    title: "Industry Leader",
    description: "Became Nepal's leading education consultancy with 5000+ successful placements and 95% visa success rate."
  }
];

const team = [
  {
    name: "Rajesh Kumar",
    role: "Founder & CEO",
    experience: "15+ years",
    expertise: "Strategic Planning, Business Development",
    image: "/testimonials/rajesh.jpg",
    achievements: ["5000+ Students Placed", "95% Success Rate", "15+ Years Experience"]
  },
  {
    name: "Priya Sharma",
    role: "Head of Admissions",
    experience: "12+ years",
    expertise: "University Partnerships, Application Process",
    image: "/testimonials/priya.jpg",
    achievements: ["Expert in UK/Australia", "1000+ Applications", "98% Acceptance Rate"]
  },
  {
    name: "Anita Patel",
    role: "Visa Specialist",
    experience: "10+ years",
    expertise: "Visa Documentation, Interview Preparation",
    image: "/testimonials/anita.jpg",
    achievements: ["Visa Expert", "500+ Approvals", "Interview Coach"]
  },
  {
    name: "Suresh Thapa",
    role: "Student Counselor",
    experience: "8+ years",
    expertise: "Career Guidance, Test Preparation",
    image: "/testimonials/suresh.jpg",
    achievements: ["Career Counselor", "IELTS Expert", "SOP Writer"]
  }
];

const values = [
  {
    icon: Heart,
    title: "Student-Centric",
    description: "Every decision we make is focused on student success and well-being."
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "We maintain complete transparency in our processes and pricing."
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We continuously innovate to provide the best possible service experience."
  },
  {
    icon: CheckCircle,
    title: "Excellence",
    description: "We strive for excellence in every aspect of our service delivery."
  }
];

const achievements = [
  {
    title: "Best Education Consultancy 2024",
    organization: "Nepal Education Awards",
    year: "2024"
  },
  {
    title: "Excellence in Student Services",
    organization: "International Education Association",
    year: "2023"
  },
  {
    title: "Top Visa Success Rate",
    organization: "Study Abroad Network",
    year: "2023"
  },
  {
    title: "Most Trusted Brand",
    organization: "Student Choice Awards",
    year: "2022"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Visuals */}
      <div className="relative pt-20 pb-16 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
              <Star className="w-4 h-4 mr-2" />
              Leading Education Consultancy Since 2010
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About Alpine Education
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We are Nepal&apos;s premier education consultancy, dedicated to helping students achieve their international education dreams. 
              With over 15 years of experience and 5000+ successful placements, we&apos;ve built a reputation for excellence, 
              transparency, and student success.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Phone className="w-4 h-4 mr-2" />
                Book Free Consultation
              </Button>
              <Button size="lg" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Meet Our Team
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 group-hover:scale-110 transition-transform ${stat.color}`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission & Vision
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                    Our Mission
                  </h3>
                  <p className="text-gray-600">
                    To provide comprehensive, transparent, and personalized education consulting services that empower Nepali students 
                    to achieve their international education goals with confidence and success.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-purple-600" />
                    Our Vision
                  </h3>
                  <p className="text-gray-600">
                    To be the most trusted and innovative education consultancy in Nepal, recognized for our commitment to student success, 
                    ethical practices, and continuous improvement in service delivery.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Why Choose Alpine?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">15+ Years Experience</h4>
                      <p className="text-blue-100 text-sm">Proven track record in international education</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">95% Success Rate</h4>
                      <p className="text-blue-100 text-sm">Highest visa approval rate in Nepal</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">5000+ Success Stories</h4>
                      <p className="text-blue-100 text-sm">Students placed in top universities worldwide</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">End-to-End Support</h4>
                      <p className="text-blue-100 text-sm">From application to arrival assistance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">15 years of excellence in international education</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-600">Dedicated professionals committed to your success</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-3">{member.experience} Experience</p>
                  <p className="text-sm text-gray-600 mb-4">{member.expertise}</p>
                  <div className="space-y-1">
                    {member.achievements.map((achievement, i) => (
                      <div key={i} className="text-xs text-gray-500 flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Awards & Recognition */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
            <p className="text-xl text-gray-600">Industry recognition for our excellence</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{achievement.organization}</p>
                  <p className="text-xs text-gray-500">{achievement.year}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who have achieved their international education dreams with Alpine Education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              <Phone className="w-4 h-4 mr-2" />
              Book Free Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <GraduationCap className="w-4 h-4 mr-2" />
              Explore Programs
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #000 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
