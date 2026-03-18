const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createProfile,
  getMyProfile,
  getProfileByUserId
} = require('../controllers/profileController');

router.route('/').post(protect, createProfile);
router.route('/me').get(protect, getMyProfile);
router.route('/user/:userId').get(getProfileByUserId);

module.exports = router;