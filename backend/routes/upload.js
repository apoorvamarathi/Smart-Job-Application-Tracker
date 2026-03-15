const express = require("express")
const router = express.Router()

const multer = require("multer")
const uploadController = require("../controllers/uploadController")

const storage = multer.diskStorage({
 destination: function(req, file, cb){
  cb(null,"uploads/")
 },
 filename: function(req,file,cb){
  cb(null,Date.now()+"-"+file.originalname)
 }
})

const upload = multer({storage:storage})

router.post("/upload", (req, res, next) => {
  upload.single("resume")(req, res, (err) => {
    if (err) {
      console.error("Multer error:", err.message, "Field:", err.field);
      return res.status(400).json({ error: err.message, field: err.field });
    }
    next();
  });
}, uploadController.uploadResume);

module.exports = router

