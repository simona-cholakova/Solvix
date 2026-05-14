import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Building2,
  Users,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock3,
  AlertCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { useComplaints } from "../context/ComplaintsContext";
import { ManagerSidebar } from "./ManagerSidebar";

const DEPARTMENT_INFO: Record<
  string,
  { color: string; bg: string; border: string; agents: string[]; description: string }
> = {
  Logistics: {
    color: "text-blue-600",
    bg: "bg-blue-100",
    border: "border-blue-200",
    agents: ["Anna Novak", "Peter Kovač", "Lena Müller"],
    description: "Handles delivery delays, lost packages, and shipping-related complaints.",
  },
  "Customer Support": {
    color: "text-purple-600",
    bg: "bg-purple-100",
    border: "border-purple-200",
    agents: ["Marco Rossi", "Julia Schmidt"],
    description: "General customer service complaints and escalation handling.",
  },
  Returns: {
    color: "text-green-600",
    bg: "bg-green-100",
    border: "border-green-200",
    agents: ["Sara Klein", "Tom Bauer", "Nina Becker"],
    description: "Manages return requests, wrong item deliveries, and product exchanges.",
  },
  Finance: {
    color: "text-yellow-600",
    bg: "bg-yellow-100",
    border: "border-yellow-200",
    agents: ["Elena Fischer", "David Hofer"],
    description: "Processes refund requests, billing disputes, and payment issues.",
  },
  "Technical Support": {
    color: "text-red-600",
    bg: "bg-red-100",
    border: "border-red-200",
    agents: ["Max Weber", "Lea Braun"],
    description: "Resolves app crashes, website bugs, and account access issues.",
  },
};

const DEPARTMENTS = Object.keys(DEPARTMENT_INFO);

export function ManagerDepartments() {
  const navigate = useNavigate();
  const { complaints, updateComplaint } = useComplaints();
  const [expandedDept, setExpandedDept] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ManagerSidebar />

      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-6xl font-bold tracking-tight text-gray-900">Departments</h1>
            <p className="text-gray-500 mt-4 text-lg">
              Overview of all departments, agents, and their complaint workload
            </p>
          </div>

          {/* Summary row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {DEPARTMENTS.map((dept) => {
              const info = DEPARTMENT_INFO[dept];
              const count = complaints.filter((c) => c.department === dept).length;
              const open = complaints.filter(
                (c) => c.department === dept && c.status !== "Resolved"
              ).length;
              return (
                <div
                  key={dept}
                  className={`bg-white rounded-2xl border ${info.border} p-5 shadow-sm cursor-pointer hover:shadow-md transition`}
                  onClick={() => setExpandedDept(expandedDept === dept ? null : dept)}
                >
                  <div className={`w-10 h-10 rounded-xl ${info.bg} flex items-center justify-center mb-3`}>
                    <Building2 size={18} className={info.color} />
                  </div>
                  <p className="text-sm font-medium text-gray-700">{dept}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{count}</p>
                  <p className="text-xs text-gray-400 mt-1">{open} open</p>
                </div>
              );
            })}
          </div>

          {/* Department Cards */}
          <div className="space-y-4">
            {DEPARTMENTS.map((dept) => {
              const info = DEPARTMENT_INFO[dept];
              const deptComplaints = complaints.filter((c) => c.department === dept);
              const pending = deptComplaints.filter((c) => c.status === "Pending").length;
              const inProgress = deptComplaints.filter((c) => c.status === "In Progress").length;
              const resolved = deptComplaints.filter((c) => c.status === "Resolved").length;
              const isOpen = expandedDept === dept;

              return (
                <div
                  key={dept}
                  className={`bg-white rounded-2xl border ${info.border} shadow-sm overflow-hidden`}
                >
                  {/* Card Header */}
                  <button
                    className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition text-left"
                    onClick={() => setExpandedDept(isOpen ? null : dept)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${info.bg} flex items-center justify-center`}>
                        <Building2 size={22} className={info.color} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{dept}</h2>
                        <p className="text-sm text-gray-500">{info.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Stats */}
                      <div className="hidden md:flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5">
                          <AlertCircle size={14} className="text-yellow-500" />
                          <span className="text-yellow-700">{pending} pending</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock3 size={14} className="text-blue-500" />
                          <span className="text-blue-700">{inProgress} in progress</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 size={14} className="text-green-500" />
                          <span className="text-green-700">{resolved} resolved</span>
                        </div>
                      </div>

                      {/* Agents count */}
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users size={16} />
                        <span>{info.agents.length} agents</span>
                      </div>

                      {isOpen ? (
                        <ChevronUp size={20} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isOpen && (
                    <div className="border-t border-gray-100 p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Agents */}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                            Agents
                          </h3>
                          <div className="space-y-2">
                            {info.agents.map((agent) => (
                              <div
                                key={agent}
                                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                              >
                                <div className={`w-8 h-8 rounded-full ${info.bg} flex items-center justify-center text-xs font-bold ${info.color}`}>
                                  {agent.split(" ").map((n) => n[0]).join("")}
                                </div>
                                <span className="text-sm text-gray-800">{agent}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Complaints list */}
                        <div className="md:col-span-2">
                          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                            Complaints ({deptComplaints.length})
                          </h3>
                          {deptComplaints.length === 0 ? (
                            <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-xl">
                              No complaints assigned
                            </div>
                          ) : (
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                              {deptComplaints.map((c) => (
                                <div
                                  key={c.id}
                                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs font-mono text-gray-500">{c.id}</span>
                                    <span className="text-sm text-gray-800">{c.customerName}</span>
                                    <span className="text-xs text-gray-500">{c.complaintType}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                        c.status === "Pending"
                                          ? "bg-yellow-100 text-yellow-700"
                                          : c.status === "In Progress"
                                          ? "bg-blue-100 text-blue-700"
                                          : "bg-green-100 text-green-700"
                                      }`}
                                    >
                                      {c.status}
                                    </span>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="rounded-lg text-xs h-7"
                                      onClick={() => navigate(`/complaint/${c.id}`)}
                                    >
                                      View
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
