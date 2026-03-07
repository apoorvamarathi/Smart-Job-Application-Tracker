const Resume = require("../models/Resume")
const JOb = require("../models/Job")
const  atsScore = require("../services/atsScore")

exports.analyzeResume = async(req,res)=>{
    const {resumeId,jobId} = req.body

    const resume = await resume.findBYId(resumeId)
    const job = await Job.findBYId(jobId)

    const result = atsScore(resume.skills,job.skills)

    res.json({
        matchScore:result.score,
        missingSkills:result.missing
    })

}
