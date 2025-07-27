"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Mail, 
  Share2, 
  CheckCircle, 
  Clock, 
  User,
  Calendar,
  MapPin,
  GraduationCap,
  DollarSign,
  TrendingUp,
  Target,
  BookOpen,
  Users,
  Globe,
  Star,
  Award,
  Phone,
  Mail as MailIcon,
  Globe as GlobeIcon
} from "lucide-react";

interface PDFGeneratorProps {
  type: "quiz" | "application" | "career" | "offerPackage";
  data: any;
  studentName?: string;
  studentEmail?: string;
}

export default function PDFGenerator({ type, data, studentName, studentEmail }: PDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create download link
      const blob = new Blob(['PDF content would be generated here'], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${type}-report-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const sendPDF = async () => {
    if (!studentEmail) return;
    
    setIsSending(true);
    
    try {
      // Simulate sending email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would integrate with your email service
      
    } catch (error) {
      console.error('Error sending PDF:', error);
    } finally {
      setIsSending(false);
    }
  };

  const renderQuizContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center border-b pb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <Globe className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Alpine Education & Visa Services</h1>
            <p className="text-gray-600">Your Study Abroad Journey Starts Here</p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-1" />
            +977-1-4444444
          </div>
          <div className="flex items-center">
            <MailIcon className="w-4 h-4 mr-1" />
            info@alpineeducation.com
          </div>
          <div className="flex items-center">
            <GlobeIcon className="w-4 h-4 mr-1" />
            www.alpineeducation.com
          </div>
        </div>
      </div>

      {/* Student Info */}
      {studentName && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Student Information</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Name:</span> {studentName}
            </div>
            <div>
              <span className="font-medium">Email:</span> {studentEmail}
            </div>
            <div>
              <span className="font-medium">Report Date:</span> {new Date().toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium">Report Type:</span> Country Selection Analysis
            </div>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Target className="w-6 h-6 mr-2 text-green-600" />
          Your Perfect Study Destination
        </h2>
        
        {data.topCountry && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-900">{data.topCountry.name}</h3>
                  <p className="text-green-700">Your #1 Recommended Destination</p>
                </div>
              </div>
              <Badge className="bg-green-600 text-white">Top Match</Badge>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-3 rounded">
                <div className="font-medium text-gray-700">Match Score</div>
                <div className="text-2xl font-bold text-green-600">{data.topCountry.score}/100</div>
              </div>
              <div className="bg-white p-3 rounded">
                <div className="font-medium text-gray-700">Visa Success Rate</div>
                <div className="text-2xl font-bold text-blue-600">{data.topCountry.visaSuccess}%</div>
              </div>
              <div className="bg-white p-3 rounded">
                <div className="font-medium text-gray-700">Average Tuition</div>
                <div className="text-2xl font-bold text-purple-600">${data.topCountry.tuition}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detailed Analysis */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Detailed Analysis</h3>
        <div className="space-y-4">
          {data.countries?.map((country: any, index: number) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                  </div>
                  <h4 className="text-lg font-semibold">{country.name}</h4>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{country.score}/100</div>
                  <div className="text-sm text-gray-500">Match Score</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-gray-700 mb-1">Strengths</div>
                  <ul className="space-y-1">
                    {country.strengths?.slice(0, 3).map((strength: string, i: number) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-gray-700 mb-1">Key Metrics</div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Visa Success:</span>
                      <span className="font-medium">{country.visaSuccess}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tuition:</span>
                      <span className="font-medium">${country.tuition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Living Cost:</span>
                      <span className="font-medium">${country.livingCost}/month</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
          Next Steps & Recommendations
        </h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              1
            </div>
            <div>
              <div className="font-medium">Schedule a Free Consultation</div>
              <div className="text-sm text-gray-600">Book a 30-minute session with our expert counselors</div>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              2
            </div>
            <div>
              <div className="font-medium">University Selection</div>
              <div className="text-sm text-gray-600">Get personalized university recommendations</div>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              3
            </div>
            <div>
              <div className="font-medium">Application Support</div>
              <div className="text-sm text-gray-600">Complete application assistance and document preparation</div>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              4
            </div>
            <div>
              <div className="font-medium">Visa Guidance</div>
              <div className="text-sm text-gray-600">Expert visa application support and interview preparation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Get Started Today</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Contact Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-600" />
                +977-1-4444444
              </div>
              <div className="flex items-center">
                <MailIcon className="w-4 h-4 mr-2 text-gray-600" />
                info@alpineeducation.com
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-600" />
                Kathmandu, Nepal
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Services Offered</h4>
            <div className="space-y-1 text-sm">
              <div>• University Application Support</div>
              <div>• Visa Application Assistance</div>
              <div>• Document Preparation</div>
              <div>• Pre-departure Guidance</div>
              <div>• Post-arrival Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 border-t pt-6">
        <p>This report was generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
        <p className="mt-1">© 2025 Alpine Education & Visa Services. All rights reserved.</p>
      </div>
    </div>
  );

  const renderCareerContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center border-b pb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            <Target className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Alpine Education & Visa Services</h1>
            <p className="text-gray-600">Career Path Analysis Report</p>
          </div>
        </div>
      </div>

      {/* Student Info */}
      {studentName && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Student Information</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Name:</span> {studentName}
            </div>
            <div>
              <span className="font-medium">Email:</span> {studentEmail}
            </div>
            <div>
              <span className="font-medium">Report Date:</span> {new Date().toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium">Report Type:</span> Career Path Analysis
            </div>
          </div>
        </div>
      )}

      {/* Top Career */}
      {data[0] && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-900">{data[0].career}</h3>
                <p className="text-purple-700">Your #1 Recommended Career Path</p>
              </div>
            </div>
            <Badge className="bg-purple-600 text-white">Top Match</Badge>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-3 rounded">
              <div className="font-medium text-gray-700">Match Score</div>
              <div className="text-2xl font-bold text-purple-600">{data[0].score}/24</div>
            </div>
            <div className="bg-white p-3 rounded">
              <div className="font-medium text-gray-700">Demand</div>
              <div className="text-2xl font-bold text-green-600">{data[0].demand}</div>
            </div>
            <div className="bg-white p-3 rounded">
              <div className="font-medium text-gray-700">Growth</div>
              <div className="text-2xl font-bold text-blue-600">{data[0].growth}</div>
            </div>
          </div>
        </div>
      )}

      {/* Career Details */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Career Analysis</h3>
        <div className="space-y-4">
          {data.map((career: any, index: number) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold text-purple-600">{index + 1}</span>
                  </div>
                  <h4 className="text-lg font-semibold">{career.career}</h4>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{career.score}/24</div>
                  <div className="text-sm text-gray-500">Match Score</div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{career.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-gray-700 mb-2">Pros</div>
                  <ul className="space-y-1">
                    {career.pros?.slice(0, 3).map((pro: string, i: number) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-gray-700 mb-2">Requirements</div>
                  <div className="space-y-1">
                    <div><span className="font-medium">Education:</span> {career.requirements.education}</div>
                    <div><span className="font-medium">Salary:</span> {career.requirements.salary}</div>
                    <div><span className="font-medium">Growth:</span> {career.growth}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
        <div className="space-y-3">
          {data[0]?.nextSteps?.map((step: string, index: number) => (
            <div key={index} className="flex items-start">
              <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                {index + 1}
              </div>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderApplicationContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center border-b pb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <GraduationCap className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Alpine Education & Visa Services</h1>
            <p className="text-gray-600">Application Summary Report</p>
          </div>
        </div>
      </div>

      {/* Application Details */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Application Overview</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Student Information</h3>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Name:</span> {data.studentName || "N/A"}</div>
              <div><span className="font-medium">Email:</span> {data.email || "N/A"}</div>
              <div><span className="font-medium">Phone:</span> {data.phone || "N/A"}</div>
              <div><span className="font-medium">Application Date:</span> {new Date().toLocaleDateString()}</div>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Program Details</h3>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">University:</span> {data.university || "N/A"}</div>
              <div><span className="font-medium">Program:</span> {data.program || "N/A"}</div>
              <div><span className="font-medium">Level:</span> {data.level || "N/A"}</div>
              <div><span className="font-medium">Intake:</span> {data.intake || "N/A"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Timeline */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Application Status</h3>
        <div className="space-y-4">
          {[
            { step: "Application Submitted", status: "Completed", date: "Today" },
            { step: "Document Review", status: "In Progress", date: "Next Week" },
            { step: "University Review", status: "Pending", date: "2-3 weeks" },
            { step: "Offer Letter", status: "Pending", date: "4-6 weeks" },
            { step: "Visa Application", status: "Pending", date: "After offer" }
          ].map((item, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                item.status === "Completed" ? "bg-green-100 text-green-600" :
                item.status === "In Progress" ? "bg-blue-100 text-blue-600" :
                "bg-gray-100 text-gray-400"
              }`}>
                {item.status === "Completed" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium">{item.step}</div>
                <div className="text-sm text-gray-500">Expected: {item.date}</div>
              </div>
              <Badge className={
                item.status === "Completed" ? "bg-green-600" :
                item.status === "In Progress" ? "bg-blue-600" :
                "bg-gray-400"
              }>
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">What&apos;s Next?</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              1
            </div>
            <div>
              <div className="font-medium">Document Verification</div>
              <div className="text-sm text-gray-600">We&apos;ll review all submitted documents within 3-5 business days</div>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              2
            </div>
            <div>
              <div className="font-medium">University Submission</div>
              <div className="text-sm text-gray-600">Your application will be submitted to the university</div>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              3
            </div>
            <div>
              <div className="font-medium">Regular Updates</div>
              <div className="text-sm text-gray-600">You&apos;ll receive regular updates on your application status</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOfferPackageContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center border-b pb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <GraduationCap className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Alpine Education & Visa Services</h1>
            <p className="text-gray-600">Official Offer Package</p>
          </div>
        </div>
      </div>

      {/* Student & Application Info */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Student & Application Details</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="font-medium">Name:</span> {data.studentName || "N/A"}</div>
          <div><span className="font-medium">Email:</span> {data.studentEmail || "N/A"}</div>
          <div><span className="font-medium">University:</span> {data.university || "N/A"}</div>
          <div><span className="font-medium">Program:</span> {data.program || "N/A"}</div>
          <div><span className="font-medium">Level:</span> {data.level || "N/A"}</div>
          <div><span className="font-medium">Intake:</span> {data.intake || "N/A"}</div>
        </div>
      </div>

      {/* Fee Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Fee Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="font-medium">Tuition Fee:</span> {data.tuitionFee || "TBD"}</div>
          <div><span className="font-medium">Living Costs:</span> {data.livingCosts || "TBD"}</div>
          <div><span className="font-medium">Other Fees:</span> {data.otherFees || "TBD"}</div>
          <div><span className="font-medium">Total (Est.):</span> {data.totalCost || "TBD"}</div>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Checklist</h3>
        <ul className="list-disc pl-6 text-sm space-y-1">
          {(data.checklist || [
            "Submit all academic transcripts",
            "Upload English proficiency certificate",
            "Provide passport copy",
            "Pay application fee",
            "Complete financial documents",
          ]).map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Payment CTA */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold mb-4">Next Step: Pay Application Fee</h3>
        <p className="mb-4">To proceed, please pay the application fee using the link below:</p>
        <a
          href={data.paymentLink || "#"}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Pay Now
        </a>
      </div>

      {/* Timeline to Fly */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Timeline to Fly</h3>
        <ol className="list-decimal pl-6 text-sm space-y-1">
          {(data.timeline || [
            "Application Submission",
            "Document Verification",
            "University Review",
            "Offer Letter Issued",
            "Visa Application",
            "Pre-departure Orientation",
            "Fly to Destination",
          ]).map((step: string, i: number) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Generate PDF Report
        </CardTitle>
        <CardDescription>
          Create a professional PDF report for {type === "quiz" ? "quiz results" : type === "career" ? "career analysis" : type === "offerPackage" ? "offer package" : "application summary"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Preview */}
        <div className="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
          {type === "quiz" && renderQuizContent()}
          {type === "career" && renderCareerContent()}
          {type === "application" && renderApplicationContent()}
          {type === "offerPackage" && renderOfferPackageContent()}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button 
            onClick={generatePDF} 
            disabled={isGenerating}
            className="flex-1"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </>
            )}
          </Button>
          
          {studentEmail && (
            <Button 
              onClick={sendPDF} 
              disabled={isSending}
              variant="outline"
            >
              {isSending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </>
              )}
            </Button>
          )}
          
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>

        <div className="text-sm text-gray-500 text-center">
          PDF will include comprehensive analysis and recommendations
        </div>
      </CardContent>
    </Card>
  );
}
