import { useNavigate } from "react-router";
import {
  Users,
  User,
  ShieldCheck,
  Clock3,
  MessageSquare,
} from "lucide-react";

import { Button } from "./ui/button";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm mb-6">
            <ShieldCheck
              size={16}
              className="text-green-600"
            />

            <span className="text-sm text-gray-600">
              Enterprise Complaint Management Platform
            </span>
          </div>

          <h1 className="text-7xl font-bold tracking-tight text-gray-900 mb-6">
            SOLVIX
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Modern customer complaint management system
            designed for efficient communication,
            complaint resolution, and customer support
            workflows.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
              <Clock3
                size={22}
                className="text-blue-600"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Real-Time Tracking
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              Monitor complaint statuses and updates in
              real time through a centralized dashboard.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
              <MessageSquare
                size={22}
                className="text-green-600"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Efficient Communication
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              Improve collaboration between departments
              and customer support managers.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
              <ShieldCheck
                size={22}
                className="text-purple-600"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Secure Complaint Handling
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              Manage sensitive customer complaints with a
              secure and structured workflow.
            </p>
          </div>
        </div>

        {/* Portal Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Manager Portal */}
          <div className="bg-white rounded-3xl border border-gray-200 p-10 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-2xl bg-[#0B1736] flex items-center justify-center mb-6">
                <Users size={44} className="text-white" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Manager Portal
              </h2>

              <p className="text-gray-600 leading-relaxed mb-8">
                Access the full management dashboard to
                review complaints, assign departments,
                monitor progress, and resolve customer
                issues efficiently.
              </p>

              <Button
                onClick={() => navigate("/manager-login")}
                className="w-full rounded-xl py-6 bg-[#0B1736] hover:bg-[#13234B] text-lg transition"
              >
                Enter as Manager
              </Button>
            </div>
          </div>

          {/* Client Portal */}
          <div className="bg-white rounded-3xl border border-gray-200 p-10 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-2xl bg-gray-900 flex items-center justify-center mb-6">
                <User size={44} className="text-white" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Client Portal
              </h2>

              <p className="text-gray-600 leading-relaxed mb-8">
                Submit new complaints, upload attachments,
                and track complaint progress through a
                simple and user-friendly interface.
              </p>

              <Button
                onClick={() => navigate("/client-login")}
                className="w-full rounded-xl py-6 bg-gray-900 hover:bg-gray-800 text-lg transition"
              >
                Enter as Client
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            SOLVIX — Zalando Customer Care Management
            System
          </p>
        </div>
      </div>
    </div>
  );
}