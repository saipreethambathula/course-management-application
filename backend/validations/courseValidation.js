const { body } = require("express-validator");

exports.courseValidation = [
  body("courseName").notEmpty().withMessage("Course name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("instructor").notEmpty().withMessage("Instructor is required"),
];
