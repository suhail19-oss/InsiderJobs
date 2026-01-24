import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import Company from "../models/company.js";
import generateToken from "../utils/generatetoken.js";
import Job from "../models/job.js";
import JobApplication from "../models/jobapplication.js";
import { sendEmail } from "../utils/sendemail.js";
import User from "../models/user.js";
import {
  interviewTemplate,
  rejectedTemplate,
  newJobPostedTemplate,
} from "../utils/emailtemplates.js";

const getInterviewSchedule = () => {
  const interviewDate = new Date();
  interviewDate.setDate(interviewDate.getDate() + 7);

  const hours = Math.floor(Math.random() * (17 - 10)) + 10;
  const minutes = Math.random() > 0.5 ? "00" : "30";

  return {
    date: interviewDate.toDateString(),
    time: `${hours}:${minutes}`,
  };
};

export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.status(400).json({
      success: false,
      message: "Missing Details",
    });
  }

  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.status(409).json({
        success: false,
        message: "Company Already Registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url,
    });

    res.status(201).json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });

    if (!company) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, company.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    res.status(200).json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCompanyData = async (req, res) => {
  const company = req.company;

  try {
    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const postJob = async (req, res) => {
  const { title, description, location, salary, category, level } = req.body;
  const companyId = req.company._id;

  if (!title || !description || !location || !salary || !category || !level) {
    return res.status(400).json({
      success: false,
      message: "Missing Job Details",
    });
  }

  try {
    const newJob = await Job.create({
      title,
      description,
      location,
      salary,
      category,
      level,
      date: Date.now(),
      companyId,
    });

    const users = await User.find({}, "email");

    users.forEach(async (user) => {
      try {
        await sendEmail({
          to: user.email,
          subject: `New Job Posted: ${title}`,
          html: newJobPostedTemplate({
            jobTitle: title,
            company: req.company.name,
            location,
            level,
          }),
        });
      } catch (err) {
        console.error(`Email failed for ${user.email}:`, err.message);
      }
    });

    res.status(201).json({
      success: true,
      newJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.company?._id;

    if (!companyId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access. Company not found.",
      });
    }

    const applications = await JobApplication.find({ companyId })
      .populate("userId", "name image resume")
      .populate("jobId", "title location category level salary")
      .exec();

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Error fetching Company Job Applicants:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Job Applicants. Please try again later.",
    });
  }
};

export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;

    const jobs = await Job.find({ companyId });

    if (jobs.length === 0) {
      return res.status(200).json({
        success: true,
        jobsData: [],
      });
    }

    const jobIds = jobs.map((job) => job._id);

    const applications = await JobApplication.find({
      jobId: { $in: jobIds },
    });

    const applicantCountMap = {};

    applications.forEach((app) => {
      const id = app.jobId.toString();
      applicantCountMap[id] = (applicantCountMap[id] || 0) + 1;
    });

    const jobsData = jobs.map((job) => ({
      ...job.toObject(),
      applicants: applicantCountMap[job._id.toString()] || 0,
    }));

    res.status(200).json({
      success: true,
      jobsData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const changeJobApplicationStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json({
        success: false,
        message: "Application id and Status are required",
      });
    }

    const allowedStatuses = [
      "Pending",
      "Interview Scheduled",
      "Application Closed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Application Status",
      });
    }

    const updatedApplication = await JobApplication.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true },
    )
      .populate("userId", "name email")
      .populate("jobId", "title")
      .populate("companyId", "name");

    if (!updatedApplication) {
      return res.status(404).json({
        success: false,
        message: "Job Application not Found",
      });
    }

    const user = updatedApplication.userId;
    const job = updatedApplication.jobId;
    const company = updatedApplication.companyId;

    if (updatedApplication.emailNotifiedFor !== status) {
      if (status === "Interview Scheduled") {
        const { date, time } = getInterviewSchedule();

        try {
          await sendEmail({
            to: user.email,
            subject: "Interview Scheduled – InsiderJobs",
            html: interviewTemplate({
              name: user.name,
              jobTitle: job.title,
              company: company.name,
              date,
              time,
            }),
          });
        } catch (error) {
          console.error("Interview email failed:", error.message);
        }
      }

      if (status === "Application Closed") {
        try {
          await sendEmail({
            to: user.email,
            subject: "Application Update – InsiderJobs",
            html: rejectedTemplate({
              name: user.name,
              jobTitle: job.title,
              company: company.name,
            }),
          });
        } catch (error) {
          console.error("Rejection email failed:", error.message);
        }
      }

      updatedApplication.emailNotifiedFor = status;
      await updatedApplication.save();
    }

    return res.status(200).json({
      success: true,
      message: "Status Changed Successfully",
    });
  } catch (error) {
    console.error("Error updating Job Application Status:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to Update Application Status",
    });
  }
};

export const changeVisibility = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job Not Found",
      });
    }

    if (companyId.toString() !== job.companyId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not Authorized",
      });
    }

    job.visible = !job.visible;

    await job.save();

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
