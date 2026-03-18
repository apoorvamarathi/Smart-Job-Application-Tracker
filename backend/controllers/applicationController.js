const Application = require('../models/Application');
const Job = require('../models/Job');
const Notification = require('../models/Notification');

const applyForJob = async(req,res)=>{
    const {jobId,resume} = req.body;
    const existing = await Application.findOne({jobId,userId:req.userId._id});
    if(existing){
        return res.status(400).json({message:"Already applied for this job"});
    }
    const application = await application.create({
        jobId,
        userId:req.user._id,
        resume
    });

    const job = await Job.findById(jobId);
    if(job){
        await Notification.create({
            userId:job.createBy,
            message:`New application received for ${job.title}`
        });
    }
    res.status(201).json(application);
};

const getApplicationsForJob = async(req,res)=>{
    const applications = await Application.find({jobId:req.params.jobId})
    .populate('userId','name email');
res.json(applications);
};

const getMyApplications = async(req,res)=>{
    const {status} = req.body;
    const application = await Application.findById(req.params.id).populate('jobId');
    if(!application){
        return res.status(404).json({message:"Application not found"});
    }

    if(application.jobId.createBy.toString() !== req.user._id.toString()){
        return res.status(403).json({message:"Not authorized"});
    }
    application.status = status;
    await  application.save();

    await Notification.create({
        userId:application.userId,
        message:`Your application for ${application.jobId.title} is now ${status}`
    });
    res.json(application);
};

const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;
  const application = await Application.findById(req.params.id).populate('jobId');
  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }
  // Check if the logged-in user is the employer who owns the job
  if (application.jobId.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  application.status = status;
  await application.save();
  // Notify the applicant
  await Notification.create({
    userId: application.userId,
    message: `Your application for ${application.jobId.title} is now ${status}`
  });
  res.json(application);
};

module.exports = {
    applyForJob,
    getApplicationsForJob,
    getMyApplications,
    updateApplicationStatus
};