const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    skills:[String],
    education:[
        {
            institution:String,
            degree:String,
            fieldOfStudy:String,
            startYear:Number,
            endYear:Number
        }
    ],
    experience:[
        {
            company:String,
            position:String,
            description:String,
            startDate:Date,
            endDate:Date
        }
    ],
    resume:{type:String},
});

module.exports = mongoose.model("Profile",ProfileSchema);
