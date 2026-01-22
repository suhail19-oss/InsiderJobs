import express from "express";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume,
} from "../controllers/usercontroller.js";
import upload from "../config/multer.js";

const router = express.Router();

router.get("/", getUserData);
router.post("/apply", applyForJob);
router.post("/applications", getUserJobApplications);
router.post("/update-resume", upload.single("resume"), updateUserResume);

export default router;
