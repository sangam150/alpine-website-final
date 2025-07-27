"use client";
import { useEffect, useState } from "react";
import {
  FirebaseService,
  COLLECTIONS,
  APPLICATION_STATUS,
} from "@/lib/firebase-collections";
import { Application } from "@/lib/firebase-collections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Calendar,
  User,
  MapPin,
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  FileText,
} from "lucide-react";
import { format } from "date-fns";

interface Props {
  onView: (app: Application) => void;
  onEdit: (app: Application) => void;
  onDelete: (app: Application) => void;
  refreshKey: number;
}

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  COMPLETED: "bg-purple-100 text-purple-800",
};

const statusIcons = {
  PENDING: Clock,
  IN_PROGRESS: AlertCircle,
  APPROVED: CheckCircle,
  REJECTED: XCircle,
  COMPLETED: CheckCircle,
};

export default function StudentTable({
  onView,
  onEdit,
  onDelete,
  refreshKey,
}: Props) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [countryFilter, setCountryFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    FirebaseService.getDocuments<Application>(COLLECTIONS.APPLICATIONS)
      .then((apps) => {
        if (!ignore) {
          setApplications(apps);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
        if (!ignore) {
          setLoading(false);
        }
      });
    return () => {
      ignore = true;
    };
  }, [refreshKey]);

  // Filtering logic
  const filtered = applications.filter((app) => {
    let ok = true;
    if (statusFilter && app.status !== statusFilter) ok = false;
    if (countryFilter && app.countryId !== countryFilter) ok = false;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        app.studentId?.toLowerCase().includes(searchLower) ||
        app.program?.toLowerCase().includes(searchLower) ||
        app.countryId?.toLowerCase().includes(searchLower) ||
        app.intake?.toLowerCase().includes(searchLower);
      if (!matchesSearch) ok = false;
    }
    return ok;
  });

  const getStatusCount = (status: string) => {
    return applications.filter((app) => app.status === status).length;
  };

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {applications.length}
              </p>
              <p className="text-xs text-gray-600">Total</p>
            </div>
          </CardContent>
        </Card>
        {Object.entries(APPLICATION_STATUS).map(([key, value]) => (
          <Card key={key}>
            <CardContent className="p-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {getStatusCount(value)}
                </p>
                <p className="text-xs text-gray-600">
                  {value.replace("_", " ")}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              {Object.entries(APPLICATION_STATUS).map(([key, val]) => (
                <option key={key} value={val}>
                  {val.charAt(0).toUpperCase() + val.slice(1).replace("_", " ")}
                </option>
              ))}
            </select>

            <Input
              type="text"
              placeholder="Country ID"
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
            />

            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span>Loading applications...</span>
                      </div>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      <div className="flex flex-col items-center space-y-2">
                        <FileText className="h-8 w-8 text-gray-400" />
                        <p>No applications found</p>
                        <p className="text-sm">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((app) => {
                    const StatusIcon =
                      statusIcons[app.status as keyof typeof statusIcons] ||
                      Clock;
                    return (
                      <tr
                        key={app.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-blue-600" />
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {app.studentId}
                              </p>
                              <p className="text-xs text-gray-500">
                                ID: {app.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-900">
                              {app.countryId}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-900">
                              {app.program}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={
                              statusColors[
                                app.status as keyof typeof statusColors
                              ]
                            }
                          >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {app.status.replace("_", " ")}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-900">
                              {app.createdAt
                                ? format(app.createdAt.toDate(), "MMM dd, yyyy")
                                : "-"}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onView(app)}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onEdit(app)}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => onDelete(app)}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
