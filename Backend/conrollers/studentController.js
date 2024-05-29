const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");
const Room = require("../models/roomModel");
const generateUniqueId = require("../utilis/generateUniqueId");


const ensureUniqueId = async () => {
    let uniqueId;
    let idExists = true;

    while(idExists) {
        uniqueId = generateUniqueId();
        const existingStudent = await Student.findById( uniqueId );
        idExists = !!existingStudent;
    }
    return uniqueId;
}

// To Register student
const registerStudent = asyncHandler (async(req, res) => {
    const {name, age, gender, nationality, email, g_name, g_mail, roomNum} = req.body;

    if (!name || !age || !gender || !nationality || !email || !g_name || !g_mail || roomNum) {
        res.status(400);
        throw new Error("Please! fill all the required fields");
    }
});

//To get all Student
const getAllStudents = asyncHandler (async(req, res) => {});

//To get single Student
const getStudent = asyncHandler (async(req, res) => {});

//To update student profile
const updateStudentProfile = asyncHandler (async(req, res) => {});

//To change student Room
const changeStudentRoom = asyncHandler (async(req, res) => {});

//To update checkIn status
const updateCheckInStatus = asyncHandler (async(req, res) => {});

//To Delete Student
const deleteStudent = asyncHandler (async(req, res) => {});

module.exports = {
    registerStudent,
    getAllStudents,
    getStudent,
    updateStudentProfile,
    changeStudentRoom,
    updateCheckInStatus,
    deleteStudent,
    ensureUniqueId,
}

