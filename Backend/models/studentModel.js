const mongoose = require('mongoose');

const guardianScheme = new mongoose.Scheme({
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
    
})
  