import { useContext, useState } from "react";
import { assets, jobsApplied } from "../assets/assets.js";
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
  const { backendUrl, userData, userApplications, fetchUserData } =
    useContext(AppContext);
  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);

      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/user/update-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
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

  return (
    <>
      <div className="min-h-[65vh] bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 2xl:px-20 py-10 space-y-10">
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
                  className="
    px-6 py-2 rounded-xl font-semibold transition-all
    active:scale-95

    bg-indigo-600 text-white hover:bg-indigo-700
    disabled:bg-slate-300 disabled:text-slate-500
    disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer
  "
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
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-slate-300 bg-indigo-50 text-indigo-700 font-medium hover:bg-indigo-100 transition"
                >
                  View Resume
                </a>

                <button
                  onClick={() => setIsEdit(true)}
                  className="px-5 py-2 rounded-xl border border-slate-300 text-slate-600 font-medium hover:bg-slate-100 transition cursor-pointer"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              Jobs Applied
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-left text-sm font-medium text-slate-600">
                    <th className="px-4 py-3">S. No.</th>
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">Job Detail</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {jobsApplied.map((job, index) => (
                    <tr
                      key={index}
                      className="border-t border-slate-200 text-sm hover:bg-slate-50 transition"
                    >
                      <td className="px-7 py-4 text-slate-700 ">
                        {index + 1}.
                      </td>

                      <td className="px-4 py-4 flex items-center gap-3 font-medium text-slate-800">
                        <img
                          src={job.logo}
                          alt=""
                          className="h-8 w-8 rounded-md object-contain bg-white"
                        />
                        {job.company}
                      </td>

                      <td className="px-4 py-4 text-slate-700">{job.title}</td>

                      <td className="px-4 py-4 text-slate-700">
                        {job.location}
                      </td>

                      <td className="px-4 py-4 text-slate-600">
                        {moment(job.date).format("ll")}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                            ${
                              job.status === "Accepted"
                                ? "bg-green-100 text-green-700"
                                : job.status === "Rejected"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Applications;
