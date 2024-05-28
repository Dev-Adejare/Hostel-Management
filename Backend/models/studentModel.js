const mongoose = require('mongoose');

const guardianSchema = new mongoose.Scheme({
    guardianName: {
        type: String,
        required: true
    },
    guardianEmail: {
        type: String,
        required: [true, 'Please add a valid email address'],
        trim: true,
        unique: true
    }
})

const studentSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'others'],
    },
    nationality: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: [true, 'Please add a valid email address'],
        trim: true,
        unique: true
    },
    guardian: guardianSchema, 
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        default: null,
    },
    role:{
        type: String,
        default:'Student'
    }




})
  