const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { body } = require('express-validator');


// CREATING REGISTER ROUTE

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First Name must be atleast 3 characters long'),
    body('password').isLength({min:8}).withMessage('Password must be atleast 8 characters long')
],
    userController.registerUser   // calling registerUser function from user.controller.js

)       


// CREATING LOGIN ROUTE

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:8}).withMessage('Password must be atleast 8 characters long')       
],

    userController.loginUser   // calling loginUser function from user.controller.js
)


// CREATING GET USER  PROFILE ROUTE

router.get('/profile',authMiddleware.authUser,userController.getUserProfile)  // calling getUserProfile function from user.controller.js

// CREATING LOGOUT ROUTE
router.get('/logout',authMiddleware.authUser,userController.logoutUser)  // calling logoutUser function from user.controller.js

// exporting router
module.exports = router;    
