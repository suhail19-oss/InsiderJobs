import JobApplication from "../models/jobapplication.js";
import User from "../models/user.js";
import Job from "../models/job.js";
import { v2 as cloudinary } from "cloudinary";

export const getUserData = async (req, res) => {
  const userId = req.auth().userId;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth().userId;

  try {
    const isAlreadyApplied = await JobApplication.find({ jobId, userId });

    if (isAlreadyApplied.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Already Applied",
      });
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res.status(404).json({
        success: false,
        message: "Job Not Found",
      });
    }

    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    res.status(201).json({
      success: true,
      message: "Applied Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.auth().userId;

    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary");

    if (applications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User has not Applied to any Jobs",
      });
    }

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth().userId;
    const resumeFile = req.file;

    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (!resumeFile) {
      return res.status(400).json({
        success: false,
        message: "Resume File is Required",
      });
    }

    const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
    userData.resume = resumeUpload.secure_url;

    await userData.save();

    res.status(200).json({
      success: true,
      message: "Resume Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
