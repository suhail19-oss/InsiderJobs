import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import moment from "moment";
import Footer from "../components/Footer.jsx";
import { AppContext } from "../context/AppContext.jsx";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

function Applications() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const JOBS_PER_PAGE = 6;

  const {
    backendUrl,
    userData,
    userApplications,
    fetchUserData,
    fetchUserApplications,
  } = useContext(AppContext);

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/user/update-resume",
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success(data.message || "Resume updated successfully");
        await fetchUserData();
        setIsEdit(false);
        setResume(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update resume");
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);

  const statusUI = {
    Pending: {
      label: "Under Review",
      className: "bg-yellow-100 text-yellow-600",
    },
    Accepted: {
      label: "Interview Scheduled",
      className: "bg-indigo-50 text-indigo-700",
    },
    "Interview Scheduled": {
      label: "Interview Scheduled",
      className: "bg-indigo-50 text-indigo-700",
    },
    "Application Closed": {
      label: "Rejected",
      className: "bg-red-100 text-red-700",
    },
  };

  const validApplications = userApplications
    .filter((job) => job.jobId && job.companyId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const totalPages = Math.ceil(validApplications.length / JOBS_PER_PAGE);

  const paginatedApplications = validApplications.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE,
  );

  return (
    <>
      <div className="min-h-[65vh] bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 2xl:px-20 py-10 space-y-10">
          {/* Resume Section (unchanged) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
              Your Resume
            </h2>

            {isEdit || (userData && userData.resume === "") ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <label
                  htmlFor="resumeUpload"
                  className="flex items-center gap-3 px-4 py-2 border border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition"
                >
                  <img
                    src={assets.profile_upload_icon}
                    alt=""
                    className="h-6 w-6"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {resume ? resume.name : "Select Resume (PDF)"}
                  </span>
                  <input
                    id="resumeUpload"
                    onChange={(e) => setResume(e.target.files[0])}
                    accept="application/pdf"
                    type="file"
                    hidden
                  />
                </label>

                <button
                  onClick={updateResume}
                  disabled={!resume}
                  className="px-6 py-2 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={userData?.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl border bg-indigo-50 text-indigo-700 font-medium hover:bg-indigo-100 transition cursor-pointer"
                >
                  View Resume
                </a>

                <button
                  onClick={() => setIsEdit(true)}
                  className="px-5 py-2 rounded-xl border text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Jobs Applied */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              Jobs Applied
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-sm font-medium text-slate-600">
                    <th className="px-4 py-3">S. No.</th>
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">Job Detail</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedApplications.map((job, index) => (
                    <tr
                      key={job._id || index}
                      className="border-t border-slate-200 text-sm hover:bg-slate-50 transition"
                    >
                      <td className="px-7 py-4 text-slate-700">
                        {(currentPage - 1) * JOBS_PER_PAGE + index + 1}.
                      </td>

                      <td className="px-4 py-4 flex items-center gap-3 font-medium text-slate-800">
                        <img
                          src={
                            job.companyId?.image || assets.company_placeholder
                          }
                          alt=""
                          className="h-8 w-8 rounded-md object-contain bg-white"
                        />
                        {job.companyId?.name || "Company removed"}
                      </td>

                      <td className="px-4 py-4">
                        {job.jobId?.title || "Job not available"}
                      </td>

                      <td className="px-4 py-4">
                        {job.jobId?.location || "—"}
                      </td>

                      <td className="px-4 py-4">
                        {moment(job.date).format("ll")}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            statusUI[job.status]?.className || ""
                          }`}
                        >
                          {statusUI[job.status]?.label || job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-2 rounded border border-slate-300 disabled:opacity-40 cursor-pointer"
              >
                <img src={assets.left_arrow_icon} alt="" />
              </button>

              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded border text-sm font-medium ${
                      currentPage === page
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-slate-300 text-slate-600 hover:bg-slate-100 cursor-pointer"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="p-2 rounded border border-slate-300 disabled:opacity-40 cursor-pointer"
              >
                <img src={assets.right_arrow_icon} alt="" />
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Applications;
