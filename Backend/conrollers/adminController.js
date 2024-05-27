const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Admin = require("../models/AdminModel");
const generateToken = require("../utilis/index");

// Register new Admin
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

    // Check if user already exists
    const adminExists = await Admin.findOne({ email });

    adminExists &&
      (() => {
        res.status(400);
        throw new Error("Email already exists");
      })();

    // Create new Admin
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
        role,
        token,
      });
    } else {
      res.status(400);
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// To LOgin an Admin

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check if Admin exists by email
    let admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    //Check Password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = generateToken(admin._id);

    if (admin && isMatch) {
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1day
        sameSite: "none",
        secure: true,
      });

      const { _id, fullname, email, role } = admin;

      // send HTTP-only cookies
      res.status(201).json({
        _id,
        fullname,
        email,
        role,
        token,
      });
    } else {
      res.status(500);
      throw new Error("Something went wrong!");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

const getAdmin = asyncHandler(async (req, res) => {
  try {
    const { adminId } = req.params;

    const admin = await Admin.findById(adminId);

    if (admin) {
      const { _id, fullname, email, role } = admin;

      res.status(200).json({
        _id,
        fullname,
        email,
        role,
      });
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Delete an Admin



module.exports = { register, login, getAdmin };
