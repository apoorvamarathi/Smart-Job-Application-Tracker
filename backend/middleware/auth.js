const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split('')[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            next();
        }catch(err){
            res.status(401).json({message:"Not authorized,token failed"})
        }
    }
    if(!token){
        res.status(401).json({message:"Not authorized,token failed"});
    }
};

const authorize = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message:"Forbidden"});
        }
        next();
    };
};

module.exports = {protect,authorize};

