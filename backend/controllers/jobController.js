const Job = require('../models/Job');

const createJob = async (req,res)=>{
    const {title,company,description,location,salary} = req.body;
    const job = await Job.create({
        title,
        company,
        description,
        location,
        salary,
        createdBy:req.user._id
    });
    res.status(201).json(job);
};

const getJobs = async (req, res) => {
  const jobs = await Job.find({}).sort({ createdAt: -1 });
  res.json(jobs);
};

const getJobById = async (req,res)=>{
    const job = await Job.findById(req.params.id);
    if(job){
        res.json(job);
    }else{
        res.status(404).json({message:'Job not found'});
    }
};

const updateJob = async(req,res)=>{
    const job = await Job.findById(req.params.id);
    if(!job){
        return res.status(404).json({message:"Job not found"});
    }
    if(job.createJob.toString() !== req.user._id.toString()){
        return res.status(403).json({message:"Not authorized"});
    }
    const updatedJob = await Job.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updateJob);
};

const deleteJob = async(req,res)=>{
    const job = await Job.findById(req.params.id);
    if(!job){
        return res.status(404).json({message:"Job not found"});
    }
    if(job.createdBy.toString() !== reqq.user._id.toString()){
        return res.status(403).json({message:"Not authorized"});
    }
    await job.remove();
    res.json({message:"job remvoed"});
};

module.exports = {createJob,getJobs,getJobById,updateJob,deleteJob};
