const multerErrorHandler = (err, req, res, next) => {
  if (err) {
    if (err.message === "Only PDF files are allowed") {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size should not exceed 5MB",
      });
    }

    return res.status(400).json({
      success: false,
      message: "File upload failed",
    });
  }

  next();
};

export default multerErrorHandler;
