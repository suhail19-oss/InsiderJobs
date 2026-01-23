import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

function ViewApplications() {
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState(null);

  const fetchCompanyJobApplicants = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/applicants", {
        headers: {
          token: companyToken,
        },
      });

      if (data.success) {
        setApplicants([...data.applications].reverse());
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data?.message || "Failed to fetch applicants",
        );
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplicants();
    }
  }, [companyToken]);

  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-status`,
        { id, status },
        {
          headers: { token: companyToken },
        },
      );

      if (data.success) {
        toast.success("Status Updated Successfully");
        fetchCompanyJobApplicants();
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data?.message || "Failed to update application status",
        );
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

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

  const totalPages = Math.ceil(applicants.length / ITEMS_PER_PAGE);

  const paginatedApplicants = applicants
    .filter((item) => item.jobId && item.userId)
    .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) return <Loading />;

  if (applicants.length === 0) {
    return (
      <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-14 h-14 mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-2xl">
          📄
        </div>
        <h2 className="text-lg font-semibold text-slate-800">
          No Applications Yet
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-md">
          Applications submitted for your Job Postings will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-8 md:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">
          Candidate Applications
        </h1>
        <p className="text-slate-500 text-sm">
          Review and manage recent job applications.
        </p>
      </div>

      <div className="bg-white border border-slate-300 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-slate-50 z-10 border-b border-slate-200">
            <tr className="border-b border-slate-200">
              <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                S.No.
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                User Name
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-700 max-sm:hidden">
                Job Title
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-700 max-sm:hidden">
                Location
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                Resume
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {paginatedApplicants
              .filter((item) => item.jobId && item.userId)
              .map((applicant, index) => (
                <tr
                  key={applicant._id || index}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-slate-700">
                    {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}.
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        src={applicant.userId.image}
                        alt=""
                      />
                      <span className="text-sm font-medium text-slate-700">
                        {applicant.userId.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-700 max-sm:hidden">
                    {applicant.jobId.title}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-700 max-sm:hidden">
                    {applicant.jobId.location}
                  </td>

                  <td className="px-6 py-4">
                    <a
                      href={applicant.userId.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      Resume
                      <img
                        className="h-3 w-3"
                        src={assets.resume_download_icon}
                        alt=""
                      />
                    </a>
                  </td>

                  <td className="px-6 py-4 text-center">
                    {applicant.status === "Pending" ? (
                      <div className="relative inline-block">
                        <button
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === applicant._id
                                ? null
                                : applicant._id,
                            )
                          }
                          className="p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
                        >
                          <span className="text-xl leading-none cursor-pointer">
                            ...
                          </span>
                        </button>

                        {openMenuId === applicant._id && (
                          <div
                            className="absolute right-0 top-full mt-1 w-48
                   bg-white border border-slate-200 rounded-xl shadow-lg py-1
                   z-[100]"
                          >
                            <button
                              onClick={() => {
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "Interview Scheduled",
                                );
                                setOpenMenuId(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm
                     text-indigo-600 hover:bg-indigo-50
                     transition-colors cursor-pointer"
                            >
                              📅 Shortlist for Interview
                            </button>

                            <button
                              onClick={() => {
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "Application Closed",
                                );
                                setOpenMenuId(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm
                     text-slate-600 hover:bg-slate-100
                     transition-colors cursor-pointer"
                            >
                              ❌ Not Proceeding
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
      ${statusUI[applicant.status]?.className || "bg-slate-100 text-slate-600"}
    `}
                      >
                        {statusUI[applicant.status]?.label || applicant.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-200 bg-slate-50">
          <p className="text-sm text-slate-600">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-1.5 text-sm font-medium rounded-md border
                 text-slate-600 bg-white hover:bg-slate-100
                 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-1.5 text-sm font-medium rounded-md border
                 text-slate-600 bg-white hover:bg-slate-100
                 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewApplications;
