const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");
const Room = require("../models/roomModel");
const { generateUniqueId } = require("../utilis/generateUniqueId");

const ensureUniqueId = async () => {
  let uniqueId;
  let idExists = true;

  while (idExists) {
    uniqueId = generateUniqueId();
    const existingStudent = await Student.findById(uniqueId);
    idExists = !!existingStudent;
  }

  return uniqueId;
};

//To register Student
const registerStudent = asyncHandler(async (req, res) => {
  try {
    const { email, name, age, nationality, g_name, g_email, gender, roomNum } =
      req.body;

    if (
      !email ||
      !name ||
      !age ||
      !nationality ||
      !g_name ||
      !g_email ||
      !gender ||
      !roomNum
    ) {
      res.status(400);
      throw new Error("Please fill in all the required fields.");
    }

    const studentExist = await Student.findOne({ email });

    if (studentExist) {
      return res.status(400).json({ msg: "Student already exists" });
    }

    const room = await Room.findOne({ roomNumber: roomNum });

    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    if (room.roomStatus !== "available") {
      return res.status(400).json({ msg: "Room is not available" });
    }

    const uniqueId = await ensureUniqueId();

    const student = await Student.create({
      _id: uniqueId,
      email,
      name,
      age,
      nationality,
      guardian: {
        g_name: g_name,
        guardianEmail: g_email,
      },
      gender,
      room: room._id, // Assign the room's ObjectId to the student
    });

    room.roomOccupancy.push(student._id);

    if (room.roomOccupancy.length >= room.roomCapacity) {
      room.roomStatus = "unavailable";
    }

    await room.save();

    res.status(201).json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//To get all Student
const getAllStudents = asyncHandler(async (req, res) => {
  const students = await Student.find().sort("-createdAt");
  if (!students) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  res.status(200).json(students);
});

//To get single Student
const getStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params._id);
  if (student) {
    res.status(200).json(student);
  } else {
    res.status(404);
    throw new Error("Student not found!");
  }
});

//To update student profile
const updateStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params._id);

  if (student) {
    const { name, email, gender, age, nationality, guardian } = student;

    student.email = email;
    student.gender = gender;
    student.name = req.body.name || name;
    student.age = req.body.age || age;
    student.nationality = req.body.nationality || nationality;
    student.guardian.guardianName = req.body.g_name || guardian.guardianName;
    student.guardian.guardianEmail = req.body.g_email || guardian.guardianEmail;

    const updateStudent = await student.save();
    res.status(200).json(updateStudent);
  } else {
    res.status(404);
    throw new Error("Student not found!");
  }
});

//To change student Room
const changeStudentRoom = asyncHandler(async (req, res) => {});

//To update checkIn status
const updateCheckInStatus = asyncHandler(async (req, res) => {});

//To Delete Student
const deleteStudent = asyncHandler(async (req, res) => {
 
});

module.exports = {
  registerStudent,
  getAllStudents,
  getStudent,
  updateStudentProfile,
  changeStudentRoom,
  updateCheckInStatus,
  deleteStudent,
};
