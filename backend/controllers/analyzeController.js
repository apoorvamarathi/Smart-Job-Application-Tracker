const Resume = require("../models/Resume");
const Job = require("../models/Job");
const atsScore = require("../services/atsScore");

exports.analyzeResume = async (req, res) => {
  const { resumeId, jobId } = req.body;

  const resume = await Resume.findById(resumeId);
  const job = await Job.findById(jobId);

  const result = atsScore(resume.skills, job.skills);

  res.json({
    matchScore: result.score,
    missingSkills: result.missing
  });
};