import { useState, useRef } from "react";
import { useNavigate } from "react-router";

import {
  ArrowLeft,
  Upload,
  CheckCircle2,
  Bell,
  X,
  FileText,
} from "lucide-react";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useComplaints } from "../context/ComplaintsContext";

export function SubmitComplaint() {
  const navigate = useNavigate();
  const { addComplaint } = useComplaints();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [customerName, setCustomerName] = useState("");
  const [complaintType, setComplaintType] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const incoming = Array.from(e.target.files);
    // avoid duplicates by name
    setSelectedFiles((prev) => {
      const existingNames = new Set(prev.map((f) => f.name));
      const newOnes = incoming.filter((f) => !existingNames.has(f.name));
      return [...prev, ...newOnes];
    });
    // reset input so same file can be re-added after removal
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    setSelectedFiles((prev) => {
      const existingNames = new Set(prev.map((f) => f.name));
      return [...prev, ...dropped.filter((f) => !existingNames.has(f.name))];
    });
  };

  const removeFile = (name: string) => {
    setSelectedFiles((prev) => prev.filter((f) => f.name !== name));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addComplaint({
      customerName: customerName || "Anonymous",
      complaintType: complaintType || "Other",
      description: description || "No description provided.",
      attachments: selectedFiles.map((f) => ({
        name: f.name,
        size: formatSize(f.size),
      })),
    });

    setSuccessMessage("submitted");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">SOLVIX</h1>
            <p className="text-gray-500 mt-1">Submit a New Complaint</p>
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
                <p className="text-sm font-medium text-gray-900">Ema Čikotić</p>
                <p className="text-xs text-gray-500">Client Account</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-5xl mx-auto p-8">
        {/* Success Screen */}
        {successMessage === "submitted" && (
          <div className="bg-white rounded-3xl border border-gray-200 p-16 shadow-sm text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complaint Submitted!
            </h2>
            <p className="text-gray-500 text-lg max-w-md mx-auto mb-8">
              Thank you for reaching out. We will get back to you as soon as possible.
            </p>
            <Button
              onClick={() => navigate("/client")}
              className="rounded-xl bg-gray-900 hover:bg-gray-800 px-10 py-6 text-lg"
            >
              Back to My Complaints
            </Button>
          </div>
        )}

        {/* Back */}
        <button
          onClick={() => navigate("/client")}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition"
        >
          <ArrowLeft size={18} />
          <span>Back to My Complaints</span>
        </button>

        {/* Main Card */}
        {successMessage !== "submitted" && <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-3xl border border-gray-200 p-10 shadow-sm">
            {/* Header */}
            <div className="mb-10">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">
                Submit Complaint
              </h2>
              <p className="text-gray-500 text-lg">
                Fill out the form below and our support team will review your complaint shortly.
              </p>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm text-gray-500 mb-2">Full Name</label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="rounded-xl border-gray-200 h-12"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">Complaint Type</label>
                <Select value={complaintType} onValueChange={setComplaintType}>
                  <SelectTrigger className="rounded-xl border-gray-200 h-12">
                    <SelectValue placeholder="Select complaint type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Product Quality">Product Quality</SelectItem>
                    <SelectItem value="Delivery Delay">Delivery Delay</SelectItem>
                    <SelectItem value="Customer Service">Customer Service</SelectItem>
                    <SelectItem value="Billing Issue">Billing Issue</SelectItem>
                    <SelectItem value="Refund Request">Refund Request</SelectItem>
                    <SelectItem value="Technical Issue">Technical Issue</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <label className="block text-sm text-gray-500 mb-2">Complaint Description</label>
              <Textarea
                placeholder="Describe your issue in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-48 rounded-2xl border-gray-200 resize-none"
                required
              />
              <div className="flex justify-between mt-2">
                <p className="text-xs text-gray-500">Minimum 20 characters</p>
                <p className="text-xs text-gray-400">{description.length}/500</p>
              </div>
            </div>

            {/* Upload */}
            <div className="mb-10">
              <label className="block text-sm text-gray-500 mb-3">Attachments</label>

              {/* Drop zone */}
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center hover:border-gray-400 transition cursor-pointer bg-gray-50"
              >
                <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mx-auto mb-4">
                  <Upload size={28} className="text-gray-500" />
                </div>
                <p className="text-gray-700 font-medium mb-1">Drag & drop files here</p>
                <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
                <p className="text-xs text-gray-400">PDF, PNG, JPG up to 5MB</p>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  multiple
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                />
              </div>

              {/* File list */}
              {selectedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {selectedFiles.map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                          <FileText size={16} className="text-gray-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{file.name}</p>
                          <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(file.name)}
                        className="text-gray-400 hover:text-red-500 transition p-1 rounded-lg hover:bg-red-50"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full rounded-2xl bg-gray-900 hover:bg-gray-800 py-7 text-lg transition-all duration-200 hover:scale-[1.01]"
            >
              Submit Complaint
            </Button>
          </div>
        </form>}

        {/* Info Cards */}
        {successMessage !== "submitted" && (<div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
              <Bell size={22} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quick Review</h3>
            <p className="text-sm text-gray-500">Complaints are reviewed within 24–48 hours.</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 size={22} className="text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Live Tracking</h3>
            <p className="text-sm text-gray-500">Track complaint status directly from your dashboard.</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
              <Upload size={22} className="text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">File Uploads</h3>
            <p className="text-sm text-gray-500">Attach screenshots, invoices, or supporting documents.</p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
