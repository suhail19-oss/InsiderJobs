import express from "express";
import {
  registerCompany,
  loginCompany,
  getCompanyData,
  postJob,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  changeJobApplicationStatus,
  changeVisibility,
} from "../controllers/companycontroller.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/register", upload.single("image"), registerCompany);
router.post("/login", loginCompany);
router.get("/company", getCompanyData);
router.post("/post-job", postJob);
router.get("/applicants", getCompanyJobApplicants);
router.get("/list-jobs", getCompanyPostedJobs);
router.post("/change-status", changeJobApplicationStatus);
router.post("/change-visibility", changeVisibility);

export default router;
