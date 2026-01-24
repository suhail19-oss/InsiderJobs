import express from "express";
import { requireAuth } from "@clerk/express";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume,
} from "../controllers/usercontroller.js";
import multerErrorHandler from "../middlewares/multererrorhandler.js";
import uploadPDF from "../config/multerpdf.js";

const router = express.Router();

router.get("/", requireAuth(), getUserData);
router.post("/apply", requireAuth(), applyForJob);
router.get("/applications", requireAuth(), getUserJobApplications);
router.post(
  "/update-resume",
  requireAuth(),
  uploadPDF.single("resume"),
  multerErrorHandler,
  updateUserResume,
);

export default router;
