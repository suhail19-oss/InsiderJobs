import { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { JobCategories, JobLocations } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

function AddJob() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner Level");
  const [salary, setSalary] = useState("");
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { backendUrl, companyToken } = useContext(AppContext);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder:
          "Enter Detailed Job Description, Requirements, and Responsibilities.",
      });
    }
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const description = quillRef.current.root.innerHTML;

      const { data } = await axios.post(
        backendUrl + "/api/company/post-job",
        {
          title,
          description,
          location,
          salary,
          category,
          level,
        },
        {
          headers: { token: companyToken },
        },
      );

      if (data.success) {
        toast.success(data.message || "Job Added Successfully 🎉");

        setTitle("");
        setSalary("");
        setCategory("Programming");
        setLocation("Bangalore");
        setLevel("Beginner Level");
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message || "Failed to Add Job");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while Adding the Job",
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10">
      <form
        onSubmit={onSubmitHandler}
        className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-12"
      >
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Create Job Post</h1>
          <p className="mt-2 text-slate-500">
            Provide the Information Below to List a New Opening.
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Job Title
            </label>
            <input
              type="text"
              placeholder="e.g. Senior Product Designer"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Job Description
            </label>
            <div className="rounded-xl border border-slate-300 transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
              <style>{`
                .ql-container { min-height: 250px; font-size: 16px; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; }
                .ql-toolbar { border-top-left-radius: 12px; border-top-right-radius: 12px; border-color: transparent !important; border-bottom: 1px solid #cbd5e1 !important; }
                .ql-container.ql-snow { border: none !important; }
              `}</style>
              <div ref={editorRef}></div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              >
                {JobCategories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              >
                {JobLocations.map((loc, index) => (
                  <option key={index} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="Beginner Level">Beginner Level</option>
                <option value="Intermediate Level">Intermediate Level</option>
                <option value="Senior Level">Senior Level</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Annual Salary
              </label>
              <input
                type="number"
                min={0}
                placeholder="0"
                value={salary}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "") {
                    setSalary("");
                  } else {
                    setSalary(Math.max(0, Number(value)));
                  }
                }}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all shadow-sm active:scale-95 cursor-pointer">
              Post Job
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddJob;
