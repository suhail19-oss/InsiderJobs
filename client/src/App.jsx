import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import RecruiterLogin from "./components/RecruiterLogin";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";
import AddJob from "./pages/AddJob";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import "quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { showRecruiterLogin, setShowRecruiterLogin } = useContext(AppContext);

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />

      <div
        className={`transition-all duration-300 ${
          showRecruiterLogin ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/apply-job/:id" element={<ApplyJob />} />
            <Route path="/applications" element={<Applications />} />
          </Route>

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="add-job" element={<AddJob />} />
              <Route path="manage-jobs" element={<ManageJobs />} />
              <Route path="view-applications" element={<ViewApplications />} />
            </Route>
          </Route>
        </Routes>
      </div>

      {showRecruiterLogin && (
        <RecruiterLogin onClose={() => setShowRecruiterLogin(false)} />
      )}
    </>
  );
}

export default App;
