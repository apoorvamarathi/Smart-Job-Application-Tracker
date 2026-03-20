
const Profile = require('../models/Profile')

const createProfile = async (req,res) =>{
    const {skills,education,experience,resume} = req.body;
    const profileFields = {
        userId:req.user._id,
        skills,
        education,
        experience,
        resume
    };

    let profile = await Profile.findOne({userId:req.user._id});
    if(profile){
        profile = await Profile.findOneAndUpdate(
            {userId:req.user._id},
            {$set:profileFields},
            {new:true}
        );
        return res.json(profile);
    }
      profile = new Profile(profileFields);
  await profile.save();
  res.json(profile);
};

    const getMyProfile = async (req,res)=>{
        const profile = await Profile.findOne({userId:req.user._id}).populate('userId',['name','email']);
        if(!profile){
            return res.status(404).json({message:"Profile not found"});
        }
        res.json(profile);
    };

    const getProfileByUserId = async(req,res)=>{
        const profile = await Profile.findOne({userID:req.params.userId}).populate('userId',['name','email']);
        if(!profile){
            return res.status(404).json({message:'Profile not found'});
        }
        res.json(profile);
    };

    module.exports = {createProfile,getMyProfile,getProfileByUserId};
