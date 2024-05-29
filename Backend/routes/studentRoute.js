const express = require('express');
const {registerStudent, getAllStudents, getStudent, updateStudentProfile, changeStudentRoom, updateCheckInStatus, deleteStudent } = require('../conrollers/studentController');
const router = express.Router();


router.post("/register-student", registerStudent);
router.get("/", getAllStudents);
router.get("/:_id", getStudent);
router.patch("/:_id", updateStudentProfile);
router.post("/change-room", changeStudentRoom);
router.post("/check-in-student", updateCheckInStatus);
router.delete("/delete-student/:_id", deleteStudent);

module.exports = router;