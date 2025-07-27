"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  Plus,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import StudentTable from "@/components/admin/students/StudentTable";
import StudentDrawer from "@/components/admin/students/StudentDrawer";
import StudentForm from "@/components/admin/students/StudentForm";
import { Application } from "@/lib/firebase-collections";

export default function StudentsPage() {
  const [selected, setSelected] = useState<Application | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editApp, setEditApp] = useState<Application | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Show notification
  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    // Fetch applications from API
    async function fetchApplications() {
      setLoading(true);
      try {
        const res = await fetch("/api/students");
        const data = await res.json();
        // You may need to map data to Application type if needed
        // setApplications(data.data);
        setRefreshKey((k) => k + 1); // To trigger StudentTable refresh
      } catch (error) {
        showNotification("error", "Failed to fetch applications.");
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, []);

  // Add or edit application
  const handleSave = async (data: Partial<Application>) => {
    setLoading(true);
    try {
      if (editApp && editApp.id) {
        await fetch(`/api/students`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editApp.id, ...data }),
        });
        showNotification("success", "Application updated successfully!");
        setEditApp(null);
      } else {
        await fetch(`/api/students`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        showNotification("success", "Application added successfully!");
      }
      setShowForm(false);
      setRefreshKey((k) => k + 1);
    } catch (error) {
      showNotification("error", "Failed to save application. Please try again.");
      console.error("Error saving application:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete application
  const handleDelete = async (app: Application) => {
    if (
      window.confirm(
        "Are you sure you want to delete this application? This action cannot be undone.",
      )
    ) {
      setLoading(true);
      try {
        if (app.id) {
          await fetch(`/api/students?id=${app.id}`, { method: "DELETE" });
          showNotification("success", "Application deleted successfully!");
          setSelected(null);
          setRefreshKey((k) => k + 1);
        }
      } catch (error) {
        showNotification("error", "Failed to delete application. Please try again.");
        console.error("Error deleting application:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Update status
  const handleStatusChange = async (status: string) => {
    if (selected && selected.id) {
      setLoading(true);
      try {
        await fetch(`/api/students`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: selected.id, status }),
        });
        showNotification("success", "Status updated successfully!");
        setRefreshKey((k) => k + 1);
      } catch (error) {
        showNotification("error", "Failed to update status. Please try again.");
        console.error("Error updating status:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Export applications
  const handleExport = () => {
    // TODO: Implement CSV export
    showNotification("success", "Export feature coming soon!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Student Applications
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and track all student applications
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            onClick={() => {
              setEditApp(null);
              setShowForm(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Application
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Applications
                </p>
                <p className="text-2xl font-bold text-gray-900">Loading...</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">Loading...</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">Loading...</p>
              </div>
              <AlertCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">Loading...</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>All Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentTable
            onView={setSelected}
            onEdit={(app) => {
              setEditApp(app);
              setShowForm(true);
            }}
            onDelete={handleDelete}
            refreshKey={refreshKey}
          />
        </CardContent>
      </Card>

      {/* Drawer */}
      {selected && (
        <StudentDrawer
          app={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
          onDelete={() => handleDelete(selected)}
        />
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {editApp ? "Edit Application" : "Add New Application"}
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setEditApp(null);
                    setShowForm(false);
                  }}
                >
                  ×
                </Button>
              </div>
              <StudentForm
                initial={editApp || undefined}
                onSave={handleSave}
                onCancel={() => {
                  setEditApp(null);
                  setShowForm(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span>Processing...</span>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <div className="flex items-center space-x-2">
            {notification.type === "success" ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <XCircle className="h-5 w-5" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
