const Resume = require("../models/Resume")
const parsePDF = require("../services/pdfParser")
const extractSkills = require("../services/skillExtractor")

exports.uploadResume = async(req,res)=>{

 const filePath = req.file.path

 const text = await parsePDF(filePath)

 const skills = extractSkills(text)

 const resume = await Resume.create({
  userId:req.body.userId,
  text,
  skills
 })

 res.json({
  message:"Resume uploaded",
  skills
 })
}  
