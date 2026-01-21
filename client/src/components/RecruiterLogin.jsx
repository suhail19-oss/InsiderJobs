import { useState } from "react";
import { assets } from "../assets/assets";

function RecruiterLogin({ onClose }) {
  const [state, setState] = useState("Signup");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(false);
  const [isTextSubmiited, setIsTextSubmitted] = useState(false);
  return (
    <div
      className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-xl border-2 border-slate-700 shadow-sm p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
        >
          ✕
        </button>

        <h1 className="text-2xl font-semibold text-slate-800 text-center">
          Recruiter {state}
        </h1>
        <p className="text-sm text-slate-600 text-center mt-2 mb-8">
          {state === "Login"
            ? "Welcome back! Please sign in to continue."
            : "Create your recruiter account to get started."}
        </p>

        <form className="space-y-5">
          {state === "Signup" && (
            <div className="flex items-center gap-3 border border-slate-300 rounded-xl px-4 py-2 focus-within:border-indigo-500">
              <img
                src={assets.person_icon}
                alt=""
                className="h-5 w-5 opacity-70"
              />
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Company Name"
                required
                className="w-full outline-none text-sm text-slate-700 placeholder-slate-400"
              />
            </div>
          )}

          <div className="flex items-center gap-3 border border-slate-300 rounded-xl px-4 py-2 focus-within:border-indigo-500">
            <img
              src={assets.email_icon}
              alt=""
              className="h-5 w-5 opacity-70"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email ID"
              required
              className="w-full outline-none text-sm text-slate-700 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-3 border border-slate-300 rounded-xl px-4 py-2 focus-within:border-indigo-500">
            <img src={assets.lock_icon} alt="" className="h-5 w-5 opacity-70" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
              className="w-full outline-none text-sm text-slate-700 placeholder-slate-400"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white py-2.5 rounded-xl font-semibold transition-all active:scale-95"
          >
            {state === "Login" ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-slate-600">
          {state === "Login" ? (
            <p>
              Don’t have an account?{" "}
              <button
                onClick={() => setState("Signup")}
                className="text-indigo-600 font-medium hover:underline cursor-pointer"
              >
                Create Account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setState("Login")}
                className="text-indigo-600 font-medium hover:underline cursor-pointer"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecruiterLogin;
