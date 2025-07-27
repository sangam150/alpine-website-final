"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  X,
  FileText,
  Image,
  File,
  CheckCircle,
  AlertCircle,
  Eye,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { StudentService, StudentDocument } from "@/lib/student-service";

interface DocumentUploadProps {
  uid: string;
  onUploadComplete: (document: StudentDocument) => void;
  onUploadError: (error: string) => void;
}

const documentCategories = [
  "Academic Transcripts",
  "Language Test Results",
  "Passport Copy",
  "Statement of Purpose",
  "Letter of Recommendation",
  "Financial Documents",
  "CV/Resume",
  "Other",
];

const acceptedFileTypes = {
  "image/*": [".jpg", ".jpeg", ".png", ".gif"],
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "text/plain": [".txt"],
};

interface ValidationIssue {
  type: "error" | "warning";
  message: string;
}

const REQUIRED_DOCS = [
  { name: "IELTS Certificate", accepted: ["IELTS", "TOEFL"], recommend: "If you have PTE, please take IELTS or TOEFL as alternatives." },
  { name: "Academic Transcript", accepted: ["Transcript"], recommend: "Contact your university if you do not have transcripts." },
  // Add more as needed
];

export default function DocumentUpload({
  uid,
  onUploadComplete,
  onUploadError,
}: DocumentUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const validateFile = useCallback(async (file: File): Promise<ValidationIssue[]> => {
    const issues: ValidationIssue[] = [];
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      issues.push({
        type: "error",
        message: `${file.name} is too large. Maximum size is 10MB.`
      });
    }
    
    // Check file type
    const allowedTypes = [
      "image/jpeg", "image/jpg", "image/png", "image/gif",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain"
    ];
    
    if (!allowedTypes.includes(file.type)) {
      issues.push({
        type: "error",
        message: `${file.name} has an unsupported file type.`
      });
    }
    
    // Check for blur in images
    if (file.type.startsWith("image/")) {
      const isBlurry = await checkImageBlur(file);
      if (isBlurry) {
        issues.push({
          type: "warning",
          message: `${file.name} appears to be blurry. Please upload a clearer image.`
        });
      }
    }
    
    // Check for empty files
    if (file.size === 0) {
      issues.push({
        type: "error",
        message: `${file.name} is empty.`
      });
    }
    
    return issues;
  }, []);

  const checkImageBlur = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        if (!imageData) {
          resolve(false);
          return;
        }
        
        // Simple blur detection using variance of pixel differences
        const data = imageData.data;
        let variance = 0;
        let count = 0;
        
        for (let i = 0; i < data.length; i += 4) {
          if (i + 4 < data.length) {
            const diff = Math.abs(data[i] - data[i + 4]) + 
                        Math.abs(data[i + 1] - data[i + 5]) + 
                        Math.abs(data[i + 2] - data[i + 6]);
            variance += diff * diff;
            count++;
          }
        }
        
        const avgVariance = variance / count;
        resolve(avgVariance < 1000); // Threshold for blur detection
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!selectedCategory) {
        onUploadError("Please select a document category first");
        return;
      }

      setSelectedFiles(acceptedFiles);
      setValidationIssues([]);
      
      // Validate all files
      const allIssues: ValidationIssue[] = [];
      for (const file of acceptedFiles) {
        const issues = await validateFile(file);
        allIssues.push(...issues);
      }
      
      setValidationIssues(allIssues);
      
      // Check if there are any errors (not just warnings)
      const hasErrors = allIssues.some(issue => issue.type === "error");
      if (hasErrors) {
        onUploadError("Please fix the validation errors before uploading");
        return;
      }

      setUploading(true);
      setUploadProgress(0);

      try {
        for (const file of acceptedFiles) {
          // Simulate upload progress
          const progressInterval = setInterval(() => {
            setUploadProgress((prev) => {
              if (prev >= 90) {
                clearInterval(progressInterval);
                return 90;
              }
              return prev + 10;
            });
          }, 200);

          const document = await StudentService.uploadDocument(
            uid,
            file,
            selectedCategory,
            description,
          );

          clearInterval(progressInterval);
          setUploadProgress(100);

          onUploadComplete(document);

          // Reset form
          setDescription("");
          setSelectedCategory("");
          setSelectedFiles([]);
          setValidationIssues([]);
        }
      } catch (error: any) {
        onUploadError(error.message || "Upload failed");
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    },
    [uid, selectedCategory, description, onUploadComplete, onUploadError, validateFile],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: acceptedFileTypes,
      maxSize: 10 * 1024 * 1024, // 10MB
      multiple: true,
    });

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <Image className="w-5 h-5" />;
    if (file.type === "application/pdf")
      return <FileText className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  function getRecommendation(docName: string, uploadedDocs: string[]) {
    const req = REQUIRED_DOCS.find((d) => d.name === docName);
    if (!req) return null;
    // If not uploaded, recommend
    if (!uploadedDocs.includes(docName)) return req.recommend;
    // If uploaded but not accepted, recommend
    if (docName === "IELTS Certificate" && uploadedDocs.includes("PTE Certificate")) {
      return req.recommend;
    }
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category Selection */}
        <div>
          <Label htmlFor="category">Document Category</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select document category" />
            </SelectTrigger>
            <SelectContent>
              {documentCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description (Optional)</Label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add any additional notes about this document..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>

        {/* Upload Area */}
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive && !isDragReject ? "border-blue-500 bg-blue-50" : ""}
            ${isDragReject ? "border-red-500 bg-red-50" : ""}
            ${!isDragActive && !isDragReject ? "border-gray-300 hover:border-gray-400" : ""}
            ${uploading ? "pointer-events-none opacity-50" : ""}
          `}
        >
          <input {...getInputProps()} />

          {uploading ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Uploading document...
                </p>
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-xs text-gray-500 mt-1">
                  {uploadProgress}% complete
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 text-gray-400 mx-auto" />
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {isDragActive ? "Drop files here" : "Drag & drop files here"}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  or click to select files
                </p>
              </div>
              <div className="text-xs text-gray-500">
                <p>Supported formats: PDF, DOC, DOCX, JPG, PNG</p>
                <p>Maximum file size: 10MB</p>
              </div>
            </div>
          )}
        </div>

        {/* Upload Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Upload Guidelines:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Ensure documents are clear and legible</li>
            <li>• Use original or certified copies when possible</li>
            <li>• Keep file names descriptive and organized</li>
            <li>
              • Contact your counselor if you need help with document
              preparation
            </li>
          </ul>
        </div>

        {/* Status Messages */}
        {isDragReject && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            Some files were rejected. Please check file types and sizes.
          </div>
        )}

        {/* Validation Issues */}
        {validationIssues.length > 0 && (
          <div className="space-y-2">
            {validationIssues.map((issue, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 p-3 rounded-lg ${
                  issue.type === "error" 
                    ? "bg-red-50 border border-red-200 text-red-800" 
                    : "bg-yellow-50 border border-yellow-200 text-yellow-800"
                }`}
              >
                {issue.type === "error" ? (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                )}
                <span className="text-sm">{issue.message}</span>
              </div>
            ))}
          </div>
        )}

        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            <Label>Selected Files:</Label>
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  {getFileIcon(file)}
                  <span className="text-sm font-medium">{file.name}</span>
                  <span className="text-xs text-gray-500">({formatFileSize(file.size)})</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
                    setValidationIssues(prev => prev.filter((_, i) => i !== index));
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {REQUIRED_DOCS.map((doc) => {
          const rec = getRecommendation(doc.name, selectedFiles.map((f) => f.name));
          return rec ? (
            <div key={doc.name} className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-2 text-yellow-800 rounded">
              <strong>Recommendation:</strong> {rec}
            </div>
          ) : null;
        })}
      </CardContent>
    </Card>
  );
}
