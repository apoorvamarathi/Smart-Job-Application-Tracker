const mongoose = require('mongoose');

const conntectDB = async()=>{
    try{
      await mongoose.connect(process.env.MONGO_URI);
      Console.log("MongoDB connected");
    }catch(err){
      console.log(err);
      process.exit(1);
    }

};
module.exports = connectDB;

