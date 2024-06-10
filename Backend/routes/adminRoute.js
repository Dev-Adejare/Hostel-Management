const express = require("express");
const {
  register,
  login,
  getAdmin,
  deleteAdmin,
  getallAdmins,
  updateAdmin,
  logout,
} = require("../conrollers/adminController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/:adminId", getAdmin);
router.delete("/delete/:adminId", deleteAdmin);
router.get("/", getallAdmins);
router.put("/:adminId", updateAdmin);
router.post("/logout", logout);

module.exports = router;
