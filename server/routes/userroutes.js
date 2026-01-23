import express from "express";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume,
} from "../controllers/usercontroller.js";
import multerErrorHandler from "../middlewares/multererrorhandler.js";
import uploadPDF from "../config/multerpdf.js";

const router = express.Router();

router.get("/", getUserData);
router.post("/apply", applyForJob);
router.get("/applications", getUserJobApplications);
router.post(
  "/update-resume",
  uploadPDF.single("resume"),
  multerErrorHandler,
  updateUserResume,
);

export default router;
