const express = require("express")
const router = express.Router()

const multer = require("multer")
const uploadController = require("../controllers/uploadController")

const storage = multer.diskStorage({
 destination: function(req, file, cb){
  cb(null,"backend/uploads")
 },
 filename: function(req,file,cb){
  cb(null,Date.now()+"-"+file.originalname)
 }
})

const upload = multer({storage:storage})

router.post("/upload", upload.single("resume"), uploadController.uploadResume)

module.exports = router

