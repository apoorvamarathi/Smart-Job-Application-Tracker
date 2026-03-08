const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const conntectDB = require("./config/db")

const uploadRoutes = require("./routes/upload")
const analyzeRoutes = require("./routes/analyze")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api",uploadRoutes)
app.use("/api",analyzeRoutes)





mongoose.connect(process.env.MONGO_URI)
.then(()=>{
 console.log("MongoDB connected")
})
.catch((err)=>{
 console.log(err)
})

app.get("/", (req,res)=>{
 res.send("Server running")
})

app.listen(process.env.PORT || 6000, ()=>{
 console.log("Server started")
})


//Ub5QLcyaqbQZN8xH
//apoorvamarathi_db_user



