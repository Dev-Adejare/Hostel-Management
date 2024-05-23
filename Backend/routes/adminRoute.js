const express = require('express');
const { register } = require('../conrollers/adminController');
const router = express.Router();

router.post("/register",  register)

module.exports = router