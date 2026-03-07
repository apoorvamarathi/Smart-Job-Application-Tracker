const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    text:String,
    skills:[String]
})

module.exports = mongoose.model('Resume',ResumeSchema)

