"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Gift,
  CheckCircle,
  Share2,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";
import { useToast } from "@/components/ui/toast-provider";

interface ReferralData {
  referrerName: string;
  referrerEmail: string;
  referrerPhone: string;
  friendName: string;
  friendEmail: string;
  friendPhone: string;
  friendInterests: string;
  relationship: string;
  message: string;
}

export default function ReferralForm() {
  const [referralData, setReferralData] = useState<ReferralData>({
    referrerName: "",
    referrerEmail: "",
    referrerPhone: "",
    friendName: "",
    friendEmail: "",
    friendPhone: "",
    friendInterests: "",
    relationship: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      addToast({
        title: "Referral Submitted!",
        description:
          "Thank you for referring your friend. You&apos;ll receive Rs. 1,000 discount on your processing fee once they enroll.",
        variant: "success",
      });

      // Reset form
      setReferralData({
        referrerName: "",
        referrerEmail: "",
        referrerPhone: "",
        friendName: "",
        friendEmail: "",
        friendPhone: "",
        friendInterests: "",
        relationship: "",
        message: "",
      });
    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to submit referral. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ReferralData, value: string) => {
    setReferralData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Gift className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Refer a Friend & Earn Rewards
          </h1>
        </div>
        <p className="text-lg text-gray-600 mb-4">
          Help your friends achieve their study abroad dreams and earn exclusive
          rewards!
        </p>
        <div className="flex items-center justify-center gap-6">
          <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
            <Gift className="h-4 w-4 mr-1" />
            Rs. 1,000 Discount
          </Badge>
          <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
            <CheckCircle className="h-4 w-4 mr-1" />
            Free Consultation
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Benefits Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-green-600" />
              Your Rewards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">
                  Rs. 1,000 Processing Fee Discount
                </p>
                <p className="text-sm text-green-700">
                  Applied to your next application
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">
                  Free Consultation Session
                </p>
                <p className="text-sm text-blue-700">
                  30-minute expert guidance
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium text-purple-900">Priority Support</p>
                <p className="text-sm text-purple-700">Faster response times</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referral Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Refer Your Friend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Your Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Your Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="referrerName">Your Full Name *</Label>
                    <Input
                      id="referrerName"
                      value={referralData.referrerName}
                      onChange={(e) =>
                        handleInputChange("referrerName", e.target.value)
                      }
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="referrerEmail">Your Email *</Label>
                    <Input
                      id="referrerEmail"
                      type="email"
                      value={referralData.referrerEmail}
                      onChange={(e) =>
                        handleInputChange("referrerEmail", e.target.value)
                      }
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="referrerPhone">Your Phone *</Label>
                    <Input
                      id="referrerPhone"
                      type="tel"
                      value={referralData.referrerPhone}
                      onChange={(e) =>
                        handleInputChange("referrerPhone", e.target.value)
                      }
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="relationship">
                      Relationship with Friend *
                    </Label>
                    <select
                      id="relationship"
                      value={referralData.relationship}
                      onChange={(e) =>
                        handleInputChange("relationship", e.target.value)
                      }
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select relationship</option>
                      <option value="friend">Friend</option>
                      <option value="classmate">Classmate</option>
                      <option value="colleague">Colleague</option>
                      <option value="family">Family Member</option>
                      <option value="neighbor">Neighbor</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Friend's Information */}
              <div>
                                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Friend&apos;s Information
                  </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="friendName">Friend&apos;s Full Name *</Label>
                    <Input
                      id="friendName"
                      value={referralData.friendName}
                      onChange={(e) =>
                        handleInputChange("friendName", e.target.value)
                      }
                      required
                      placeholder="Enter friend&apos;s full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="friendEmail">Friend&apos;s Email *</Label>
                    <Input
                      id="friendEmail"
                      type="email"
                      value={referralData.friendEmail}
                      onChange={(e) =>
                        handleInputChange("friendEmail", e.target.value)
                      }
                      required
                      placeholder="Enter friend&apos;s email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="friendPhone">Friend&apos;s Phone *</Label>
                    <Input
                      id="friendPhone"
                      type="tel"
                      value={referralData.friendPhone}
                      onChange={(e) =>
                        handleInputChange("friendPhone", e.target.value)
                      }
                      required
                      placeholder="Enter friend&apos;s phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="friendInterests">Study Interests</Label>
                    <Input
                      id="friendInterests"
                      value={referralData.friendInterests}
                      onChange={(e) =>
                        handleInputChange("friendInterests", e.target.value)
                      }
                      placeholder="e.g., Computer Science, Business, Engineering"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message">Personal Message (Optional)</Label>
                <Textarea
                  id="message"
                  value={referralData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell us why you think Alpine Education would be perfect for your friend..."
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4 mr-2" />
                    Submit Referral & Earn Rewards
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Terms */}
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>
          * Rewards are valid for 6 months from the date of referral. Friend
          must enroll within 3 months of referral to qualify for rewards.
        </p>
      </div>
    </div>
  );
}
