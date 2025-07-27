"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Filter, 
  MapPin, 
  GraduationCap, 
  DollarSign, 
  Calendar,
  Star,
  BookOpen,
  Users,
  Globe,
  ArrowRight,
  Heart,
  HeartOff
} from "lucide-react";
import Image from "next/image";
import { FirebaseService, COLLECTIONS } from "@/lib/firebase-collections";

interface University {
  id: string;
  name: string;
  logo: string;
  country: string;
  city: string;
  programs: Program[];
  ranking?: number;
  website: string;
}

interface Program {
  id: string;
  name: string;
  level: "Bachelor's Degree" | "Master's Degree" | "PhD" | "Diploma" | "Certificate";
  field: string;
  duration: string;
  tuitionFee: number;
  currency: string;
  intake: string[];
  requirements: {
    minGPA: number;
    ielts: string;
    pte: string;
    toefl: string;
    academicBackground: string;
    workGapPolicy: string;
    documents: string[];
  };
  scholarships: Scholarship[];
  workRights: string;
  stayBack: string;
}

interface Scholarship {
  name: string;
  amount: number;
  currency: string;
  type: "Merit" | "Need" | "Country" | "University";
  requirements: string;
}

interface Filters {
  search: string;
  country: string;
  level: string;
  field: string;
  intake: string;
  tuitionRange: [number, number];
  hasScholarship: boolean;
}

export default function UniversityExplorer() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    country: "",
    level: "",
    field: "",
    intake: "",
    tuitionRange: [0, 100000],
    hasScholarship: false
  });
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<{universityId: string, programId: string} | null>(null);

  const countries = ["All Countries", "Australia", "Canada", "UK", "USA", "Germany", "Ireland", "Netherlands"];
  const levels = ["All Levels", "Bachelor's Degree", "Master's Degree", "PhD", "Diploma", "Certificate"];
  const fields = ["All Fields", "Computer Science", "Information Technology", "Business", "Engineering", "Arts", "Medicine"];
  const intakes = ["All Intakes", "February", "July", "September", "October", "January"];

  useEffect(() => {
    async function fetchUniversities() {
      // Fetch from Firestore (adjust collection as needed)
      const firestoreUniversities = await FirebaseService.getDocuments<any>("universities");
      setUniversities(firestoreUniversities);
      setFilteredUniversities(firestoreUniversities);
    }
    fetchUniversities();
  }, []);

  useEffect(() => {
    let filtered = universities;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(uni => 
        uni.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        uni.programs.some(prog => 
          prog.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          prog.field.toLowerCase().includes(filters.search.toLowerCase())
        )
      );
    }

    // Country filter
    if (filters.country && filters.country !== "All Countries") {
      filtered = filtered.filter(uni => uni.country === filters.country);
    }

    // Level filter
    if (filters.level && filters.level !== "All Levels") {
      filtered = filtered.map(uni => ({
        ...uni,
        programs: uni.programs.filter(prog => prog.level === filters.level)
      })).filter(uni => uni.programs.length > 0);
    }

    // Field filter
    if (filters.field && filters.field !== "All Fields") {
      filtered = filtered.map(uni => ({
        ...uni,
        programs: uni.programs.filter(prog => prog.field === filters.field)
      })).filter(uni => uni.programs.length > 0);
    }

    // Intake filter
    if (filters.intake && filters.intake !== "All Intakes") {
      filtered = filtered.map(uni => ({
        ...uni,
        programs: uni.programs.filter(prog => prog.intake.includes(filters.intake))
      })).filter(uni => uni.programs.length > 0);
    }

    // Tuition range filter
    filtered = filtered.map(uni => ({
      ...uni,
      programs: uni.programs.filter(prog => 
        prog.tuitionFee >= filters.tuitionRange[0] && prog.tuitionFee <= filters.tuitionRange[1]
      )
    })).filter(uni => uni.programs.length > 0);

    // Scholarship filter
    if (filters.hasScholarship) {
      filtered = filtered.map(uni => ({
        ...uni,
        programs: uni.programs.filter(prog => prog.scholarships.length > 0)
      })).filter(uni => uni.programs.length > 0);
    }

    setFilteredUniversities(filtered);
  }, [filters, universities]);

  const toggleShortlist = (universityId: string) => {
    setShortlist((prev: string[]) => 
      prev.includes(universityId) 
        ? prev.filter(id => id !== universityId)
        : [...prev, universityId]
    );
  };

  const handleApply = (universityId: string, programId: string) => {
    setSelectedProgram({ universityId, programId });
    // This would trigger the application flow
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "Bachelor's Degree":
        return <GraduationCap className="w-4 h-4" />;
      case "Master's Degree":
        return <BookOpen className="w-4 h-4" />;
      case "PhD":
        return <Users className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">University Explorer</h2>
          <p className="text-gray-600">Find and apply to your dream university</p>
        </div>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {filteredUniversities.length} universities found
        </Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search universities, programs, or fields..."
              value={filters.search}
              onChange={(e) => setFilters((prev: Filters) => ({ ...prev, search: e.target.value }))}
              className="pl-10"
            />
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select value={filters.country} onValueChange={(value) => setFilters((prev: Filters) => ({ ...prev, country: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.level} onValueChange={(value) => setFilters((prev: Filters) => ({ ...prev, level: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.field} onValueChange={(value) => setFilters((prev: Filters) => ({ ...prev, field: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select Field" />
              </SelectTrigger>
              <SelectContent>
                {fields.map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.intake} onValueChange={(value) => setFilters((prev: Filters) => ({ ...prev, intake: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select Intake" />
              </SelectTrigger>
              <SelectContent>
                {intakes.map((intake) => (
                  <SelectItem key={intake} value={intake}>
                    {intake}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tuition Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tuition Fee Range</label>
            <Slider
              value={filters.tuitionRange}
              onValueChange={(value) => setFilters((prev: Filters) => ({ ...prev, tuitionRange: value as [number, number] }))}
              max={100000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${filters.tuitionRange[0].toLocaleString()}</span>
              <span>${filters.tuitionRange[1].toLocaleString()}</span>
            </div>
          </div>

          {/* Scholarship Filter */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="scholarship"
              checked={filters.hasScholarship}
              onChange={(e) => setFilters((prev: Filters) => ({ ...prev, hasScholarship: e.target.checked }))}
            />
            <label htmlFor="scholarship" className="text-sm font-medium">
              Show only universities with scholarships
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Universities Grid */}
      <div className="grid gap-6">
        {filteredUniversities.map((university) => (
          <Card key={university.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{university.name}</h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{university.city}, {university.country}</span>
                      {university.ranking && (
                        <>
                          <span>•</span>
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>#{university.ranking} in World</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleShortlist(university.id)}
                  >
                    {shortlist.includes(university.id) ? (
                      <Heart className="w-5 h-5 text-red-500 fill-current" />
                    ) : (
                      <HeartOff className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Programs */}
              <div className="space-y-4">
                {university.programs.map((program) => (
                  <div key={program.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{program.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            {getLevelIcon(program.level)}
                            {program.level}
                          </span>
                          <span>•</span>
                          <span>{program.duration}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {program.currency} {program.tuitionFee.toLocaleString()}/year
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleApply(university.id, program.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Apply Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>

                    {/* Requirements Preview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Min GPA:</span>
                        <span className="ml-1">{program.requirements.minGPA}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">IELTS:</span>
                        <span className="ml-1">{program.requirements.ielts}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Intake:</span>
                        <span className="ml-1">{program.intake.join(", ")}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Work Rights:</span>
                        <span className="ml-1">{program.workRights}</span>
                      </div>
                    </div>

                    {/* Scholarships */}
                    {program.scholarships.length > 0 && (
                      <div className="mt-3">
                        <span className="text-sm font-medium text-green-700">Available Scholarships:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {program.scholarships.map((scholarship, index) => (
                            <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                              {scholarship.name} - {scholarship.currency} {scholarship.amount.toLocaleString()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredUniversities.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">No universities found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 