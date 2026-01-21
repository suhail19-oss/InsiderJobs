import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import RecuriterLogin from "./components/RecruiterLogin";
import Navbar from "./components/Navbar";
import { AppContext } from "./context/AppContext";

function App() {
  const { showRecruiterLogin, setShowRecruiterLogin } = useContext(AppContext);

  return (
    <>
      <div
        className={`transition-all duration-300 ${
          showRecruiterLogin ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply-job/:id" element={<ApplyJob />} />
          <Route path="/applications" element={<Applications />} />
        </Routes>
      </div>

      {showRecruiterLogin && (
        <RecuriterLogin onClose={() => setShowRecruiterLogin(false)} />
      )}
    </>
  );
}

export default App;
