import { useNavigate } from "react-router";

export function A() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#07163A] text-white p-7 hidden md:block">
        <h1 className="text-4xl font-bold mb-12">SOLVIX</h1>

        <nav className="space-y-3">
          <div
            onClick={() => navigate("/manager")}
            className="px-5 py-4 text-gray-300 hover:bg-white/5 hover:text-white rounded-2xl cursor-pointer transition"
          >
            Dashboard
          </div>

          <div className="bg-white/10 rounded-2xl px-5 py-4 cursor-pointer transition hover:bg-white/20">
            Analytics
          </div>

          <div className="px-5 py-4 text-gray-300 hover:bg-white/5 hover:text-white rounded-2xl cursor-pointer transition">
            Departments
          </div>

          <div className="px-5 py-4 text-gray-300 hover:bg-white/5 hover:text-white rounded-2xl cursor-pointer transition">
            Settings
          </div>
        </nav>

        {/* Logout */}
        <div className="mt-20">
          <button
            onClick={() => navigate("/")}
            className="w-full px-5 py-4 text-left text-red-300 hover:bg-red-500/10 hover:text-red-200 rounded-2xl transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <h1 className="text-6xl font-bold tracking-tight text-gray-900 mb-3">
            Analytics Dashboard
          </h1>

          <p className="text-gray-500 mb-10 text-lg">
            Complaint insights and performance overview
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <p className="text-sm text-gray-500 mb-3">
                Resolution Rate
              </p>

              <h2 className="text-5xl font-bold text-green-600">
                84%
              </h2>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <p className="text-sm text-gray-500 mb-3">
                Avg Response Time
              </p>

              <h2 className="text-5xl font-bold text-blue-600">
                2.4h
              </h2>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <p className="text-sm text-gray-500 mb-3">
                Customer Satisfaction
              </p>

              <h2 className="text-5xl font-bold text-purple-600">
                4.8
              </h2>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">
              Complaints by Department
            </h3>

            <div className="space-y-6">
              {/* Logistics */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">
                    Logistics
                  </span>

                  <span className="text-gray-500">40%</span>
                </div>

                <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-[40%] bg-blue-500"></div>
                </div>
              </div>

              {/* Returns */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Returns</span>

                  <span className="text-gray-500">25%</span>
                </div>

                <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-[25%] bg-green-500"></div>
                </div>
              </div>

              {/* Finance */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Finance</span>

                  <span className="text-gray-500">18%</span>
                </div>

                <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-[18%] bg-yellow-500"></div>
                </div>
              </div>

              {/* Technical */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">
                    Technical Support
                  </span>

                  <span className="text-gray-500">17%</span>
                </div>

                <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-[17%] bg-purple-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}