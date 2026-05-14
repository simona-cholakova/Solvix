import { useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  MessageSquare,
  BarChart2,
  Building2,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/manager", icon: LayoutDashboard },
  { label: "Complaints", path: "/manager/complaints", icon: MessageSquare },
  { label: "Analytics", path: "/manager/analytics", icon: BarChart2 },
  { label: "Departments", path: "/manager/departments", icon: Building2 },
  { label: "Settings", path: "/manager/settings", icon: Settings },
];

export function ManagerSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-64 bg-[#07163A] text-white p-7 hidden md:flex flex-col flex-shrink-0">
      <h1 className="text-4xl font-bold mb-12">SOLVIX</h1>

      <nav className="space-y-2 flex-1">
        {navItems.map(({ label, path, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <div
              key={path}
              onClick={() => navigate(path)}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl cursor-pointer transition ${
                isActive
                  ? "bg-white/15 text-white"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </div>
          );
        })}
      </nav>

      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-3 w-full px-5 py-4 text-left text-red-300 hover:bg-red-500/10 hover:text-red-200 rounded-2xl transition mt-6"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
