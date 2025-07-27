"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  User,
  FileText,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Filter,
  Download,
  Search,
} from "lucide-react";

interface ActivityLogEntry {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  resource: string;
  details: string;
  type: "create" | "update" | "delete" | "view" | "login" | "upload";
  ipAddress?: string;
  userAgent?: string;
}

const sampleLogs: ActivityLogEntry[] = [
  {
    id: "1",
    timestamp: new Date("2025-01-15T10:30:00"),
    user: "admin@alpine.edu.np",
    action: "Updated",
    resource: "Blog Post",
    details: 'Updated "Study in Australia 2025" blog post',
    type: "update",
    ipAddress: "192.168.1.100",
  },
  {
    id: "2",
    timestamp: new Date("2025-01-15T09:15:00"),
    user: "counselor@alpine.edu.np",
    action: "Created",
    resource: "Student Application",
    details: "Added new student application for Ram Kumar",
    type: "create",
    ipAddress: "192.168.1.101",
  },
  {
    id: "3",
    timestamp: new Date("2025-01-15T08:45:00"),
    user: "admin@alpine.edu.np",
    action: "Uploaded",
    resource: "Document",
    details: "Uploaded IELTS certificate for student ID: STU001",
    type: "upload",
    ipAddress: "192.168.1.100",
  },
  {
    id: "4",
    timestamp: new Date("2025-01-14T16:20:00"),
    user: "student@example.com",
    action: "Logged in",
    resource: "Student Portal",
    details: "Student portal login successful",
    type: "login",
    ipAddress: "203.45.67.89",
  },
  {
    id: "5",
    timestamp: new Date("2025-01-14T14:30:00"),
    user: "admin@alpine.edu.np",
    action: "Deleted",
    resource: "Lead",
    details: "Deleted duplicate lead entry",
    type: "delete",
    ipAddress: "192.168.1.100",
  },
  {
    id: "6",
    timestamp: new Date("2025-01-14T11:15:00"),
    user: "counselor@alpine.edu.np",
    action: "Viewed",
    resource: "Student Profile",
    details: "Viewed student profile for Sita Sharma",
    type: "view",
    ipAddress: "192.168.1.101",
  },
];

export default function ActivityLog() {
  const [logs, setLogs] = useState<ActivityLogEntry[]>(sampleLogs);
  const [filteredLogs, setFilteredLogs] =
    useState<ActivityLogEntry[]>(sampleLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("all");

  useEffect(() => {
    let filtered = logs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.details.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter((log) => log.type === selectedType);
    }

    // Filter by user
    if (selectedUser !== "all") {
      filtered = filtered.filter((log) => log.user === selectedUser);
    }

    // Filter by date range
    if (dateRange !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      switch (dateRange) {
        case "today":
          filtered = filtered.filter((log) => log.timestamp >= today);
          break;
        case "week":
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter((log) => log.timestamp >= weekAgo);
          break;
        case "month":
          const monthAgo = new Date(
            today.getFullYear(),
            today.getMonth() - 1,
            today.getDate(),
          );
          filtered = filtered.filter((log) => log.timestamp >= monthAgo);
          break;
      }
    }

    setFilteredLogs(filtered);
  }, [logs, searchTerm, selectedType, selectedUser, dateRange]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "create":
        return <FileText className="h-4 w-4" />;
      case "update":
        return <Edit className="h-4 w-4" />;
      case "delete":
        return <Trash2 className="h-4 w-4" />;
      case "view":
        return <Eye className="h-4 w-4" />;
      case "login":
        return <User className="h-4 w-4" />;
      case "upload":
        return <FileText className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "create":
        return "bg-green-100 text-green-800";
      case "update":
        return "bg-blue-100 text-blue-800";
      case "delete":
        return "bg-red-100 text-red-800";
      case "view":
        return "bg-gray-100 text-gray-800";
      case "login":
        return "bg-purple-100 text-purple-800";
      case "upload":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const exportLogs = () => {
    const csvContent = [
      "Timestamp,User,Action,Resource,Details,Type,IP Address",
      ...filteredLogs.map(
        (log) =>
          `"${formatTimestamp(log.timestamp)}","${log.user}","${log.action}","${log.resource}","${log.details}","${log.type}","${log.ipAddress || ""}"`,
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `activity-logs-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const uniqueUsers = Array.from(new Set(logs.map((log) => log.user)));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Activity Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="view">View</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="upload">Upload</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                {uniqueUsers.map((user) => (
                  <SelectItem key={user} value={user}>
                    {user}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={exportLogs}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>

          {/* Logs Table */}
          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`p-2 rounded-full ${getTypeColor(log.type)}`}>
                  {getTypeIcon(log.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">
                      {log.action}
                    </span>
                    <span className="text-gray-600">{log.resource}</span>
                    <Badge
                      variant="secondary"
                      className={getTypeColor(log.type)}
                    >
                      {log.type}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">{log.details}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {log.user}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatTimestamp(log.timestamp)}
                    </div>
                    {log.ipAddress && <span>IP: {log.ipAddress}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No activity logs found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or search criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
