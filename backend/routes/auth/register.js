const express = require("express");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../../models/user");
const { registerValidation } = require("../../validations/authValidation");

const router = express.Router();

router.post("/", registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(409).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
