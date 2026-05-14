import { useState } from "react";
import { useNavigate } from "react-router";

import { Search, Filter, Bell } from "lucide-react";

import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { Button } from "./ui/button";

import { useComplaints } from "../context/ComplaintsContext";
import { ManagerSidebar } from "./ManagerSidebar";

export function Dashboard() {
  const navigate = useNavigate();

  const { complaints } = useComplaints();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.complaintType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || complaint.status === statusFilter;

    const matchesDepartment =
      departmentFilter === "all" || complaint.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ManagerSidebar />

      {/* Main */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-6xl font-bold tracking-tight text-gray-900">
                Dashboard
              </h1>
              <p className="text-gray-500 mt-4 text-lg">
                Zalando Customer Care Management
              </p>
            </div>

            {/* User */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
                >
                  <Bell size={22} />
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    3
                  </div>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 z-50">
                    <h3 className="font-semibold text-gray-900 mb-3">Notifications</h3>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                        Complaint CMP-004 marked as Resolved
                      </div>
                      <div className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                        New complaint submitted by Sarah Williams
                      </div>
                      <div className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                        Logistics department updated ticket CMP-002
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div>
                  <p className="font-medium text-gray-900">Ema Čikotić</p>
                  <p className="text-sm text-gray-500">Customer Care Manager</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm">
              <p className="text-sm text-gray-500">Total Complaints</p>
              <h2 className="text-5xl font-bold text-gray-900 mt-3">{complaints.length}</h2>
            </div>
            <div className="bg-white rounded-2xl border border-yellow-200 p-7 shadow-sm">
              <p className="text-sm text-yellow-700">Pending</p>
              <h2 className="text-5xl font-bold text-yellow-600 mt-3">
                {complaints.filter((c) => c.status === "Pending").length}
              </h2>
            </div>
            <div className="bg-white rounded-2xl border border-blue-200 p-7 shadow-sm">
              <p className="text-sm text-blue-700">In Progress</p>
              <h2 className="text-5xl font-bold text-blue-600 mt-3">
                {complaints.filter((c) => c.status === "In Progress").length}
              </h2>
            </div>
            <div className="bg-white rounded-2xl border border-green-200 p-7 shadow-sm">
              <p className="text-sm text-green-700">Resolved</p>
              <h2 className="text-5xl font-bold text-green-600 mt-3">
                {complaints.filter((c) => c.status === "Resolved").length}
              </h2>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={20} />
                </div>
                <Input
                  type="text"
                  placeholder="Search complaints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl border-gray-200"
                />
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                  <Filter size={16} />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="pl-10 rounded-xl border-gray-200">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                  <Filter size={16} />
                </div>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="pl-10 rounded-xl border-gray-200">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Logistics">Logistics</SelectItem>
                    <SelectItem value="Customer Support">Customer Support</SelectItem>
                    <SelectItem value="Returns">Returns</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Technical Support">Technical Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setDepartmentFilter("all");
                }}
                className="rounded-xl border-gray-200 hover:bg-gray-100 transition"
              >
                Reset Filters
              </Button>
            </div>
          </div>

          <div className="mb-4 text-gray-600">
            Showing {filteredComplaints.length} of {complaints.length} complaints
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Complaint ID</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Complaint Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComplaints.map((complaint) => (
                  <TableRow key={complaint.id} className="hover:bg-gray-50 transition">
                    <TableCell className="font-medium">{complaint.id}</TableCell>
                    <TableCell>{complaint.customerName}</TableCell>
                    <TableCell>{complaint.complaintType}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          complaint.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : complaint.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {complaint.status}
                      </span>
                    </TableCell>
                    <TableCell>{complaint.department}</TableCell>
                    <TableCell>{complaint.dateSubmitted}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
                        onClick={() => navigate(`/complaint/${complaint.id}`)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredComplaints.length === 0 && (
            <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-200 mt-6">
              No complaints found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
