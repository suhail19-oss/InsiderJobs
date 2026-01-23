import express from "express";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume,
} from "../controllers/usercontroller.js";
import upload from "../config/multer.js";
import multerErrorHandler from "../middlewares/multererrorhandler.js";

const router = express.Router();

router.get("/", getUserData);
router.post("/apply", applyForJob);
router.post("/applications", getUserJobApplications);
router.post(
  "/update-resume",
  upload.single("resume"),
  multerErrorHandler,
  updateUserResume,
);

export default router;
