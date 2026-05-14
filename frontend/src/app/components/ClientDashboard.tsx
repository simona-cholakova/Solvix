import { useState } from "react";
import { useNavigate } from "react-router";

import {
  Search,
  Plus,
  Bell,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import { Input } from "./ui/input";

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

export function ClientDashboard() {
  const navigate = useNavigate();

  const { complaints } = useComplaints();

  const [searchQuery, setSearchQuery] = useState("");

  // Demo version
  const clientComplaints = complaints;

  const filteredComplaints = clientComplaints.filter(
    (complaint) => {
      const matchesSearch =
        complaint.id
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        complaint.complaintType
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesSearch;
    }
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              SOLVIX
            </h1>

            <p className="text-gray-500 mt-1">
              Client Complaint Portal
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative bg-gray-50 border border-gray-200 rounded-xl p-3 hover:bg-gray-100 transition">
              <Bell size={20} />

              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                2
              </div>
            </button>

            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>

              <div>
                <p className="text-sm font-medium text-gray-900">
                  Ema Čikotić
                </p>

                <p className="text-xs text-gray-500">
                  Client Account
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="text-sm text-gray-500 hover:text-gray-900 mb-6 transition"
        >
          ← Back to Home
        </button>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Total Complaints
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {complaints.length}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Clock3
                  size={22}
                  className="text-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-yellow-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700">
                  Pending
                </p>

                <h2 className="text-3xl font-bold text-yellow-600 mt-2">
                  {
                    complaints.filter(
                      (c) => c.status === "Pending"
                    ).length
                  }
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                <Clock3
                  size={22}
                  className="text-yellow-600"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-green-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">
                  Resolved
                </p>

                <h2 className="text-3xl font-bold text-green-600 mt-2">
                  {
                    complaints.filter(
                      (c) => c.status === "Resolved"
                    ).length
                  }
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle2
                  size={22}
                  className="text-green-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Search + Button */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full md:w-96 relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={20} />
              </div>

              <Input
                type="text"
                placeholder="Search complaints..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                className="pl-10 rounded-xl border-gray-200"
              />
            </div>

            {/* Button */}
            <Button
              onClick={() =>
                navigate("/client/submit")
              }
              className="w-full md:w-auto rounded-xl bg-gray-900 hover:bg-gray-800 flex items-center gap-2 py-6 transition"
            >
              <Plus size={20} />
              Submit New Complaint
            </Button>
          </div>
        </div>

        {/* Count */}
        <div className="mb-4 text-gray-500">
          You have {filteredComplaints.length} complaint
          {filteredComplaints.length !== 1 ? "s" : ""}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Complaint ID</TableHead>

                <TableHead>
                  Complaint Type
                </TableHead>

                <TableHead>Status</TableHead>

                <TableHead>
                  Department
                </TableHead>

                <TableHead>
                  Date Submitted
                </TableHead>

                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredComplaints.map((complaint) => (
                <TableRow
                  key={complaint.id}
                  className="hover:bg-gray-50 transition"
                >
                  <TableCell className="font-mono">
                    {complaint.id}
                  </TableCell>

                  <TableCell>
                    {complaint.complaintType}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium
                      ${
                        complaint.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : complaint.status ===
                            "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </TableCell>

                  <TableCell>
                    {complaint.department}
                  </TableCell>

                  <TableCell>
                    {complaint.dateSubmitted}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl"
                      onClick={() =>
                        navigate(
                          `/client/complaint/${complaint.id}`
                        )
                      }
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Empty */}
        {filteredComplaints.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-200 mt-6">
            No complaints found
          </div>
        )}
      </div>
    </div>
  );
}