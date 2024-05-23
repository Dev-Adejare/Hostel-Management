const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Admin = require("../models/AdminModel");
const { generateToken } = require("../utilis/index");

const register = asyncHandler(async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    !fullname ||
      !email ||
      (!password &&
        (() => {
          res.status(400);
          throw new Error("Please! fill all the required fields");
        })());

    password.lenght < 6 &&
      (() => {
        res.status(400);
        throw new Error("Password must be up to 6 characters!");
      })();

    const adminExists = await Admin.findOne({ email });

    adminExists &&
      (() => {
        res.status(400);
        throw new Error("Email already exists");
      })();

    const admin = await Admin.create({
      fullname,
      email,
      password,
    });

    const token = generateToken(admin._id);

    //send http-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1day
      sameSite: "none",
      secure: true,
    });

    if (admin) {
      const { _id, fullname, email, role } = admin;
      res.status(201).json({
        _id,
        fullname,
        email,
        role, token
      });
    } else {
      res.status(400);
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error");
  }
});

module.exports = {register}
