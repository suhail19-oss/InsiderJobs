import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import Company from "../models/company.js";
import generateToken from "../utils/generatetoken.js";

export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.json({
        success: false,
        message: "Company Already Registered.",
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

    res.json({
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
    res.json({ success: false, message: error.message });
  }
};

export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });

    if (!company) {
      return res.json({
        success: false,
        message: "Invalid Email or Password.",
      });
    }

    const isMatch = await bcrypt.compare(password, company.password);

    if (isMatch) {
      res.json({
        success: true,
        company: {
          _id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id),
      });
    } else {
      res.json({ success: false, message: "Invalid Email or Password." });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getCompanyData = async (req, res) => {};
export const postJob = async (req, res) => {};
export const getCompanyJobApplicants = async (req, res) => {};
export const getCompanyPostedJobs = async (req, res) => {};
export const changeJobApplicationStatus = async (req, res) => {};
export const changeVisibility = async (res, req) => {};
