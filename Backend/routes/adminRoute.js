const express = require('express');
const { register, login, getAdmin, deleteAdmin } = require('../conrollers/adminController');
const router = express.Router();

router.post("/register",  register)
router.post("/login", login )
router.get("/:adminId", getAdmin );
router.delete("/:adminId", deleteAdmin );

module.exports = router