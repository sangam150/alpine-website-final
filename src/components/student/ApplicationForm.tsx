"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Upload,
  Calendar
} from "lucide-react";
import { FirebaseService, COLLECTIONS, Student as FirestoreStudent } from "@/lib/firebase-collections";

interface StudentProfile {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  currentEducation: {
    level: string;
    institution: string;
    field: string;
    gpa: number;
    completionDate: string;
  };
  englishTest: {
    type: string;
    score: string;
    expiryDate: string;
  };
  workExperience: {
    hasExperience: boolean;
    years: number;
    field: string;
  };
  documents: {
    academicTranscripts: boolean;
    englishTest: boolean;
    passport: boolean;
    sop: boolean;
    cv: boolean;
    lettersOfRecommendation: boolean;
    financialDocuments: boolean;
  };
}

interface ApplicationData {
  universityId: string;
  programId: string;
  intake: string;
  studentProfile: StudentProfile;
  additionalInfo: {
    statementOfPurpose: string;
    researchInterests: string;
    careerGoals: string;
    whyThisUniversity: string;
    fundingSource: string;
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
      email: string;
    };
  };
  termsAccepted: boolean;
}

interface ApplicationFormProps {
  universityId: string;
  programId: string;
  onComplete: (application: ApplicationData) => void;
  onBack: () => void;
}

export default function ApplicationForm({ universityId, programId, onComplete, onBack }: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchStudentProfile() {
      // TODO: Replace with actual student UID from auth context
      const studentUid = "demo-student-uid";
      const firestoreStudents = await FirebaseService.getDocuments<FirestoreStudent>(COLLECTIONS.STUDENTS, [
        { field: "uid", operator: "==", value: studentUid }
      ]);
      const student = firestoreStudents[0];
      if (student) {
        const profile: StudentProfile = {
          name: `${student.firstName} ${student.lastName}`,
          email: student.email,
          phone: student.phone || "",
          dateOfBirth: student.dateOfBirth || "",
          nationality: student.nationality || "",
          passportNumber: student.passportNumber || "",
          currentEducation: {
            level: "",
            institution: "",
            field: "",
            gpa: 0,
            completionDate: ""
          },
          englishTest: {
            type: "",
            score: "",
            expiryDate: ""
          },
          workExperience: {
            hasExperience: false,
            years: 0,
            field: ""
          },
          documents: {
            academicTranscripts: false,
            englishTest: false,
            passport: false,
            sop: false,
            cv: false,
            lettersOfRecommendation: false,
            financialDocuments: false
          }
        };
        setApplicationData({
          universityId,
          programId,
          intake: "",
          studentProfile: profile,
          additionalInfo: {
            statementOfPurpose: "",
            researchInterests: "",
            careerGoals: "",
            whyThisUniversity: "",
            fundingSource: "",
            emergencyContact: {
              name: "",
              relationship: "",
              phone: "",
              email: ""
            }
          },
          termsAccepted: false
        });
      }
    }
    fetchStudentProfile();
  }, [universityId, programId]);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!applicationData?.intake) {
          errors.intake = "Please select an intake";
        }
        break;
      case 2:
        if (!applicationData?.additionalInfo.statementOfPurpose) {
          errors.statementOfPurpose = "Statement of Purpose is required";
        }
        if (!applicationData?.additionalInfo.careerGoals) {
          errors.careerGoals = "Career goals are required";
        }
        if (!applicationData?.additionalInfo.whyThisUniversity) {
          errors.whyThisUniversity = "Please explain why you chose this university";
        }
        break;
      case 3:
        if (!applicationData?.additionalInfo.emergencyContact.name) {
          errors.emergencyContactName = "Emergency contact name is required";
        }
        if (!applicationData?.additionalInfo.emergencyContact.phone) {
          errors.emergencyContactPhone = "Emergency contact phone is required";
        }
        break;
      case 4:
        if (!applicationData?.termsAccepted) {
          errors.terms = "You must accept the terms and conditions";
        }
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      onComplete(applicationData!);
    } catch (error) {
      console.error("Application submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMissingDocuments = () => {
    const missing = [];
    if (!applicationData?.studentProfile.documents.sop) missing.push("Statement of Purpose");
    if (!applicationData?.studentProfile.documents.lettersOfRecommendation) missing.push("Letters of Recommendation");
    if (!applicationData?.studentProfile.documents.financialDocuments) missing.push("Financial Documents");
    return missing;
  };

  const missingDocuments = getMissingDocuments();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Explorer
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Application Form</h2>
            <p className="text-gray-600">Complete your university application</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          Step {currentStep} of {totalSteps}
        </Badge>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Application Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Step 1: Intake Selection</span>
              <span>Step 2: Personal Statement</span>
              <span>Step 3: Emergency Contact</span>
              <span>Step 4: Review & Submit</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Steps */}
      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Step 1: Intake Selection</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="intake">Preferred Intake *</Label>
                    <Select 
                      value={applicationData?.intake} 
                      onValueChange={(value) => setApplicationData((prev) => prev && prev.universityId && prev.programId ? { ...prev, intake: value } : prev)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your preferred intake" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="February 2025">February 2025</SelectItem>
                        <SelectItem value="July 2025">July 2025</SelectItem>
                        <SelectItem value="September 2025">September 2025</SelectItem>
                        <SelectItem value="October 2025">October 2025</SelectItem>
                      </SelectContent>
                    </Select>
                    {validationErrors.intake && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.intake}</p>
                    )}
                  </div>

                  {/* Student Profile Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Student Profile Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Name:</span> {applicationData?.studentProfile.name}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span> {applicationData?.studentProfile.email}
                      </div>
                      <div>
                        <span className="font-medium">Current Education:</span> {applicationData?.studentProfile.currentEducation.level} in {applicationData?.studentProfile.currentEducation.field}
                      </div>
                      <div>
                        <span className="font-medium">GPA:</span> {applicationData?.studentProfile.currentEducation.gpa}
                      </div>
                      <div>
                        <span className="font-medium">English Test:</span> {applicationData?.studentProfile.englishTest.type} {applicationData?.studentProfile.englishTest.score}
                      </div>
                      <div>
                        <span className="font-medium">Work Experience:</span> {applicationData?.studentProfile.workExperience.hasExperience ? `${applicationData?.studentProfile.workExperience.years} years` : "None"}
                      </div>
                    </div>
                  </div>

                  {/* Document Checklist */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Document Checklist
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(applicationData?.studentProfile.documents || {}).map(([doc, uploaded]) => (
                        <div key={doc} className="flex items-center gap-2">
                          {uploaded ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-yellow-600" />
                          )}
                          <span className={`text-sm ${uploaded ? 'text-green-700' : 'text-yellow-700'}`}>
                            {doc.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                        </div>
                      ))}
                    </div>
                    {missingDocuments.length > 0 && (
                      <div className="mt-3 p-3 bg-yellow-100 rounded-lg">
                        <p className="text-sm text-yellow-800 font-medium">Missing Documents:</p>
                        <ul className="text-sm text-yellow-700 mt-1">
                          {missingDocuments.map(doc => (
                            <li key={doc}>• {doc}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Step 2: Personal Statement & Additional Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="sop">Statement of Purpose *</Label>
                    <Textarea
                      id="sop"
                      placeholder="Write your statement of purpose (500-1000 words)..."
                      value={applicationData?.additionalInfo.statementOfPurpose}
                      onChange={(e) => setApplicationData((prev) => prev && prev.universityId && prev.programId ? { ...prev, additionalInfo: { ...prev.additionalInfo, statementOfPurpose: e.target.value } } : prev)}
                      rows={6}
                    />
                    {validationErrors.statementOfPurpose && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.statementOfPurpose}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="careerGoals">Career Goals *</Label>
                    <Textarea
                      id="careerGoals"
                      placeholder="Describe your career goals and how this program will help you achieve them..."
                      value={applicationData?.additionalInfo.careerGoals}
                      onChange={(e) => setApplicationData((prev) => prev && prev.universityId && prev.programId ? { ...prev, additionalInfo: { ...prev.additionalInfo, careerGoals: e.target.value } } : prev)}
                      rows={4}
                    />
                    {validationErrors.careerGoals && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.careerGoals}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="whyUniversity">Why This University? *</Label>
                    <Textarea
                      id="whyUniversity"
                      placeholder="Explain why you chose this specific university and program..."
                      value={applicationData?.additionalInfo.whyThisUniversity}
                      onChange={(e) => setApplicationData((prev) => prev && prev.universityId && prev.programId ? { ...prev, additionalInfo: { ...prev.additionalInfo, whyThisUniversity: e.target.value } } : prev)}
                      rows={4}
                    />
                    {validationErrors.whyThisUniversity && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.whyThisUniversity}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="fundingSource">Funding Source</Label>
                    <Select 
                      value={applicationData?.additionalInfo.fundingSource} 
                      onValueChange={(value) => setApplicationData((prev) => prev && prev.universityId && prev.programId ? { ...prev, additionalInfo: { ...prev.additionalInfo, fundingSource: value } } : prev)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your funding source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Self-funded">Self-funded</SelectItem>
                        <SelectItem value="Family Support">Family Support</SelectItem>
                        <SelectItem value="Scholarship">Scholarship</SelectItem>
                        <SelectItem value="Bank Loan">Bank Loan</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Step 3: Emergency Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyName">Emergency Contact Name *</Label>
                    <Input
                      id="emergencyName"
                      value={applicationData?.additionalInfo.emergencyContact.name}
                      onChange={(e) => setApplicationData((prev) => prev && prev.universityId && prev.programId ? { ...prev, additionalInfo: { ...prev.additionalInfo, emergencyContact: { ...prev.additionalInfo.emergencyContact, name: e.target.value } } } : prev)}
                    />
                    {validationErrors.emergencyContactName && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.emergencyContactName}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="emergencyRelationship">Relationship *</Label>
                    <Select 
                      value={applicationData?.additionalInfo.emergencyContact.relationship} 
                      onValueChange={(value) => setApplicationData((prev) => prev && prev.universityId && prev.programId ? { ...prev, additionalInfo: { ...prev.additionalInfo, emergencyContact: { ...prev.additionalInfo.emergencyContact, relationship: value } } } : prev)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Parent">Parent</SelectItem>
                        <SelectItem value="Spouse">Spouse</SelectItem>
                        <SelectItem value="Sibling">Sibling</SelectItem>
                        <SelectItem value="Friend">Friend</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                    <Input
                      id="emergencyPhone"
                      value={applicationData?.additionalInfo.emergencyContact.phone}
                      onChange={(e) => setApplicationData((prev) => prev && prev.universityId && prev.programId ? { ...prev, additionalInfo: { ...prev.additionalInfo, emergencyContact: { ...prev.additionalInfo.emergencyContact, phone: e.target.value } } } : prev)}
                    />
                    {validationErrors.emergencyContactPhone && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.emergencyContactPhone}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="emergencyEmail">Emergency Contact Email</Label>
                    <Input
                      id="emergencyEmail"
                      type="email"
                      value={applicationData?.additionalInfo.emergencyContact.email}
                      onChange={(e) => setApplicationData((prev) => prev && prev.universityId && prev.programId ? { ...prev, additionalInfo: { ...prev.additionalInfo, emergencyContact: { ...prev.additionalInfo.emergencyContact, email: e.target.value } } } : prev)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Step 4: Review & Submit</h3>
                
                {/* Application Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium mb-3">Application Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">University:</span> University of Melbourne
                    </div>
                    <div>
                      <span className="font-medium">Program:</span> Master of Computer Science
                    </div>
                    <div>
                      <span className="font-medium">Intake:</span> {applicationData?.intake}
                    </div>
                    <div>
                      <span className="font-medium">Student:</span> {applicationData?.studentProfile.name}
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={applicationData?.termsAccepted}
                      onChange={(e) => setApplicationData((prev) => prev && prev.universityId && prev.programId ? { ...prev, termsAccepted: e.target.checked } : prev)}
                    />
                    <div className="text-sm">
                      <label htmlFor="terms" className="font-medium">
                        I accept the terms and conditions *
                      </label>
                      <p className="text-gray-600 mt-1">
                        I confirm that all information provided is accurate and complete. I understand that 
                        false statements may result in the rejection of my application or dismissal from the program.
                      </p>
                    </div>
                  </div>
                  {validationErrors.terms && (
                    <p className="text-red-500 text-sm">{validationErrors.terms}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={nextStep}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 