"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Settings,
  Globe,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Save,
  RefreshCw,
  Shield,
  Bell,
  Palette,
  Database,
} from "lucide-react";

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  workingHours: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  enableNotifications: boolean;
  enableAnalytics: boolean;
  maintenanceMode: boolean;
  defaultLanguage: string;
  timezone: string;
  autoSyncSheets: boolean;
}

const defaultSettings: SiteSettings = {
  siteName: "Alpine Education",
  siteDescription:
    "Your trusted partner for international education consulting",
  contactEmail: "info@alpineeducation.com",
  contactPhone: "+91 98765 43210",
  address: "123 Education Street, Mumbai, Maharashtra 400001",
  workingHours: "Monday - Friday: 9:00 AM - 6:00 PM",
  facebook: "https://facebook.com/alpineeducation",
  twitter: "https://twitter.com/alpineeducation",
  instagram: "https://instagram.com/alpineeducation",
  linkedin: "https://linkedin.com/company/alpineeducation",
  youtube: "https://youtube.com/alpineeducation",
  enableNotifications: true,
  enableAnalytics: true,
  maintenanceMode: false,
  defaultLanguage: "en",
  timezone: "Asia/Kolkata",
  autoSyncSheets: false,
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({ ...defaultSettings, autoSyncSheets: false });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Show success message
  };

  const handleReset = () => {
    setSettings(defaultSettings);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage site-wide settings and configurations
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) =>
                  setSettings({ ...settings, siteDescription: e.target.value })
                }
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="defaultLanguage">Default Language</Label>
                <select
                  id="defaultLanguage"
                  value={settings.defaultLanguage}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      defaultLanguage: e.target.value,
                    })
                  }
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="gu">Gujarati</option>
                </select>
              </div>

              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <select
                  id="timezone"
                  value={settings.timezone}
                  onChange={(e) =>
                    setSettings({ ...settings, timezone: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                  <option value="America/New_York">
                    America/New_York (EST)
                  </option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) =>
                  setSettings({ ...settings, contactEmail: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                value={settings.contactPhone}
                onChange={(e) =>
                  setSettings({ ...settings, contactPhone: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={settings.address}
                onChange={(e) =>
                  setSettings({ ...settings, address: e.target.value })
                }
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="workingHours">Working Hours</Label>
              <Input
                id="workingHours"
                value={settings.workingHours}
                onChange={(e) =>
                  setSettings({ ...settings, workingHours: e.target.value })
                }
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Facebook className="h-5 w-5 mr-2" />
              Social Media Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="facebook">Facebook URL</Label>
              <Input
                id="facebook"
                value={settings.facebook}
                onChange={(e) =>
                  setSettings({ ...settings, facebook: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="twitter">Twitter URL</Label>
              <Input
                id="twitter"
                value={settings.twitter}
                onChange={(e) =>
                  setSettings({ ...settings, twitter: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="instagram">Instagram URL</Label>
              <Input
                id="instagram"
                value={settings.instagram}
                onChange={(e) =>
                  setSettings({ ...settings, instagram: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                value={settings.linkedin}
                onChange={(e) =>
                  setSettings({ ...settings, linkedin: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="youtube">YouTube URL</Label>
              <Input
                id="youtube"
                value={settings.youtube}
                onChange={(e) =>
                  setSettings({ ...settings, youtube: e.target.value })
                }
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications">Enable Notifications</Label>
                <p className="text-sm text-gray-500">
                  Send email notifications for new leads and appointments
                </p>
              </div>
              <Checkbox
                id="notifications"
                checked={settings.enableNotifications}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    enableNotifications: e.target.checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="analytics">Enable Analytics</Label>
                <p className="text-sm text-gray-500">
                  Track website analytics and user behavior
                </p>
              </div>
              <Checkbox
                id="analytics"
                checked={settings.enableAnalytics}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    enableAnalytics: e.target.checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenance">Maintenance Mode</Label>
                <p className="text-sm text-gray-500">
                  Put the website in maintenance mode
                </p>
              </div>
              <Checkbox
                id="maintenance"
                checked={settings.maintenanceMode}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maintenanceMode: e.target.checked,
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Email Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input
                id="smtpHost"
                placeholder="smtp.gmail.com"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="smtpPort">SMTP Port</Label>
              <Input
                id="smtpPort"
                type="number"
                placeholder="587"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="smtpUser">SMTP Username</Label>
              <Input
                id="smtpUser"
                placeholder="your-email@gmail.com"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="smtpPass">SMTP Password</Label>
              <Input
                id="smtpPass"
                type="password"
                placeholder="••••••••"
                className="mt-1"
              />
            </div>

            <Button variant="outline" className="w-full">
              Test Email Connection
            </Button>
          </CardContent>
        </Card>

        {/* Sheets Sync Toggle */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Google Sheets Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="autoSyncSheets"
                checked={settings.autoSyncSheets}
                onChange={e => setSettings({ ...settings, autoSyncSheets: e.target.checked })}
              />
              <label htmlFor="autoSyncSheets" className="text-sm font-medium">
                Auto-Sync Leads & Progress to Google Sheets
              </label>
            </div>
            <div className="text-xs text-gray-500">
              {settings.autoSyncSheets ? "Auto-sync is enabled. New leads and progress updates will be pushed to Google Sheets." : "Auto-sync is disabled. You can export manually from the admin panel."}
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                defaultValue={30}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
              <Input
                id="maxLoginAttempts"
                type="number"
                defaultValue={5}
                className="mt-1"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="twoFactor">
                  Enable Two-Factor Authentication
                </Label>
                <p className="text-sm text-gray-500">
                  Require 2FA for admin accounts
                </p>
              </div>
              <Checkbox id="twoFactor" />
            </div>

            <Button variant="outline" className="w-full">
              Change Admin Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
