const express = require('express');
const router = express.Router();
const {protect,authorize} = require('../middleware/auth');
const {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob
} = require('../controllers/jobController');

router.route('/')
    .get(getJobs)
    .post(protect,authorize('employer','admin'),createJob);

router.route('/:id')
.get(getJobById)
.put(protect,authorize('employer','admin'),updateJob)
.delete(protect,authorize('employer','admin'),deleteJob);

module.exports = router;