"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getFirestore, collection, query, orderBy, getDocs, where } from "firebase/firestore";

export default function AuditLogPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [targetTypeFilter, setTargetTypeFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      const db = getFirestore();
      const q = query(collection(db, "audit_logs"), orderBy("timestamp", "desc"));
      // Filtering is done client-side for simplicity
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setLogs(data);
      setLoading(false);
    };
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      !search ||
      log.userEmail?.toLowerCase().includes(search.toLowerCase()) ||
      log.action?.toLowerCase().includes(search.toLowerCase()) ||
      log.targetType?.toLowerCase().includes(search.toLowerCase()) ||
      log.targetId?.toLowerCase().includes(search.toLowerCase());
    const matchesAction = !actionFilter || log.action === actionFilter;
    const matchesTarget = !targetTypeFilter || log.targetType === targetTypeFilter;
    const matchesUser = !userFilter || log.userEmail === userFilter;
    const matchesDate =
      !dateFilter ||
      (log.timestamp &&
        new Date(log.timestamp.seconds * 1000).toISOString().slice(0, 10) === dateFilter);
    return matchesSearch && matchesAction && matchesTarget && matchesUser && matchesDate;
  });

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Audit Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Input
              placeholder="Search by user, action, target..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Actions</SelectItem>
                <SelectItem value="upload_document">Upload Document</SelectItem>
                <SelectItem value="approve_application">Approve Application</SelectItem>
                <SelectItem value="edit_profile">Edit Profile</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="status_change">Status Change</SelectItem>
                {/* Add more as needed */}
              </SelectContent>
            </Select>
            <Select value={targetTypeFilter} onValueChange={setTargetTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Target Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="application">Application</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="user">User</SelectItem>
                {/* Add more as needed */}
              </SelectContent>
            </Select>
            <Input
              placeholder="User Email"
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
            />
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading logs...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      {log.timestamp
                        ? new Date(log.timestamp.seconds * 1000).toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell>{log.userEmail}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>
                      {log.targetType} <br />
                      <span className="text-xs text-gray-500">{log.targetId}</span>
                    </TableCell>
                    <TableCell>
                      <pre className="whitespace-pre-wrap text-xs bg-gray-50 p-2 rounded">
                        {log.details ? JSON.stringify(log.details, null, 2) : "-"}
                      </pre>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 