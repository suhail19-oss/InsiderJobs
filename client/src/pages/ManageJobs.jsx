import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

function ManageJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(false);
  const { backendUrl, companyToken } = useContext(AppContext);

  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/list-jobs", {
        headers: { token: companyToken },
      });

      if (data.success) {
        setJobs([...data.jobsData].reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch Jobs");
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);

  const changeVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-visibility",
        { id },
        { headers: { token: companyToken } },
      );

      if (data.success) {
        toast.success(data.message || "Visibility Updated Successfully");
        fetchCompanyJobs();
      } else {
        toast.error(data.message || "Failed to Update Visibility");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while Updating Visibility",
      );
    }
  };

  return jobs ? (
    jobs.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-2xl">
          📋
        </div>

        <h2 className="text-xl font-semibold text-slate-800">
          No Jobs Posted Yet
        </h2>

        <p className="text-sm text-slate-500 mt-2 max-w-md">
          Create your first Job to start receiving applications from candidates.
        </p>

        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="mt-6 bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          Post a Job
        </button>
      </div>
    ) : (
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
                {jobs.map((job, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-9 py-4 text-sm text-slate-600">
                      {index + 1}.
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
                        onChange={() => changeVisibility(job._id)}
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                        checked={job.visible}
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
    )
  ) : (
    <Loading />
  );
}

export default ManageJobs;
