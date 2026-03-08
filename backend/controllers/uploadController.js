const Resume = require("../models/Resume")
const parsePDF = require("../services/pdfParser")
const extractSkills = require("../services/skillExtractor")

exports.uploadResume = async (req, res) => {

 try{
    console.log(req.file)
    console.log(req.body)

  if(!req.file){
   return res.status(400).json({
    message:"No file uploaded"
   })
  }

  const filePath = req.file.path

  const text = await parsePDF(filePath)

  const skills = extractSkills(text)

  const resume = await Resume.create({
   userId:req.body.userId,
   text,
   skills
  })

  res.json({
   message:"Resume uploaded successfully",
   skills: skills,
    file:req.file
  })

 }catch(error){

  console.error(error)

  res.status(500).json({
   message:"Server error"
  })

 }

}
