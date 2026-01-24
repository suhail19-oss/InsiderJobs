import JobApplication from "../models/jobapplication.js";
import User from "../models/user.js";
import Job from "../models/job.js";
import { v2 as cloudinary } from "cloudinary";
import { sendEmail } from "../utils/sendemail.js";
import { appliedTemplate } from "../utils/emailtemplates.js";
import Company from "../models/company.js";

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
    const alreadyApplied = await JobApplication.exists({ jobId, userId });

    if (alreadyApplied) {
      return res.status(409).json({
        success: false,
        message: "Already Applied",
      });
    }

    const job = await Job.findById(jobId).select("title companyId");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job Not Found",
      });
    }

    const application = await JobApplication.create({
      companyId: job.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    res.status(201).json({
      success: true,
      message: "Applied Successfully 🎉",
    });

    setImmediate(async () => {
      try {
        const [user, company] = await Promise.all([
          User.findById(userId).select("name email"),
          Company.findById(job.companyId).select("name"),
        ]);

        if (!user || !company) return;

        await sendEmail({
          to: user.email,
          subject: "Application Submitted – InsiderJobs",
          html: appliedTemplate({
            name: user.name,
            jobTitle: job.title,
            company: company.name,
          }),
        });
      } catch (err) {
        console.error("Apply email failed:", err.message);
      }
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
