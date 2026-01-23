import { ArrowRight, Briefcase, Layers, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DashboardHome() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="relative max-w-2xl w-full">
        {/* soft background glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-100/40 via-transparent to-transparent rounded-3xl blur-2xl" />

        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-10 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome to your Dashboard 👋
          </h1>

          <p className="mt-3 text-slate-600 max-w-xl mx-auto">
            This is your recruiter workspace. Post jobs, manage listings, and
            review applications — all from one place.
          </p>

          {/* action cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            <div
              onClick={() => navigate("/dashboard/add-job")}
              className="group rounded-xl border border-slate-300 p-5 hover:shadow-md hover:border-indigo-300 transition cursor-pointer"
            >
              <div className="flex justify-center mb-3">
                <Briefcase className="h-6 w-6 text-slate-500 group-hover:text-indigo-600 transition" />
              </div>
              <h3 className="font-semibold text-slate-800 text-center">
                Post a Job
              </h3>
              <p className="text-sm text-slate-600 mt-1 text-center">
                Create and publish a new job opening in minutes.
              </p>
            </div>

            <div
              onClick={() => navigate("/dashboard/manage-jobs")}
              className="group rounded-xl border border-slate-300 p-5 hover:shadow-md hover:border-indigo-300 transition cursor-pointer"
            >
              <div className="flex justify-center mb-3">
                <Layers className="h-6 w-6 text-slate-500 group-hover:text-indigo-600 transition" />
              </div>
              <h3 className="font-semibold text-slate-800 text-center">
                Manage Jobs
              </h3>
              <p className="text-sm text-slate-600 mt-1 text-center">
                Edit, hide, or track all your job postings.
              </p>
            </div>

            <div
              onClick={() => navigate("/dashboard/view-applications")}
              className="group rounded-xl border border-slate-300 p-5 hover:shadow-md hover:border-indigo-300 transition cursor-pointer"
            >
              <div className="flex justify-center mb-3">
                <Users className="h-6 w-6 text-slate-500 group-hover:text-indigo-600 transition" />
              </div>
              <h3 className="font-semibold text-slate-800 text-center">
                Review Applications
              </h3>
              <p className="text-sm text-slate-600 mt-1 text-center">
                See who applied and take action quickly.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/dashboard/add-job")}
            className="mt-10 inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-7 py-3 rounded-xl font-semibold transition active:scale-95 cursor-pointer"
          >
            Post Your Job <ArrowRight size={18} />
          </button>

          <p className="mt-4 text-xs text-slate-500">
            Tip: Start by posting a job — applicants will appear here instantly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
