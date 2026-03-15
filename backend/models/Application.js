const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    jobId:{type:mongoose.Schema.Types.ObjectId,ref:"job",required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    resume:{type:String},
    status:{
        type:String,
        enum:['pending','reviewed','accepted','rejected'],
        default:'pending'
    },
    appliedAt:{type:Date,default:Date.now}
});

module.exports = mongoose.model("Appication",ApplicationSchema);
