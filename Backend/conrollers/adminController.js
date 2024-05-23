const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const admin = require("../models/AdminModel");
const { generateToken } = require("../utilis/index");

const register = asyncHandler(async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    
      !fullname ||
        !email ||
        !password &&
          (() => {
            res.status(400);
            throw new Error("Please! fill all the required fields");
          })()
    

    
      password.lenght < 6 &&
        (() => {
          res.status(400);
          throw new Error("Password must be up to 6 characters!");
        })()

  } catch (error) {}
});
