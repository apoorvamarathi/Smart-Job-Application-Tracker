const mongoose = require("mongoose")
const AnaysisSchema = new mongoose.Schema({
    userId:String,
    jobId:String,
    matchScore:Number,
    missingSkills:[String],
    suggestions:[String]
})
module.exports = mongoose.model("Analysis",AnaysisSchema)
