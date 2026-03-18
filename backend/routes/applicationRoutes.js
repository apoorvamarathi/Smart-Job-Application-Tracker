const express = require('express');
const router = express.Router();
const {protect,authorize} = require("../middleware/auth");

const {
    applyForJob,
    getApplicationsForJob,
    getMyApplications,
    updateApplicationStatus
} = require('../controllers/applicationController');

router.route('/').post(protect,authorize('jobseeker'),applyForJob);

router.route('/')
.post(protect,authorize('jobseeker'),getApplicationsForJob);

router.route('/me')
    .get(protect,getMyApplications);

router.route('/:id')
    .put(protect,authorize('employer','admin'),updateApplicationStatus);

module.exports = router;

