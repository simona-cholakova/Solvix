import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router";

import {
  ArrowLeft,
  Paperclip,
  Bell,
  Clock3,
  User2,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Button } from "./ui/button";

import { Textarea } from "./ui/textarea";

import { useComplaints } from "../context/ComplaintsContext";

export function ComplaintDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { complaints, updateComplaint } =
    useComplaints();

  const complaint = complaints.find(
    (c) => c.id === id
  );

  const [department, setDepartment] =
    useState(
      complaint?.department || ""
    );

  const [status, setStatus] = useState(
    complaint?.status || ""
  );

  const [saveMessage, setSaveMessage] =
    useState("");

  useEffect(() => {
    if (complaint) {
      setDepartment(
        complaint.department
      );

      setStatus(complaint.status);
    }
  }, []);

  const handleSave = () => {
    if (complaint) {
      updateComplaint(complaint.id, {
        department,
        status,
      });

      setSaveMessage(
        "Changes saved successfully!"
      );

      setTimeout(() => {
        setSaveMessage("");
      }, 3000);
    }
  };

  if (!complaint) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl border border-gray-200 p-10 shadow-sm text-center">
          <p className="text-gray-600 mb-4">
            Complaint not found
          </p>

          <Button
            onClick={() =>
              navigate("/manager")
            }
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

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
              Complaint Management
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative bg-gray-50 border border-gray-200 rounded-xl p-3 hover:bg-gray-100 transition">
              <Bell size={20} />

              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                3
              </div>
            </button>

            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>

              <div>
                <p className="text-sm font-medium text-gray-900">
                  Ema Čikotić
                </p>

                <p className="text-xs text-gray-500">
                  Customer Care Manager
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-6xl mx-auto p-8">
        {/* Success */}
        {saveMessage && (
          <div className="mb-6 bg-green-100 border border-green-300 text-green-800 px-5 py-4 rounded-2xl shadow-sm">
            {saveMessage}
          </div>
        )}

        {/* Back */}
        <button
          onClick={() =>
            navigate("/manager")
          }
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition"
        >
          <ArrowLeft size={18} />

          <span>
            Back to Dashboard
          </span>
        </button>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Card */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Complaint ID
                  </p>

                  <h1 className="text-4xl font-bold text-gray-900">
                    {complaint.id}
                  </h1>
                </div>

                <span
                  className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium
                  ${
                    status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : status ===
                        "In Progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {status}
                </span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Customer Name
                  </p>

                  <p className="text-lg text-gray-900 font-medium">
                    {
                      complaint.customerName
                    }
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Complaint Type
                  </p>

                  <p className="text-lg text-gray-900 font-medium">
                    {
                      complaint.complaintType
                    }
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Department
                  </p>

                  <p className="text-lg text-gray-900 font-medium">
                    {department}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Submitted
                  </p>

                  <p className="text-lg text-gray-900 font-medium">
                    {
                      complaint.dateSubmitted
                    }
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-sm text-gray-500 mb-3">
                  Complaint Description
                </p>

                <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 leading-relaxed text-gray-700">
                  {complaint.description}
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Attachments
              </h2>

              {complaint.attachments
                .length > 0 ? (
                <div className="space-y-3">
                  {complaint.attachments.map(
                    (
                      attachment: any,
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 rounded-2xl border border-gray-200 p-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                            <Paperclip
                              size={20}
                              className="text-gray-500"
                            />
                          </div>

                          <div>
                            <p className="font-medium text-gray-900">
                              {
                                attachment.name
                              }
                            </p>

                            <p className="text-sm text-gray-500">
                              {
                                attachment.size
                              }
                            </p>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="rounded-xl"
                        >
                          Download
                        </Button>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl border border-gray-200 p-10 text-center text-gray-500">
                  No attachments uploaded
                </div>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Manage Complaint
              </h2>

              <div className="space-y-6">
                {/* Department */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Assign Department
                  </label>

                  <Select
                    value={department}
                    onValueChange={
                      setDepartment
                    }
                  >
                    <SelectTrigger className="rounded-xl border-gray-200 h-12">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Logistics">
                        Logistics
                      </SelectItem>

                      <SelectItem value="Customer Support">
                        Customer Support
                      </SelectItem>

                      <SelectItem value="Returns">
                        Returns
                      </SelectItem>

                      <SelectItem value="Finance">
                        Finance
                      </SelectItem>

                      <SelectItem value="Technical Support">
                        Technical Support
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Update Status
                  </label>

                  <Select
                    value={status}
                    onValueChange={
                      setStatus
                    }
                  >
                    <SelectTrigger className="rounded-xl border-gray-200 h-12">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Pending">
                        Pending
                      </SelectItem>

                      <SelectItem value="In Progress">
                        In Progress
                      </SelectItem>

                      <SelectItem value="Resolved">
                        Resolved
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Save */}
                <Button
                  onClick={handleSave}
                  className="w-full rounded-2xl bg-gray-900 hover:bg-gray-800 py-6 text-lg transition-all duration-200 hover:scale-[1.01]"
                >
                  Save Changes
                </Button>
              </div>
            </div>

            {/* Extra Info */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <User2
                    size={22}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Assigned To
                  </p>

                  <p className="font-medium text-gray-900">
                    Anna Novak
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                  <Clock3
                    size={22}
                    className="text-yellow-600"
                  />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Last Updated
                  </p>

                  <p className="font-medium text-gray-900">
                    2 hours ago
                  </p>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Internal Notes
              </h2>

              <Textarea
                placeholder="Add notes..."
                className="min-h-40 rounded-2xl border-gray-200 resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
