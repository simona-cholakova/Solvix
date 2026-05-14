import { useState } from "react";
import { useNavigate } from "react-router";
import { User } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function C() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigate("/client");
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
          <div className="w-20 h-20 rounded-2xl bg-gray-900 flex items-center justify-center mx-auto mb-6">
            <User
              size={36}
              className="text-white"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">
              Client Login
            </h1>

            <p className="text-gray-500">
              Track and manage your complaints easily
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
                placeholder="client@email.com"
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

              <button className="text-gray-900 hover:underline">
                Forgot Password?
              </button>
            </div>

            <Button
              onClick={handleLogin}
              className="w-full rounded-xl py-6 bg-gray-900 hover:bg-gray-800 text-lg transition"
            >
              Login as Client
            </Button>

            <p className="text-center text-sm text-gray-500 pt-2">
              Don’t have an account?{" "}
              <span className="text-gray-900 font-medium cursor-pointer hover:underline">
                Create Account
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}