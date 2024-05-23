const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    
    AdminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin'
    },
    
    lToken: {
        type: String,
        default: ""
    },

    vToken: {
        type: String,
        default: ""
    },
    
    rToken: {
        type: String,
        default: ""
    },

     createAt: {
        type: Date,
        required: true
    },
    
    expireAt: {
        type: Date,
        required: true
    },



});

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;