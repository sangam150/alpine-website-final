'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Download, BookOpen, HelpCircle } from 'lucide-react';

const visaFaqs = [
  {
    category: 'Student Visa',
    country: 'Australia',
    faqs: [
      {
        question: 'What is a Student Visa (Subclass 500)?',
        answer: 'The Student Visa (Subclass 500) allows you to stay in Australia for up to 5 years to study full-time at a recognized educational institution. You can work up to 40 hours per fortnight during your studies.'
      },
      {
        question: 'What are the requirements for an Australian student visa?',
        answer: 'Requirements include: Confirmation of Enrollment (CoE), proof of financial capacity (AUD 24,505 per year), English proficiency (IELTS 6.0 or equivalent), health insurance (OSHC), and genuine temporary entrant statement.'
      },
      {
        question: 'How much does an Australian student visa cost?',
        answer: 'The visa application fee is AUD 710. Additional costs include health insurance (OSHC) around AUD 500-600 per year, medical examination fees, and English test fees.'
      },
      {
        question: 'Can I work while studying in Australia?',
        answer: 'Yes, you can work up to 40 hours per fortnight during your studies and unlimited hours during scheduled course breaks. You must maintain satisfactory course progress.'
      }
    ]
  },
  {
    category: 'Student Visa',
    country: 'Canada',
    faqs: [
      {
        question: 'What is a Study Permit?',
        answer: 'A Study Permit is a document issued by Immigration, Refugees and Citizenship Canada (IRCC) that allows foreign nationals to study at designated learning institutions (DLI) in Canada.'
      },
      {
        question: 'What are the requirements for a Canadian study permit?',
        answer: 'Requirements include: Letter of Acceptance from a DLI, proof of financial support (CAD 20,635 + tuition), English/French proficiency, medical examination, police certificate, and statement of purpose.'
      },
      {
        question: 'How much does a Canadian study permit cost?',
        answer: 'The application fee is CAD 150. Additional costs include biometrics fee (CAD 85), medical examination (varies), and proof of funds showing CAD 20,635 + first year tuition.'
      },
      {
        question: 'Can I work while studying in Canada?',
        answer: 'Yes, you can work up to 20 hours per week during academic sessions and full-time during scheduled breaks. You can also work on-campus without a work permit.'
      }
    ]
  },
  {
    category: 'Student Visa',
    country: 'UK',
    faqs: [
      {
        question: 'What is a Student Visa (Tier 4)?',
        answer: 'The Student Visa allows you to study in the UK at a licensed student sponsor. You can stay for the duration of your course plus additional time depending on your level of study.'
      },
      {
        question: 'What are the requirements for a UK student visa?',
        answer: 'Requirements include: Confirmation of Acceptance for Studies (CAS), proof of financial support, English proficiency (B2 level), tuberculosis test (if required), and academic qualifications.'
      },
      {
        question: 'How much does a UK student visa cost?',
        answer: 'The application fee is £490 for applications from outside the UK. Additional costs include healthcare surcharge (£470 per year), English test fees, and proof of funds showing £1,334 per month for London or £1,023 for other areas.'
      },
      {
        question: 'Can I work while studying in the UK?',
        answer: 'Yes, you can work up to 20 hours per week during term time and full-time during holidays. Some courses may have restrictions on work permissions.'
      }
    ]
  },
  {
    category: 'Work Visa',
    country: 'Australia',
    faqs: [
      {
        question: 'What is a Temporary Skill Shortage (TSS) Visa?',
        answer: 'The TSS Visa allows skilled workers to work in Australia for up to 4 years. It has three streams: Short-term, Medium-term, and Labour Agreement.'
      },
      {
        question: 'What is the Skilled Independent Visa (Subclass 189)?',
        answer: 'This is a permanent visa for skilled workers who are not sponsored by an employer, state, or territory. You must be invited to apply and meet the points test.'
      },
      {
        question: 'How does the points system work for Australian visas?',
        answer: 'Points are awarded for age, English proficiency, skilled employment experience, qualifications, and other factors. You typically need 65 points to be eligible for skilled visas.'
      }
    ]
  },
  {
    category: 'Work Visa',
    country: 'Canada',
    faqs: [
      {
        question: 'What is Express Entry?',
        answer: 'Express Entry is Canada\'s system for managing applications for permanent residence from skilled workers. It includes the Federal Skilled Worker Program, Federal Skilled Trades Program, and Canadian Experience Class.'
      },
      {
        question: 'What is a Post-Graduation Work Permit (PGWP)?',
        answer: 'The PGWP allows international graduates to work in Canada for up to 3 years after completing their studies. The duration depends on the length of your study program.'
      },
      {
        question: 'How does the Comprehensive Ranking System (CRS) work?',
        answer: 'The CRS awards points for factors like age, education, work experience, language proficiency, and adaptability. Higher scores increase your chances of receiving an Invitation to Apply (ITA).'
      }
    ]
  },
  {
    category: 'General Visa',
    country: 'All Countries',
    faqs: [
      {
        question: 'How long does visa processing take?',
        answer: 'Processing times vary by country and visa type. Student visas typically take 2-8 weeks, while work visas can take 1-6 months. Express Entry applications are usually processed within 6 months.'
      },
      {
        question: 'What documents do I need for visa applications?',
        answer: 'Common requirements include: passport, application form, photos, financial documents, academic transcripts, English test results, medical examination, police certificate, and supporting letters.'
      },
      {
        question: 'Can I apply for a visa without an agent?',
        answer: 'Yes, you can apply directly, but using a registered migration agent can help ensure your application is complete and accurate, potentially avoiding delays or rejections.'
      },
      {
        question: 'What happens if my visa is refused?',
        answer: 'You can usually appeal the decision or reapply. The process depends on the country and visa type. It\'s important to address the reasons for refusal in any new application.'
      }
    ]
  }
];

const countries = ['All Countries', 'Australia', 'Canada', 'UK', 'USA', 'New Zealand', 'Germany', 'France'];
const categories = ['All Categories', 'Student Visa', 'Work Visa', 'Tourist Visa', 'Family Visa'];

export default function VisaFaqsClient() {
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = visaFaqs.filter(faq => {
    const matchesCountry = selectedCountry === 'All Countries' || faq.country === selectedCountry;
    const matchesCategory = selectedCategory === 'All Categories' || faq.category === selectedCategory;
    const matchesSearch = faq.faqs.some(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesCountry && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Visa FAQs & Information
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Get answers to common visa questions and understand the application process for your study abroad journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search visa questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No FAQs found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredFaqs.map((section, index) => (
                <Card key={index} className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-900">
                          {section.category} - {section.country}
                        </CardTitle>
                        <p className="text-gray-600 mt-2">
                          Common questions about {section.category.toLowerCase()} for {section.country}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-sm">
                        {section.faqs.length} FAQs
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Accordion type="single" collapsible className="w-full">
                      {section.faqs.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                          <AccordionTrigger className="px-6 py-4 text-left hover:bg-gray-50">
                            <span className="font-medium text-gray-900">{faq.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4">
                            <div className="prose prose-sm max-w-none">
                              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              Additional Visa Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Download className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Visa Application Guides</h3>
                  <p className="text-gray-600 mb-4">
                    Step-by-step guides for different visa types and countries
                  </p>
                  <Button variant="outline" className="w-full">
                    Download Guides
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <BookOpen className="h-8 w-8 text-green-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Document Checklists</h3>
                  <p className="text-gray-600 mb-4">
                    Comprehensive checklists for visa applications
                  </p>
                  <Button variant="outline" className="w-full">
                    View Checklists
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <HelpCircle className="h-8 w-8 text-purple-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Expert Consultation</h3>
                  <p className="text-gray-600 mb-4">
                    Book a consultation with our visa experts
                  </p>
                  <Button variant="outline" className="w-full">
                    Book Consultation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Personalized Visa Guidance?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Our visa experts are here to help you navigate the application process
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Schedule Free Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Download Visa Guide
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 