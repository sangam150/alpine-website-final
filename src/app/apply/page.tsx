'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  GraduationCap, 
  Globe, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  Users
} from 'lucide-react';

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    currentEducation: '',
    desiredCountry: '',
    desiredCourse: '',
    desiredUniversity: '',
    testScores: '',
    workExperience: '',
    budget: '',
    timeline: '',
    additionalInfo: ''
  });

  const countries = [
    'Australia', 'Canada', 'UK', 'USA', 'Germany', 'France', 
    'Netherlands', 'Ireland', 'New Zealand', 'Sweden', 'Norway', 'Finland'
  ];

  const courses = [
    'Computer Science', 'Engineering', 'Business Administration', 'Medicine',
    'Law', 'Arts & Humanities', 'Science', 'Education', 'Social Sciences',
    'Agriculture', 'Architecture', 'Design', 'Other'
  ];

  const universities = [
    'University of Melbourne', 'University of Toronto', 'University of Manchester',
    'Harvard University', 'Technical University of Munich', 'Sorbonne University',
    'University of Amsterdam', 'Trinity College Dublin', 'University of Auckland',
    'Uppsala University', 'University of Oslo', 'University of Helsinki'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  const steps = [
    { number: 1, title: 'Personal Information', icon: User },
    { number: 2, title: 'Academic Details', icon: GraduationCap },
    { number: 3, title: 'Study Preferences', icon: Globe },
    { number: 4, title: 'Review & Submit', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                Start Your Application
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Begin your study abroad journey with Alpine Education. Our expert counselors will guide you through every step of the application process.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  currentStep >= step.number
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <step.icon className="w-6 h-6" />
                  </motion.div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900">
                {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Step {currentStep} of {steps.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nationality">Nationality *</Label>
                        <Input
                          id="nationality"
                          value={formData.nationality}
                          onChange={(e) => handleInputChange('nationality', e.target.value)}
                          required
                          className="mt-2"
                        />
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Step 2: Academic Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div>
                        <Label htmlFor="currentEducation">Current Education Level *</Label>
                        <Select value={formData.currentEducation} onValueChange={(value) => handleInputChange('currentEducation', value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select your current education level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high-school">High School</SelectItem>
                            <SelectItem value="bachelor">Bachelor&apos;s Degree</SelectItem>
                            <SelectItem value="master">Master&apos;s Degree</SelectItem>
                            <SelectItem value="phd">PhD</SelectItem>
                            <SelectItem value="diploma">Diploma</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="testScores">Test Scores (IELTS/TOEFL/PTE)</Label>
                        <Input
                          id="testScores"
                          value={formData.testScores}
                          onChange={(e) => handleInputChange('testScores', e.target.value)}
                          placeholder="e.g., IELTS 7.0, TOEFL 100"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="workExperience">Work Experience (if any)</Label>
                        <Textarea
                          id="workExperience"
                          value={formData.workExperience}
                          onChange={(e) => handleInputChange('workExperience', e.target.value)}
                          placeholder="Describe your work experience..."
                          className="mt-2"
                          rows={3}
                        />
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Step 3: Study Preferences */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div>
                        <Label htmlFor="desiredCountry">Desired Country *</Label>
                        <Select value={formData.desiredCountry} onValueChange={(value) => handleInputChange('desiredCountry', value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select your desired country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>{country}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="desiredCourse">Desired Course/Program *</Label>
                        <Select value={formData.desiredCourse} onValueChange={(value) => handleInputChange('desiredCourse', value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select your desired course" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses.map((course) => (
                              <SelectItem key={course} value={course}>{course}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="desiredUniversity">Preferred Universities</Label>
                        <Select value={formData.desiredUniversity} onValueChange={(value) => handleInputChange('desiredUniversity', value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select preferred universities" />
                          </SelectTrigger>
                          <SelectContent>
                            {universities.map((university) => (
                              <SelectItem key={university} value={university}>{university}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="budget">Budget Range</Label>
                          <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-20k">Under $20,000</SelectItem>
                              <SelectItem value="20k-40k">$20,000 - $40,000</SelectItem>
                              <SelectItem value="40k-60k">$40,000 - $60,000</SelectItem>
                              <SelectItem value="60k-80k">$60,000 - $80,000</SelectItem>
                              <SelectItem value="over-80k">Over $80,000</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="timeline">Preferred Start Date</Label>
                          <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fall-2024">Fall 2024</SelectItem>
                              <SelectItem value="spring-2025">Spring 2025</SelectItem>
                              <SelectItem value="fall-2025">Fall 2025</SelectItem>
                              <SelectItem value="spring-2026">Spring 2026</SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="additionalInfo">Additional Information</Label>
                        <Textarea
                          id="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                          placeholder="Any additional information or specific requirements..."
                          className="mt-2"
                          rows={4}
                        />
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="bg-blue-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-blue-900 mb-4">Review Your Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
                          </div>
                          <div>
                            <span className="font-medium">Email:</span> {formData.email}
                          </div>
                          <div>
                            <span className="font-medium">Phone:</span> {formData.phone}
                          </div>
                          <div>
                            <span className="font-medium">Nationality:</span> {formData.nationality}
                          </div>
                          <div>
                            <span className="font-medium">Desired Country:</span> {formData.desiredCountry}
                          </div>
                          <div>
                            <span className="font-medium">Desired Course:</span> {formData.desiredCourse}
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-green-900 mb-2">What Happens Next?</h3>
                        <ul className="space-y-2 text-sm text-green-800">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Our expert counselor will review your application within 24 hours
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            You&apos;ll receive a personalized study plan and university recommendations
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Free counseling session to discuss your options in detail
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Complete guidance through the entire application process
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="flex items-center gap-2"
                    >
                      ← Previous Step
                    </Button>
                  )}
                  
                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    >
                      Submit Application
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center justify-center space-x-2">
                <Users className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">3000+</div>
                  <div className="text-sm text-gray-600">Students Placed</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Award className="w-8 h-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Star className="w-8 h-8 text-yellow-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                  <div className="text-sm text-gray-600">Student Rating</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 