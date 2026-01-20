import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import Loading from "../components/Loading.jsx";
import Navbar from "../components/Navbar.jsx";
import { assets } from "../assets/assets.js";
import kconvert from "k-convert";
import moment from "moment";

function ApplyJob() {
  const { id } = useParams();
  const [JobData, setJobData] = useState(null);
  const { jobs } = useContext(AppContext);

  const fetchJob = async () => {
    const data = jobs.filter((job) => job._id === id);
    if (data.length !== 0) {
      setJobData(data[0]);
    }
  };

  useEffect(() => {
    if (jobs.length > 0) {
      fetchJob();
    }
  }, [id, jobs]);

  return JobData ? (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row justify-between gap-10 px-10 py-12 bg-slate-100 border-b border-slate-200 rounded-t-3xl">
              <div className="flex items-start gap-6">
                <img
                  className="h-20 w-20 bg-white rounded-lg p-3 border object-contain"
                  src={JobData.companyId.image}
                  alt=""
                />
                <div>
                  <h1 className="text-2xl font-semibold text-slate-800">
                    {JobData.title}
                  </h1>
                  <div className="flex flex-wrap gap-5 text-sm text-slate-600 mt-3">
                    <span className="flex items-center gap-1 font-medium text-slate-800">
                      <img src={assets.suitcase_icon} alt="" />
                      {JobData.companyId.name}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-slate-800">
                      <img src={assets.location_icon} alt="" />
                      {JobData.location}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-slate-800">
                      <img src={assets.person_icon} alt="" />
                      {JobData.level}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-slate-800">
                      <img src={assets.money_icon} alt="" />
                      {kconvert.convertTo(JobData.salary)} CTC
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-2.5 rounded-full font-medium transition cursor-pointer">
                  Apply Now
                </button>
                <p className="text-sm text-slate-800">
                  Posted {moment(JobData.date).fromNow()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default ApplyJob;
