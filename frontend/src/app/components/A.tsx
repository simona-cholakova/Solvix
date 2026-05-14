import { useNavigate } from "react-router";
import { ManagerSidebar } from "./ManagerSidebar";
import { useComplaints } from "../context/ComplaintsContext";

export function A() {
  const { complaints } = useComplaints();

  const total = complaints.length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;
  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

  // Department breakdown from real data
  const departments = ["Logistics", "Returns", "Finance", "Technical Support", "Customer Support"];
  const deptColors: Record<string, string> = {
    Logistics: "bg-blue-500",
    Returns: "bg-green-500",
    Finance: "bg-yellow-500",
    "Technical Support": "bg-purple-500",
    "Customer Support": "bg-red-400",
  };

  const deptCounts = departments.map((dept) => ({
    name: dept,
    count: complaints.filter((c) => c.department === dept).length,
    color: deptColors[dept],
  }));

  const maxCount = Math.max(...deptCounts.map((d) => d.count), 1);

  // Type breakdown
  const typeMap: Record<string, number> = {};
  complaints.forEach((c) => {
    typeMap[c.complaintType] = (typeMap[c.complaintType] || 0) + 1;
  });
  const topTypes = Object.entries(typeMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Monthly trend (simulate from dateSubmitted)
  const monthMap: Record<string, number> = {};
  complaints.forEach((c) => {
    const month = c.dateSubmitted?.slice(0, 7) || "Unknown";
    monthMap[month] = (monthMap[month] || 0) + 1;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ManagerSidebar />

      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <h1 className="text-6xl font-bold tracking-tight text-gray-900 mb-3">Analytics</h1>
          <p className="text-gray-500 mb-10 text-lg">Complaint insights and performance overview</p>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <p className="text-sm text-gray-500 mb-3">Resolution Rate</p>
              <h2 className="text-5xl font-bold text-green-600">{resolutionRate}%</h2>
              <p className="text-xs text-gray-400 mt-2">{resolved} of {total} resolved</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <p className="text-sm text-gray-500 mb-3">Avg Response Time</p>
              <h2 className="text-5xl font-bold text-blue-600">2.4h</h2>
              <p className="text-xs text-gray-400 mt-2">Across all departments</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <p className="text-sm text-gray-500 mb-3">Customer Satisfaction</p>
              <h2 className="text-5xl font-bold text-purple-600">4.8</h2>
              <p className="text-xs text-gray-400 mt-2">Out of 5.0</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <p className="text-sm text-gray-500 mb-3">Open Complaints</p>
              <h2 className="text-5xl font-bold text-yellow-600">
                {complaints.filter((c) => c.status !== "Resolved").length}
              </h2>
              <p className="text-xs text-gray-400 mt-2">Pending + In Progress</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Complaints by Department */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                Complaints by Department
              </h3>
              <div className="space-y-5">
                {deptCounts.map(({ name, count, color }) => {
                  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                  const barWidth = maxCount > 0 ? Math.round((count / maxCount) * 100) : 0;
                  return (
                    <div key={name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 text-sm">{name}</span>
                        <span className="text-gray-500 text-sm">
                          {count} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${color} rounded-full transition-all duration-500`}
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Complaint Types */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                Top Complaint Types
              </h3>
              <div className="space-y-4">
                {topTypes.length > 0 ? (
                  topTypes.map(([type, count], i) => {
                    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                    const colors = [
                      "bg-blue-500",
                      "bg-green-500",
                      "bg-yellow-500",
                      "bg-purple-500",
                      "bg-red-400",
                    ];
                    return (
                      <div key={type}>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-700 text-sm">{type}</span>
                          <span className="text-gray-500 text-sm">{count} ({pct}%)</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${colors[i]} rounded-full`}
                            style={{ width: `${pct * 2}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400">No data available</p>
                )}
              </div>
            </div>
          </div>

          {/* Status Breakdown Table */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Department Status Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Department</th>
                    <th className="text-center py-3 px-4 text-yellow-600 font-medium">Pending</th>
                    <th className="text-center py-3 px-4 text-blue-600 font-medium">In Progress</th>
                    <th className="text-center py-3 px-4 text-green-600 font-medium">Resolved</th>
                    <th className="text-center py-3 px-4 text-gray-500 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept) => {
                    const deptComplaints = complaints.filter((c) => c.department === dept);
                    return (
                      <tr key={dept} className="border-b border-gray-50 hover:bg-gray-50 transition">
                        <td className="py-3 px-4 font-medium text-gray-900">{dept}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                            {deptComplaints.filter((c) => c.status === "Pending").length}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                            {deptComplaints.filter((c) => c.status === "In Progress").length}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                            {deptComplaints.filter((c) => c.status === "Resolved").length}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-medium text-gray-700">
                          {deptComplaints.length}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
