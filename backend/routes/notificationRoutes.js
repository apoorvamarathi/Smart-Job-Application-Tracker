const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getMyNotifications, markAsRead } = require('../controllers/notificationController');

router.route('/')
  .get(protect, getMyNotifications);

router.route('/:id/read')
  .put(protect, markAsRead);

module.exports = router;