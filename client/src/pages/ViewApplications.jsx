import { assets, viewApplicationsPageData } from "../assets/assets";

function ViewApplications() {
  return (
    <div className="container mx-auto p-4 pt-8 md:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">
          Candidate Applications
        </h1>
        <p className="text-slate-500 text-sm">
          Review and Manage Recent Job Applications.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-visible">
        <div className="overflow-x-auto overflow-y-visible">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
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

            <tbody className="divide-y divide-slate-100">
              {viewApplicationsPageData.map((applicant, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-9 py-4 text-sm text-slate-600">
                    {index + 1}.
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        src={applicant.imgSrc}
                        alt=""
                      />
                      <span className="text-sm font-medium text-slate-800">
                        {applicant.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600 max-sm:hidden">
                    {applicant.jobTitle}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600 max-sm:hidden">
                    {applicant.location}
                  </td>

                  <td className="px-6 py-4">
                    <a
                      href=""
                      target="_blank"
                      className="inline-flex items-center gap-2 px-3 py-1.5
                                 bg-blue-50 text-blue-600 text-xs font-semibold
                                 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      Resume
                      <img
                        className="h-3 w-3"
                        src={assets.resume_download_icon}
                        alt=""
                      />
                    </a>
                  </td>

                  {/* ACTION MENU */}
                  <td className="px-6 py-4 text-center overflow-visible">
                    <div className="relative inline-block group/action">
                      <button
                        className="p-2 rounded-full text-slate-400
                                   hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <span className="text-xl leading-none">...</span>
                      </button>

                      <div
                        className="absolute right-0 top-full mt-1 w-32
                                   opacity-0 invisible scale-95
                                   group-hover/action:opacity-100
                                   group-hover/action:visible
                                   group-hover/action:scale-100
                                   transition-all duration-150
                                   bg-white border border-slate-200
                                   rounded-lg shadow-lg py-1 z-50"
                      >
                        <button
                          className="w-full px-4 py-2 text-left text-sm
                                     text-emerald-600 hover:bg-emerald-50
                                     transition-colors cursor-pointer"
                        >
                          Accept
                        </button>

                        <button
                          className="w-full px-4 py-2 text-left text-sm
                                     text-red-600 hover:bg-red-50
                                     transition-colors cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewApplications;
