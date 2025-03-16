const userModel = require('../models/user.model');  // importing the user model
const blackListTokenModel = require('../models/blackListToken.model'); // importing the blackListToken model
const userService = require('../services/user.service');  // importing the createService function from user.service.js
const {validationResult} = require('express-validator');   // for validation results




// EXPORTING REGISTER USER FUNCTION

module.exports.registerUser = async (req,res,next)=>{
    const errors = validationResult(req);
    // check if there are any errors
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    // asking data from the user
    const {fullname,email,password} = req.body;

    // checking if user already exists
    const isUserAlready = await userModel.findOne({ email });

    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exist' });
    }

    // hashing password ( called form user.model.js [its hashPassword function])
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword});

        const token = user.generateAuthToken();
    res.status(201).json({token,user});
}

// EXPORTING LOGIN USER FUNCTION

module.exports.loginUser = async(req,res,next)=>{

    // checking for validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const{email,password} = req.body;

    const user =  await userModel.findOne({email}).select('+password');  // finding user by email and selecting its password [ used select here becuase we have set select : false in user.model.js]
    // if user not found
    if(!user){
        return res.status(401).json({message : 'Invalid Email or Password'});
    }

    // if user found :- checking password
    const isMatch = await user.comparePassword(password);  // comparing password [used comparePassword function(method) from user.model.js]

    if(!isMatch){
        return res.status(401).json({message : 'Invalid Email or Password'});
    }
    const token = await user.generateAuthToken();  // generating token [used generateAuthToken function(method) from user.model.js]
    res.cookie('token',token);  // setting token in cookie
    res.status(200).json({token,user});
}

// EXPORTING GET USER PROFILE FUNCTION

module.exports.getUserProfile = async(req,res,next)=>{
   res.status(200).json(req.user); 
}

// EXPORTING LOGOUT USER FUNCTION

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

    await blackListTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out' });

}
