import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import Company from "../models/company.js";
import generateToken from "../utils/generatetoken.js";
import Job from "../models/job.js";
import JobApplication from "../models/jobapplication.js";

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
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      category,
      level,
      date: Date.now(),
      companyId,
    });

    await newJob.save();

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

    const updatedApplication = await JobApplication.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true },
    );

    if (!updatedApplication) {
      return res.status(404).json({
        success: false,
        message: "Job Application not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Status Changed Successfully",
      application: updatedApplication,
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
