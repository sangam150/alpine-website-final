'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Phone, 
  MessageCircle, 
  Calendar, 
  ArrowRight,
  CheckCircle,
  Users,
  Clock,
  Award,
  BookOpen,
  GraduationCap
} from 'lucide-react';

const ctaOptions = [
  {
    icon: Calendar,
    title: 'Free Counseling Session',
    description: 'Book a 30-minute free consultation with our expert counselors',
    action: 'Book Now',
    href: '/contact',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Consultation',
    description: 'Get instant answers to your study abroad questions',
    action: 'Chat Now',
    href: '#',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    isWhatsApp: true
  },
  {
    icon: Phone,
    title: 'Call Us Directly',
    description: 'Speak with our counselors over the phone',
    action: 'Call Now',
    href: 'tel:+977-1-4XXXXXXX',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  }
];

const benefits = [
  'No consultation fees',
  'Expert guidance',
  'Personalized recommendations',
  'Document checklist',
  'University selection help',
  'Visa guidance'
];

export default function CTASection() {
  const handleWhatsAppClick = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+977-XXXXXXXXX';
    const message = encodeURIComponent('Hi! I&apos;m interested in studying abroad. Can you help me?');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Start Your Study Abroad Journey Today
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Don&apos;t let your dreams wait. Get expert guidance and take the first step towards 
            your international education.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
              <Link href="/contact">
                <BookOpen className="w-5 h-5 mr-2" />
                Book Free Counselling
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-2 border-white text-white hover:bg-white hover:text-blue-900">
              <Link href="/apply">
                <GraduationCap className="w-5 h-5 mr-2" />
                Apply Now
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* CTA Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {ctaOptions.map((option) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${option.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <option.icon className={`w-8 h-8 ${option.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {option.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button
                    onClick={option.isWhatsApp ? handleWhatsAppClick : undefined}
                    asChild={!option.isWhatsApp}
                    className={`w-full bg-gradient-to-r ${option.color} hover:from-blue-700 hover:to-blue-800 text-white`}
                  >
                    {option.isWhatsApp ? (
                      <span>
                        {option.action} <ArrowRight className="w-4 h-4 ml-2" />
                      </span>
                    ) : (
                      <Link href={option.href}>
                        {option.action} <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              What You&apos;ll Get with Free Counseling
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive counseling session covers everything you need to know about 
              studying abroad, from university selection to visa requirements.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-200" />
              <div className="text-3xl font-bold mb-2">3000+</div>
              <p className="text-blue-100">Students Placed</p>
            </div>
            <div>
              <Award className="w-12 h-12 mx-auto mb-4 text-blue-200" />
              <div className="text-3xl font-bold mb-2">95%</div>
              <p className="text-blue-100">Success Rate</p>
            </div>
            <div>
              <Clock className="w-12 h-12 mx-auto mb-4 text-blue-200" />
              <div className="text-3xl font-bold mb-2">24/7</div>
              <p className="text-blue-100">Support Available</p>
            </div>
            <div>
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-blue-200" />
              <div className="text-3xl font-bold mb-2">12+</div>
              <p className="text-blue-100">Countries</p>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Take the Next Step?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who trusted Alpine Education with their 
            study abroad dreams. Your journey starts with a simple conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
              <Link href="/contact">
                <BookOpen className="w-5 h-5 mr-2" />
                Book Free Counselling
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-2 border-white text-white hover:bg-white hover:text-blue-900">
              <Link href="/apply">
                <GraduationCap className="w-5 h-5 mr-2" />
                Apply Now
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 