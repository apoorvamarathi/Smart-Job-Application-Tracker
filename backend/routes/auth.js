const express  = require('express');
const router = express.Router();
const {registerUser,loginUser} = require('../controllers/authController');
const {body} =  require('express-validator');

router.post(
    '/register',
    [
        body('name').notEmpty(),
        body('email').isEmail(),
        body('password').isLength({min:6})
    ],
    registerUser
);
router.post('/login',loginUser);
module.exports = router;