const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const admin = require('../models/AdminModel');
const {generateToken} = require ('../utilis/index');