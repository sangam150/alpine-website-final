import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const universityRules = [
  {
    name: "Top University (Australia, Canada, UK)",
    minGPA: 3.0,
    minIELTS: 6.5,
  },
  {
    name: "Standard University (USA, Ireland, NZ)",
    minGPA: 2.5,
    minIELTS: 6.0,
  },
  {
    name: "Foundation/Pathway Program",
    minGPA: 2.0,
    minIELTS: 5.5,
  },
];

export default function EligibilityEstimator() {
  const [open, setOpen] = useState(false);
  const [gpa, setGpa] = useState("");
  const [ielts, setIelts] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState("");

  const checkEligibility = () => {
    setError("");
    const gpaNum = parseFloat(gpa);
    const ieltsNum = parseFloat(ielts);
    if (isNaN(gpaNum) || isNaN(ieltsNum)) {
      setError("Please enter valid numbers for GPA and IELTS.");
      setResults([]);
      return;
    }
    const eligible = universityRules.filter(
      (u) => gpaNum >= u.minGPA && ieltsNum >= u.minIELTS
    );
    if (eligible.length === 0) {
      setResults(["No direct university options. Consider a foundation or language program."]);
    } else {
      setResults(eligible.map((u) => u.name));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Check Eligibility</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>AI-Powered Eligibility Estimator</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">GPA (out of 4.0)</label>
              <Input value={gpa} onChange={e => setGpa(e.target.value)} placeholder="e.g. 3.2" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">IELTS Score</label>
              <Input value={ielts} onChange={e => setIelts(e.target.value)} placeholder="e.g. 6.5" />
            </div>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <Button onClick={checkEligibility} className="w-full">Check</Button>
          {results.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-2">
              <div className="font-medium mb-2">Eligible Options:</div>
              <ul className="list-disc pl-6 text-sm">
                {results.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 