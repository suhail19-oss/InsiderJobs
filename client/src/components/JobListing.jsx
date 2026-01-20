import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

function JobListing() {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const JOBS_PER_PAGE = 6;
  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location],
    );
  };

  const clearFilters = () => {
    setSearchFilter({ title: "", location: "" });
    setSelectedCategories([]);
    setSelectedLocations([]);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto 2xl:px-20 px-4 pb-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 sticky top-24 max-h-[calc(100vh-6rem)] flex flex-col">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">Filters</h2>
                  {(isSearched ||
                    selectedCategories.length > 0 ||
                    selectedLocations.length > 0) && (
                    <button
                      onClick={clearFilters}
                      className="text-xs font-medium text-blue-600 hover:text-blue-800 underline underline-offset-4"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {isSearched &&
                  (searchFilter.title || searchFilter.location) && (
                    <div className="mb-8">
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                        Active Search
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {searchFilter.title && (
                          <span className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            {searchFilter.title}
                            <img
                              src={assets.cross_icon}
                              alt=""
                              className="w-3 h-3 cursor-pointer opacity-60 hover:opacity-100"
                              onClick={() =>
                                setSearchFilter((prev) => ({
                                  ...prev,
                                  title: "",
                                }))
                              }
                            />
                          </span>
                        )}
                        {searchFilter.location && (
                          <span className="flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-medium">
                            {searchFilter.location}
                            <img
                              src={assets.cross_icon}
                              alt=""
                              className="w-3 h-3 cursor-pointer opacity-60 hover:opacity-100"
                              onClick={() =>
                                setSearchFilter((prev) => ({
                                  ...prev,
                                  location: "",
                                }))
                              }
                            />
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                <button
                  onClick={() => setShowFilter((prev) => !prev)}
                  className="mb-6 px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium lg:hidden"
                >
                  {showFilter ? "Close" : "Filters"}
                </button>

                <div className={`${showFilter ? "block" : "hidden"} lg:block`}>
                  <div className="mb-10">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                      Categories
                    </h4>
                    <ul className="space-y-2">
                      {JobCategories.map((category, index) => {
                        const isChecked = selectedCategories.includes(category);
                        return (
                          <li key={index}>
                            <label
                              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                                isChecked
                                  ? "bg-blue-50 text-blue-700"
                                  : "hover:bg-slate-50 text-slate-700"
                              }`}
                            >
                              {isChecked && (
                                <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-blue-600" />
                              )}
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleCategoryChange(category)}
                                className="hidden"
                              />
                              <div
                                className={`w-5 h-5 flex items-center justify-center rounded-md ${
                                  isChecked
                                    ? "bg-blue-600"
                                    : "bg-white border border-slate-300"
                                }`}
                              >
                                <svg
                                  className={`w-3.5 h-3.5 text-white ${
                                    isChecked ? "opacity-100" : "opacity-0"
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                              <span className="text-sm font-medium">
                                {category}
                              </span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                      Locations
                    </h4>
                    <ul className="space-y-2">
                      {JobLocations.map((location, index) => {
                        const isChecked = selectedLocations.includes(location);
                        return (
                          <li key={index}>
                            <label
                              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                                isChecked
                                  ? "bg-blue-50 text-blue-700"
                                  : "hover:bg-slate-50 text-slate-700"
                              }`}
                            >
                              {isChecked && (
                                <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-blue-600" />
                              )}
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleLocationChange(location)}
                                className="hidden"
                              />
                              <div
                                className={`w-5 h-5 flex items-center justify-center rounded-md ${
                                  isChecked
                                    ? "bg-blue-600"
                                    : "bg-white border border-slate-300"
                                }`}
                              >
                                <svg
                                  className={`w-3.5 h-3.5 text-white ${
                                    isChecked ? "opacity-100" : "opacity-0"
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                              <span className="text-sm font-medium">
                                {location}
                              </span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <section className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 min-h-[600px]">
              <h3 className="text-2xl font-bold text-slate-900" id="job-list">
                Latest Jobs
              </h3>
              <p className="text-sm text-slate-500 mt-1 mb-8">
                Find Opportunities from Top Companies Worldwide
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {jobs
                  .slice((currentPage - 1) * 6, currentPage * 6)
                  .map((job, index) => (
                    <JobCard key={index} job={job} />
                  ))}
              </div>
              {jobs.length > 0 && totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-2 rounded border border-slate-300 disabled:opacity-40"
                  >
                    <img src={assets.left_arrow_icon} alt="" />
                  </button>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded border text-sm font-medium transition ${
                          currentPage === page
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-slate-300 text-slate-600 hover:bg-slate-100"
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
                    className="p-2 rounded border border-slate-300 disabled:opacity-40"
                  >
                    <img src={assets.right_arrow_icon} alt="" />
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default JobListing;
