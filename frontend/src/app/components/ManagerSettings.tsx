import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Save,
  CheckCircle2,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ManagerSidebar } from "./ManagerSidebar";

type Tab = "profile" | "notifications" | "security" | "appearance";

export function ManagerSettings() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [saved, setSaved] = useState(false);

  // Profile state
  const [name, setName] = useState("Ema Čikotić");
  const [email, setEmail] = useState("ema.cikotic@solvix.com");
  const [role, setRole] = useState("Customer Care Manager");
  const [phone, setPhone] = useState("+385 91 234 5678");

  // Notifications state
  const [notifNewComplaint, setNotifNewComplaint] = useState(true);
  const [notifStatusChange, setNotifStatusChange] = useState(true);
  const [notifResolved, setNotifResolved] = useState(false);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifBrowser, setNotifBrowser] = useState(true);

  // Security state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Appearance state
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("Europe/Zagreb");
  const [dateFormat, setDateFormat] = useState("YYYY-MM-DD");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "profile", label: "Profile", icon: User },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "security", label: "Security", icon: Shield },
    { key: "appearance", label: "Appearance", icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ManagerSidebar />

      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-6xl font-bold tracking-tight text-gray-900">Settings</h1>
            <p className="text-gray-500 mt-4 text-lg">
              Manage your account preferences and system configuration
            </p>
          </div>

          {/* Success toast */}
          {saved && (
            <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 px-5 py-4 rounded-2xl shadow-sm">
              <CheckCircle2 size={20} className="text-green-600" />
              Settings saved successfully!
            </div>
          )}

          <div className="flex gap-6">
            {/* Tab nav */}
            <div className="w-48 flex-shrink-0">
              <div className="bg-white rounded-2xl border border-gray-200 p-3 shadow-sm space-y-1">
                {tabs.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition text-left ${
                      activeTab === key
                        ? "bg-[#07163A] text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div className="flex-1">
              {/* PROFILE */}
              {activeTab === "profile" && (
                <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>

                  {/* Avatar */}
                  <div className="flex items-center gap-5 mb-8 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-20 h-20 rounded-2xl bg-[#07163A] flex items-center justify-center text-white text-2xl font-bold">
                      EČ
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{name}</p>
                      <p className="text-sm text-gray-500">{role}</p>
                      <button className="mt-2 text-sm text-blue-600 hover:underline">
                        Change avatar
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Full Name</label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-xl border-gray-200 h-11"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Email Address</label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-xl border-gray-200 h-11"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Role / Title</label>
                      <Input
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="rounded-xl border-gray-200 h-11"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Phone Number</label>
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="rounded-xl border-gray-200 h-11"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={handleSave}
                      className="rounded-xl bg-[#07163A] hover:bg-[#0f2460] px-8"
                    >
                      <Save size={16} className="mr-2" />
                      Save Profile
                    </Button>
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS */}
              {activeTab === "notifications" && (
                <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                        Events
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            label: "New complaint submitted",
                            desc: "Get notified when a customer submits a new complaint",
                            value: notifNewComplaint,
                            set: setNotifNewComplaint,
                          },
                          {
                            label: "Status change",
                            desc: "When a complaint status is updated by an agent",
                            value: notifStatusChange,
                            set: setNotifStatusChange,
                          },
                          {
                            label: "Complaint resolved",
                            desc: "When a complaint is marked as resolved",
                            value: notifResolved,
                            set: setNotifResolved,
                          },
                        ].map(({ label, desc, value, set }) => (
                          <div
                            key={label}
                            className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100"
                          >
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{label}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                            </div>
                            <button
                              onClick={() => set(!value)}
                              className={`relative w-11 h-6 rounded-full transition-colors ${
                                value ? "bg-[#07163A]" : "bg-gray-200"
                              }`}
                            >
                              <div
                                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                                  value ? "translate-x-6" : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                        Delivery Channels
                      </h3>
                      <div className="space-y-3">
                        {[
                          { label: "Email notifications", value: notifEmail, set: setNotifEmail },
                          { label: "Browser notifications", value: notifBrowser, set: setNotifBrowser },
                        ].map(({ label, value, set }) => (
                          <div
                            key={label}
                            className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100"
                          >
                            <p className="font-medium text-gray-900 text-sm">{label}</p>
                            <button
                              onClick={() => set(!value)}
                              className={`relative w-11 h-6 rounded-full transition-colors ${
                                value ? "bg-[#07163A]" : "bg-gray-200"
                              }`}
                            >
                              <div
                                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                                  value ? "translate-x-6" : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={handleSave}
                      className="rounded-xl bg-[#07163A] hover:bg-[#0f2460] px-8"
                    >
                      <Save size={16} className="mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </div>
              )}

              {/* SECURITY */}
              {activeTab === "security" && (
                <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Current Password</label>
                      <Input
                        type="password"
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="rounded-xl border-gray-200 h-11"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">New Password</label>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="rounded-xl border-gray-200 h-11"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Confirm New Password</label>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="rounded-xl border-gray-200 h-11"
                      />
                      {newPassword && confirmPassword && newPassword !== confirmPassword && (
                        <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 p-5 bg-blue-50 border border-blue-200 rounded-2xl">
                    <h3 className="text-sm font-semibold text-blue-900 mb-2">Password Requirements</h3>
                    <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                      <li>Minimum 8 characters</li>
                      <li>At least one uppercase letter</li>
                      <li>At least one number</li>
                      <li>At least one special character</li>
                    </ul>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={handleSave}
                      disabled={
                        !currentPassword ||
                        !newPassword ||
                        newPassword !== confirmPassword
                      }
                      className="rounded-xl bg-[#07163A] hover:bg-[#0f2460] px-8 disabled:opacity-50"
                    >
                      <Save size={16} className="mr-2" />
                      Update Password
                    </Button>
                  </div>
                </div>
              )}

              {/* APPEARANCE */}
              {activeTab === "appearance" && (
                <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Appearance & Regional</h2>

                  <div className="space-y-6">
                    {/* Theme */}
                    <div>
                      <label className="block text-sm text-gray-500 mb-3">Theme</label>
                      <div className="grid grid-cols-2 gap-3">
                        {["light", "dark"].map((t) => (
                          <button
                            key={t}
                            onClick={() => setTheme(t)}
                            className={`p-4 rounded-xl border-2 transition text-sm font-medium capitalize ${
                              theme === t
                                ? "border-[#07163A] bg-[#07163A]/5 text-[#07163A]"
                                : "border-gray-200 text-gray-600 hover:border-gray-300"
                            }`}
                          >
                            {t === "light" ? "☀️ Light" : "🌙 Dark"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Language */}
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Language</label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 h-11 px-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#07163A]/20"
                      >
                        <option value="en">English</option>
                        <option value="de">Deutsch</option>
                        <option value="hr">Hrvatski</option>
                        <option value="fr">Français</option>
                      </select>
                    </div>

                    {/* Timezone */}
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Timezone</label>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 h-11 px-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#07163A]/20"
                      >
                        <option value="Europe/Zagreb">Europe/Zagreb (CET)</option>
                        <option value="Europe/Berlin">Europe/Berlin (CET)</option>
                        <option value="Europe/London">Europe/London (GMT)</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>

                    {/* Date format */}
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Date Format</label>
                      <div className="grid grid-cols-3 gap-3">
                        {["YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"].map((fmt) => (
                          <button
                            key={fmt}
                            onClick={() => setDateFormat(fmt)}
                            className={`p-3 rounded-xl border-2 transition text-xs font-mono ${
                              dateFormat === fmt
                                ? "border-[#07163A] bg-[#07163A]/5 text-[#07163A]"
                                : "border-gray-200 text-gray-600 hover:border-gray-300"
                            }`}
                          >
                            {fmt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={handleSave}
                      className="rounded-xl bg-[#07163A] hover:bg-[#0f2460] px-8"
                    >
                      <Save size={16} className="mr-2" />
                      Save Appearance
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
