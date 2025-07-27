'use client'

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CallRequestWidget() {
  const [open, setOpen] = useState(false);
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!name || !phone || !time) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      const db = getFirestore();
      await addDoc(collection(db, "call_requests"), {
        name,
        phone,
        preferredTime: time,
        createdAt: serverTimestamp(),
        status: "pending",
      });
      setSuccess(true);
      setName("");
      setPhone("");
      setTime("");
    } catch (err: any) {
      setError("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg rounded-full px-6 py-3">
            📞 Request a Callback
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md z-[9999] shadow-2xl border-2 border-blue-200">
          <DialogHeader>
            <DialogTitle>Request a Callback</DialogTitle>
          </DialogHeader>
          {success ? (
            <div className="text-green-700 text-center font-medium py-8">
              Thank you! Our team will call you at your preferred time.
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g. +977-98XXXXXXXX" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Preferred Time</label>
                <Input value={time} onChange={e => setTime(e.target.value)} placeholder="e.g. Tomorrow 3pm" />
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Request Callback"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 