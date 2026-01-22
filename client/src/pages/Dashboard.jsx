import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 2xl:px-20 py-4 flex items-center justify-between">
          <img
            onClick={() => navigate("/")}
            src={assets.logo}
            alt="Logo"
            className="h-8 sm:h-9 cursor-pointer"
          />

          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer">
              <p className="text-sm text-slate-700">
                Welcome,{" "}
                <span className="font-semibold text-slate-800">Suhail</span>
              </p>
              <img
                src={assets.company_icon}
                alt=""
                className="h-7 w-7 rounded-lg bg-white object-contain"
              />
            </div>

            <div className="absolute right-0 top-full z-50 hidden group-hover:block pt-2">
              <button
                onClick={() => alert("Logout clicked")}
                className="group/logout flex w-full cursor-pointer items-center gap-2 rounded-lg border-1 border-slate-200 bg-white px-5 py-3 text-sm transition-all hover:border-red-200 hover:bg-red-50 shadow-sm"
              >
                <LogOut className="h-4 w-4 text-slate-500 transition-colors group-hover/logout:text-red-600" />
                <span className="font-medium text-slate-600 transition-colors group-hover/logout:text-red-600">
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside
          className={`bg-white border-r transition-all duration-300 ${
            collapsed ? "w-20" : "w-64"
          }`}
        >
          <div className="flex justify-end px-4 py-3">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded hover:bg-gray-100 cursor-pointer"
            >
              {collapsed ? (
                <ChevronRight size={18} />
              ) : (
                <ChevronLeft size={18} />
              )}
            </button>
          </div>

          <ul className="flex flex-col gap-1 px-2">
            <NavLink
              to="/dashboard/add-job"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-gray-100 ${
                  isActive ? "bg-blue-100 text-blue-600 font-medium" : ""
                }`
              }
            >
              <img src={assets.add_icon} alt="" className="w-5 h-5" />
              {!collapsed && <p>Add Job</p>}
            </NavLink>

            <NavLink
              to="/dashboard/manage-jobs"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-gray-100 ${
                  isActive ? "bg-blue-100 text-blue-600 font-medium" : ""
                }`
              }
            >
              <img src={assets.home_icon} alt="" className="w-5 h-5" />
              {!collapsed && <p>Manage Jobs</p>}
            </NavLink>

            <NavLink
              to="/dashboard/view-applications"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-gray-100 ${
                  isActive ? "bg-blue-100 text-blue-600 font-medium" : ""
                }`
              }
            >
              <img src={assets.person_tick_icon} alt="" className="w-5 h-5" />
              {!collapsed && <p>View Applications</p>}
            </NavLink>
          </ul>
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
