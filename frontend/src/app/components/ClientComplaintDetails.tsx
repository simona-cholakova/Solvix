import { useNavigate, useParams } from "react-router";

import {
  ArrowLeft,
  Bell,
  Clock3,
  Building2,
  CircleHelp,
} from "lucide-react";

import { Button } from "./ui/button";

import { useComplaints } from "../context/ComplaintsContext";

export function ClientComplaintDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { complaints } = useComplaints();

  const complaint = complaints.find(
    (c) => c.id === id
  );

  if (!complaint) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        Complaint not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
              SOLVIX
            </h1>

            <p className="text-gray-500 mt-2">
              Client Complaint Portal
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition">
              <Bell size={22} />

              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                2
              </div>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-gray-300"></div>

              <div>
                <p className="font-medium text-gray-900">
                  John Doe
                </p>

                <p className="text-sm text-gray-500">
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
          onClick={() => navigate("/client")}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Card */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
              {/* Top */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Complaint ID
                  </p>

                  <h2 className="text-5xl font-bold text-gray-900">
                    {complaint.id}
                  </h2>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    complaint.status ===
                    "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : complaint.status ===
                        "In Progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {complaint.status}
                </span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Complaint Type
                  </p>

                  <p className="text-xl font-medium text-gray-900">
                    {complaint.complaintType}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Department
                  </p>

                  <p className="text-xl font-medium text-gray-900">
                    {complaint.department}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Submitted
                  </p>

                  <p className="text-xl font-medium text-gray-900">
                    {complaint.dateSubmitted}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Resolution
                  </p>

                  <p className="text-xl font-medium text-gray-400">
                    {complaint.resolvedDate ||
                      "Not yet resolved"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-sm text-gray-500 mb-3">
                  Complaint Description
                </p>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {complaint.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Attachments
              </h3>

              <div className="border border-dashed border-gray-300 rounded-2xl p-12 text-center bg-gray-50">
                <p className="text-gray-400 text-lg">
                  No attachments uploaded
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Complaint Status
              </h3>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <Building2 className="text-blue-600" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Assigned Department
                    </p>

                    <p className="font-semibold text-lg">
                      {complaint.department}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
                    <Clock3 className="text-yellow-600" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Last Updated
                    </p>

                    <p className="font-semibold text-lg">
                      2 hours ago
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-3xl font-bold text-gray-900 mb-5">
                Need Help?
              </h3>

              <p className="text-gray-500 leading-relaxed mb-6">
                Contact our support team if you
                need additional assistance
                regarding your complaint.
              </p>

              <Button className="w-full rounded-2xl py-6 bg-gray-900 hover:bg-gray-800 text-lg">
                <CircleHelp className="mr-2 h-5 w-5" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}