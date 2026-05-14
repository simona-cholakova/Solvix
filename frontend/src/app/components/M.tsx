import { useState } from "react";
import { useNavigate } from "react-router";
import { ShieldCheck } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function M() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigate("/manager");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="text-sm text-gray-500 hover:text-gray-900 mb-6 transition"
        >
          ← Back to Home
        </button>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-10 shadow-sm">
          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl bg-[#0B1736] flex items-center justify-center mx-auto mb-6">
            <ShieldCheck
              size={36}
              className="text-white"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">
              Manager Login
            </h1>

            <p className="text-gray-500">
              Access the complaint management dashboard
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Email Address
              </label>

              <Input
                type="email"
                placeholder="manager@solvix.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="rounded-xl border-gray-200 h-12"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Password
              </label>

              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="rounded-xl border-gray-200 h-12"
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" />
                Remember me
              </label>

              <button className="text-[#0B1736] hover:underline">
                Forgot Password?
              </button>
            </div>

            <Button
              onClick={handleLogin}
              className="w-full rounded-xl py-6 bg-[#0B1736] hover:bg-[#13234B] text-lg transition"
            >
              Login as Manager
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}