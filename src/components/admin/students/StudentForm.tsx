"use client";
import { useState } from "react";
import { Application, APPLICATION_STATUS } from "@/lib/firebase-collections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  MapPin,
  BookOpen,
  Calendar,
  FileText,
  Upload,
  DollarSign,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

interface Props {
  initial?: Partial<Application>;
  onSave: (data: Partial<Application>) => void;
  onCancel: () => void;
}

export default function StudentForm({ initial, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Partial<Application>>(initial || {});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.studentId?.trim()) {
      newErrors.studentId = "Student ID is required";
    }
    if (!form.countryId?.trim()) {
      newErrors.countryId = "Country is required";
    }
    if (!form.program?.trim()) {
      newErrors.program = "Program is required";
    }
    if (!form.intake?.trim()) {
      newErrors.intake = "Intake is required";
    }
    if (!form.status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(form);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="studentId">Student ID *</Label>
              <Input
                id="studentId"
                placeholder="Enter student ID"
                value={form.studentId || ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, studentId: e.target.value }))
                }
                className={errors.studentId ? "border-red-500" : ""}
              />
              {errors.studentId && (
                <p className="text-sm text-red-500 mt-1">{errors.studentId}</p>
              )}
            </div>

            <div>
              <Label htmlFor="countryId">Country *</Label>
              <Input
                id="countryId"
                placeholder="e.g., Australia, Canada"
                value={form.countryId || ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, countryId: e.target.value }))
                }
                className={errors.countryId ? "border-red-500" : ""}
              />
              {errors.countryId && (
                <p className="text-sm text-red-500 mt-1">{errors.countryId}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="program">Program *</Label>
              <Input
                id="program"
                placeholder="e.g., Masters in Computer Science"
                value={form.program || ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, program: e.target.value }))
                }
                className={errors.program ? "border-red-500" : ""}
              />
              {errors.program && (
                <p className="text-sm text-red-500 mt-1">{errors.program}</p>
              )}
            </div>

            <div>
              <Label htmlFor="intake">Intake *</Label>
              <Input
                id="intake"
                placeholder="e.g., Fall 2024, Spring 2025"
                value={form.intake || ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, intake: e.target.value }))
                }
                className={errors.intake ? "border-red-500" : ""}
              />
              {errors.intake && (
                <p className="text-sm text-red-500 mt-1">{errors.intake}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="status">Status *</Label>
            <select
              id="status"
              value={form.status || ""}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  status: e.target.value as keyof typeof APPLICATION_STATUS,
                }))
              }
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.status ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Status</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="COMPLETED">Completed</option>
            </select>
            {errors.status && (
              <p className="text-sm text-red-500 mt-1">{errors.status}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Financial Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Financial Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="applicationFee">Application Fee</Label>
              <Input
                id="applicationFee"
                type="number"
                placeholder="0"
                value={form.applicationFee || ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    applicationFee: parseFloat(e.target.value) || undefined,
                  }))
                }
              />
            </div>

            <div>
              <Label htmlFor="tuitionFee">Tuition Fee</Label>
              <Input
                id="tuitionFee"
                type="number"
                placeholder="0"
                value={form.tuitionFee || ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    tuitionFee: parseFloat(e.target.value) || undefined,
                  }))
                }
              />
            </div>

            <div>
              <Label htmlFor="scholarshipAmount">Scholarship Amount</Label>
              <Input
                id="scholarshipAmount"
                type="number"
                placeholder="0"
                value={form.scholarshipAmount || ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    scholarshipAmount: parseFloat(e.target.value) || undefined,
                  }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Academic Transcripts</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload transcripts</p>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX (Max 10MB)
                </p>
              </div>
            </div>

            <div>
              <Label>Language Test Results</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload test results</p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Statement of Purpose</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload SOP</p>
                <p className="text-xs text-gray-500">PDF, DOC (Max 5MB)</p>
              </div>
            </div>

            <div>
              <Label>CV/Resume</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload CV</p>
                <p className="text-xs text-gray-500">PDF, DOC (Max 5MB)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Notes & Comments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Add any notes or comments about this application..."
            value={form.notes || ""}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initial ? "Update Application" : "Create Application"}
        </Button>
      </div>
    </form>
  );
}
