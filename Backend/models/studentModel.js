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
    },
    guardianPhone: {
        type: Number,
        required: true
    },
    guardianAddress: {
        type: String,
        required: true
    },
    guardianOccupation: {
        type: String,
        required: true
    },
    guardianRelation: {
        type: String,
        required: true
    }
})