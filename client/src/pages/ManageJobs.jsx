import { manageJobsData } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function ManageJobs() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto p-4 pt-8 md:px-10">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Manage Jobs</h1>
        <p className="text-slate-500 text-sm">
          View and manage your active job listings.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto hide-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap">
                  S.No.
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap">
                  Job Title
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap">
                  Date
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap">
                  Location
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-center whitespace-nowrap">
                  Applicants
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-center whitespace-nowrap">
                  Visible
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {manageJobsData.map((job, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800 whitespace-nowrap">
                    {job.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                    {job.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 text-center whitespace-nowrap">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                      {job.applicants}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          Add New Job
        </button>
      </div>
    </div>
  );
}

export default ManageJobs;
