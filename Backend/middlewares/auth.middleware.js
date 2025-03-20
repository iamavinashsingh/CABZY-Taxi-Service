const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackListToken.model');
const captainModel = require('../models/captain.model');

// This Middleware will be used to authenticate the user 
module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    // We can get token from cookies or headers. If token is not present in cookies then we can get it from headers.
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // To check if token is still with the user or not
    const isBlacklisted = await blackListTokenModel.findOne({ token: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)

        req.user = user;
        console.log(" Middleware Debug USer:", req.user,req.captain);
        console.log("🔹 Token Received in Middleware:", req.headers.authorization);
        console.log("✅ Decoded Token Data:", decoded);

        return next();
       

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

// This Middleware will be used to authenticate the captain
module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });



    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain;
        console.log("🔥 Middleware Debug Captain:",req.captain, req.user);
        console.log("🔹 Token Received in Middleware:", req.headers.authorization);
        console.log("✅ Decoded Token Data:", decoded);


        return next()
        
    } catch (err) {
        console.log(err);

        res.status(401).json({ message: 'Unauthorized' });
    }
}