import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CurriculumData {
  courseName: string;
  description: string;
  duration: string;
  entryRequirements: string[];
  modules: string[];
}

export default function CurriculumViewer({ curriculum }: { curriculum: CurriculumData }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">View Curriculum</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{curriculum.courseName} Curriculum</DialogTitle>
        </DialogHeader>
        <div className="mb-4 text-gray-700">{curriculum.description}</div>
        <div className="mb-2"><span className="font-medium">Duration:</span> {curriculum.duration}</div>
        <div className="mb-2">
          <span className="font-medium">Entry Requirements:</span>
          <ul className="list-disc pl-6 text-sm">
            {curriculum.entryRequirements.map((req, i) => <li key={i}>{req}</li>)}
          </ul>
        </div>
        <div>
          <span className="font-medium">Modules:</span>
          <ul className="list-decimal pl-6 text-sm">
            {curriculum.modules.map((mod, i) => <li key={i}>{mod}</li>)}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
} 