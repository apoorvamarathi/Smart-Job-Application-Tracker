const Notification = require('../models/Notification');

// @desc    Get notifications for logged-in user
// @route   GET /api/notifications
const getMyNotifications = async (req, res) => {
  const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(notifications);
};

// @desc    Mark a notification as read
// @route   PUT /api/notifications/:id/read
const markAsRead = async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    return res.status(404).json({ message: 'Notification not found' });
  }
  if (notification.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  notification.read = true;
  await notification.save();
  res.json(notification);
};

module.exports = { getMyNotifications, markAsRead };