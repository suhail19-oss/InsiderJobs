import { assets } from "../assets/assets.js";

function JobCard({ job }) {
  return (
    <div className="group bg-white border border-slate-100 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <img
          src={assets.company_icon}
          alt=""
          className="w-12 h-12 object-contain"
        />
      </div>

      <h4 className="text-lg font-semibold text-slate-900 mb-2 transition-colors group-hover:text-blue-700">
        {job.title}
      </h4>

      <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-medium">
        <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full">
          {job.location}
        </span>
        <span className="bg-rose-50 text-rose-700 px-3 py-1.5 rounded-full">
          {job.level}
        </span>
      </div>

      <p
        className="text-sm text-slate-600 leading-relaxed mb-6"
        dangerouslySetInnerHTML={{
          __html: job.description.slice(0, 150) + "...",
        }}
      />

      <div className="flex items-center gap-3">
        <button className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition hover:shadow-md">
          Apply Now
        </button>

        <button className="flex-1 cursor-pointer border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-700 text-sm font-medium py-2.5 rounded-lg transition hover:shadow-md">
          Learn More
        </button>
      </div>
    </div>
  );
}

export default JobCard;
