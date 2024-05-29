const mongoose = require("mongoose");

const guardianSchema = new mongoose.Schema({
  guardianName: {
    type: String,
    required: true,
  },
  guardianEmail: {
    type: String,
    required: [true, "Please add a valid email address"],
    trim: true,
    unique: true,
  },
});

const studentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
    }, 
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Others"],
    },
    nationality: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please add a valid email address"],
      trim: true,
      unique: true,
    },
    guardian: guardianSchema,
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      default: null,
    },
    role: {
      type: String,
      enum: ["student"],
      default: "student",
    },
    checkedIn: {
      type: Boolean,
      default: false,
    },
    checkedInTime: {
      type: Date,
      default: null,
    },
    checkedOutTime: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, minimize: false, toJSON: { getters: false } }
);

studentSchema.methods.checkIn = function() {
    this.checkedIn = true;
    this.checkedInTime = new Date();
    this.checkedOutTime = null;
} 
studentSchema.methods.checkOut = function() {
    this.checkedIn = false;
    this.checkedOutTime = new Date();
    this.checkedInTime = null;
} 

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;

