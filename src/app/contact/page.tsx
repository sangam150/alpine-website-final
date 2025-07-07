import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare,
  Send,
  CheckCircle
} from 'lucide-react';
import ContactFormClient from './ContactFormClient';

export const metadata: Metadata = {
  title: 'Contact Us - Alpine Education | Get Expert Study Abroad Guidance',
  description: 'Contact Alpine Education for expert study abroad guidance. Get in touch for free counseling, visa assistance, and application support.',
  keywords: 'contact Alpine Education, study abroad consultation, visa guidance Nepal, education consultancy contact',
  openGraph: {
    title: 'Contact Us - Alpine Education',
    description: 'Get expert study abroad guidance and support.',
    type: 'website',
  },
};

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    content: '+977-1-4444444',
    action: 'tel:+977-1-4444444',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@alpineeducation.com',
    action: 'mailto:info@alpineeducation.com',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    icon: MapPin,
    title: 'Address',
    content: 'Kathmandu, Nepal',
    action: '#map',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    icon: Clock,
    title: 'Working Hours',
    content: 'Mon-Fri: 9AM-6PM',
    action: null,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  }
];

const services = [
  'Free Study Abroad Counseling',
  'Visa Application Support',
  'University Application Guidance',
  'Test Preparation Classes',
  'Document Preparation',
  'Pre-Departure Briefing'
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Get in touch with our expert team for personalized study abroad guidance and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're here to help you achieve your study abroad dreams. Contact us for expert guidance and support.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={info.title} className="group">
                <div className="animate-fade-in hover:-translate-y-1 transition-transform duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 ${info.bgColor} rounded-full flex items-center justify-center`}>
                        <info.icon className={`w-8 h-8 ${info.color}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{info.title}</h3>
                      <p className="text-gray-600 mb-4">{info.content}</p>
                      {info.action && (
                        <Button asChild variant="outline" size="sm">
                          <a href={info.action}>
                            {info.title === 'Phone' ? 'Call Now' : 
                             info.title === 'Email' ? 'Send Email' : 'Get Directions'}
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form and Services */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in-left">
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <MessageSquare className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Send us a Message</h3>
                  </div>
                  <ContactFormClient />
                </CardContent>
              </Card>
            </div>

            {/* Services and Info */}
            <div className="space-y-8">
              <div className="animate-fade-in-right">
                <Card className="shadow-lg">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h3>
                    <div className="space-y-4">
                      {services.map((service, index) => (
                        <div key={service} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{service}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Why Choose Us */}
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Alpine Education?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Expert counselors with years of experience</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">95% visa success rate across all countries</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Personalized guidance throughout your journey</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Comprehensive support from application to visa</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section id="map" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Find Us</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Visit our office in Kathmandu for a face-to-face consultation.
              </p>
            </div>
          </div>

          <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5!2d85.3240!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19c0b9a0b0b0%3A0x0!2zMjnCsDQzJzAyLjAiTiA4NcKwMTknMjYuNCJF!5e0!3m2!1sen!2snp!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Alpine Education Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get answers to common questions about our services and study abroad process.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'How much does your counseling service cost?',
                answer: 'Our initial counseling session is completely free. We offer personalized guidance to help you choose the right country, university, and course.'
              },
              {
                question: 'What documents do I need for visa application?',
                answer: 'Requirements vary by country, but generally include academic transcripts, financial documents, passport, and test scores. We provide detailed checklists for each destination.'
              },
              {
                question: 'How long does the application process take?',
                answer: 'The timeline varies by country and university. Generally, it takes 2-4 weeks for application processing and 2-8 weeks for visa processing.'
              },
              {
                question: 'Do you guarantee visa approval?',
                answer: 'While we cannot guarantee visa approval, we have a 95% success rate. We provide comprehensive guidance and ensure all documents meet requirements.'
              },
              {
                question: 'Can you help with test preparation?',
                answer: 'Yes, we offer IELTS, PTE, and TOEFL preparation classes with experienced instructors and proven success rates.'
              },
              {
                question: 'What countries do you specialize in?',
                answer: 'We specialize in Australia, UK, Canada, USA, Germany, Netherlands, and other popular study destinations with strong university partnerships.'
              }
            ].map((faq, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Book your free consultation today and take the first step towards your international education dreams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100">
                <a href="tel:+977-1-4444444">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-blue-600">
                <a href="mailto:info@alpineeducation.com">
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 