import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Filter, Plus } from "lucide-react";

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

export function ManagerComplaints() {
  const navigate = useNavigate();
  const { complaints, updateComplaint } = useComplaints();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.complaintType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    const matchesDept = departmentFilter === "all" || c.department === departmentFilter;
    const matchesType = typeFilter === "all" || c.complaintType === typeFilter;
    return matchesSearch && matchesStatus && matchesDept && matchesType;
  });

  const uniqueTypes = Array.from(new Set(complaints.map((c) => c.complaintType)));

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ManagerSidebar />

      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-6xl font-bold tracking-tight text-gray-900">Complaints</h1>
              <p className="text-gray-500 mt-4 text-lg">
                Manage and resolve all incoming complaints
              </p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
            {[
              { label: "Total", value: complaints.length, color: "gray" },
              {
                label: "Pending",
                value: complaints.filter((c) => c.status === "Pending").length,
                color: "yellow",
              },
              {
                label: "In Progress",
                value: complaints.filter((c) => c.status === "In Progress").length,
                color: "blue",
              },
              {
                label: "Resolved",
                value: complaints.filter((c) => c.status === "Resolved").length,
                color: "green",
              },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className={`bg-white rounded-2xl border border-${color}-200 p-6 shadow-sm`}
              >
                <p className={`text-sm text-${color}-700 mb-1`}>{label}</p>
                <h2 className={`text-4xl font-bold text-${color}-600`}>{value}</h2>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative md:col-span-2">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by ID, name, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl border-gray-200"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="rounded-xl border-gray-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="rounded-xl border-gray-200">
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

              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setDepartmentFilter("all");
                  setTypeFilter("all");
                }}
                className="rounded-xl border-gray-200"
              >
                Reset
              </Button>
            </div>
          </div>

          <div className="mb-4 text-gray-500 text-sm">
            {filteredComplaints.length} of {complaints.length} complaints
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Quick Update</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComplaints.map((complaint) => (
                  <TableRow key={complaint.id} className="hover:bg-gray-50 transition">
                    <TableCell className="font-mono text-sm font-medium">
                      {complaint.id}
                    </TableCell>
                    <TableCell>{complaint.customerName}</TableCell>
                    <TableCell className="text-sm">{complaint.complaintType}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                    <TableCell className="text-sm">{complaint.department}</TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {complaint.dateSubmitted}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={complaint.status}
                        onValueChange={(val) =>
                          updateComplaint(complaint.id, { status: val })
                        }
                      >
                        <SelectTrigger className="rounded-lg border-gray-200 h-8 text-xs w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl text-xs"
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
              No complaints match your filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
