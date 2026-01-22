import jwt from "jsonwebtoken";
import Company from "../models/company.js";

export const protectCompany = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized. Please Login Again.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const company = await Company.findById(decoded.id).select("-password");
    if (!company) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Please Login Again.",
      });
    }

    req.company = company;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
