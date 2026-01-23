import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import Loading from "../components/Loading.jsx";
import { assets, JobCategories } from "../assets/assets.js";
import moment from "moment";
import JobCard from "../components/JobCard.jsx";
import Footer from "../components/Footer.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

function ApplyJob() {
  const { id } = useParams();
  const [JobData, setJobData] = useState(null);
  const [applied, setApplied] = useState(false);
  const { jobs, backendUrl, userData, userApplications } =
    useContext(AppContext);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`);

      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch Job Details",
      );
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  const applyHandler = async () => {
    try {
      if (!userData) {
        toast.error("Login first to apply for Jobs.");
        return;
      }

      if (!userData.resume) {
        toast.error("Upload your resume to apply for Jobs.");
        navigate("/applications");
        return;
      }

      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/user/apply",
        { jobId: JobData._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message || "Applied Successfully 🎉");
        setApplied(true);
      } else {
        toast.error(data.message || "Failed to apply for Job");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  const formatCTC = (salary) => {
    if (!salary) return "0k";
    const value = (salary / 1000).toFixed(2);
    return `${parseFloat(value)}k`;
  };

  return JobData ? (
    <>
      <div className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="bg-white border-2 border-slate-300 rounded-lg shadow-none overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 px-8 py-10 bg-slate-100">
              <div className="flex items-start gap-6">
                <img
                  className="h-20 w-20 bg-white rounded-xl p-3 border border-slate-300 object-contain"
                  src={JobData.companyId.image}
                  alt=""
                />

                <div className="space-y-3">
                  <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800">
                    {JobData.title}
                  </h1>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-800">
                    <span className="flex items-center gap-1 font-medium">
                      <img src={assets.suitcase_icon} alt="" />
                      {JobData.companyId.name}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <img src={assets.location_icon} alt="" />
                      {JobData.location}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <img src={assets.person_icon} alt="" />
                      {JobData.level}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <img src={assets.money_icon} alt="" />
                      {formatCTC(JobData.salary)} CTC
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 min-w-[180px] self-center">
                <button
                  onClick={applyHandler}
                  disabled={applied}
                  className="
    px-12 py-3 rounded-lg font-semibold transition-all
    bg-indigo-600 text-white hover:bg-indigo-700
    active:scale-95

    disabled:bg-slate-300
    disabled:text-slate-500
    disabled:cursor-not-allowed
    disabled:active:scale-100 cursor-pointer
  "
                >
                  {applied ? "Already Applied" : "Apply Now"}
                </button>

                <p className="text-sm text-slate-600">
                  Posted {moment(JobData.date).fromNow()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-2/3">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Job Description
              </h2>

              <div
                className="
    rich-text
    text-slate-800
    leading-relaxed
    space-y-6

    [&_h2]:mt-5
    [&_h2]:mb-3
    [&_h2]:text-lg
    [&_h2]:text-slate-800

    [&_ol]:list-decimal
    [&_ol]:pl-6
    [&_ol]:space-y-2

    [&_li]:ml-1
  "
                dangerouslySetInnerHTML={{ __html: JobData.description }}
              />

              <button
                onClick={applyHandler}
                disabled={applied}
                className="
    mt-10 px-12 py-3 rounded-lg font-semibold transition-all
    bg-indigo-600 text-white hover:bg-indigo-700
    active:scale-95

    disabled:bg-slate-300
    disabled:text-slate-500
    disabled:cursor-not-allowed
    disabled:active:scale-100 cursor-pointer
  "
              >
                {applied ? "Already Applied" : "Apply Now"}
              </button>
            </div>

            <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5">
              <h2 className="text-xl font-bold text-slate-800 text-center">
                More Jobs from {JobData.companyId.name}
              </h2>

              {jobs
                .filter(
                  (job) =>
                    job._id !== JobData._id &&
                    job.companyId._id === JobData.companyId._id,
                )
                .slice(0, 4)
                .map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
}

export default ApplyJob;
