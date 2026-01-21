import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

function Navbar() {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const { setShowRecruiterLogin } = useContext(AppContext);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4 2xl:px-20 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            onClick={() => navigate("/")}
            src={assets.logo}
            alt="Logo"
            className="h-8 sm:h-9 cursor-pointer"
          />
        </Link>

        {user ? (
          <div className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base">
            <Link
              to="/applications"
              className="
                text-gray-700
                font-medium
                hover:text-blue-600 hover:underline
                transition
              "
            >
              Applied Jobs
            </Link>

            <span className="hidden sm:block text-gray-300">|</span>

            <span className="hidden sm:block text-gray-700 font-medium">
              Hi, {user.firstName}
            </span>

            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <div className="flex items-center gap-3 sm:gap-5 text-sm">
            <button
              onClick={(e) => setShowRecruiterLogin(true)}
              className="
                px-4 py-2 rounded-full
                border border-gray-300
                text-gray-700
                hover:border-blue-600 hover:text-blue-600
                hover:bg-blue-50
                transition-all duration-200
                cursor-pointer
                font-medium
              "
            >
              Recruiter Login
            </button>

            <button
              onClick={openSignIn}
              className="
                px-6 sm:px-8 py-2 rounded-full
                bg-gradient-to-r from-blue-600 to-blue-700
                text-white
                font-semibold
                shadow-md
                hover:shadow-lg hover:scale-[1.02]
                active:scale-95
                transition-all duration-200
                cursor-pointer
              "
            >
              Login
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
