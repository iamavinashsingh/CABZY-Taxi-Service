const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');
const { getAddressCoordinate, getCaptainsInTheRadius } = require("../services/maps.service");




//================================================ CREATE RIDE =================================================

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;
    console.log("Received Ride Data:", req.body);

    
    try {
        const ride = await rideService.createRide({ user: req.user ? req.user._id : null, pickup, destination, vehicleType });
        console.log("Ride Created Successfully:", ride);
        res.status(201).json(ride);  
    
        if (!pickup || !pickup[0] || !pickup[1]) {
            console.error(" ERROR: Invalid pickup ", pickup);
            return;
        }
        console.log("Pickup", pickup);
        
        const [pickLat, pickLng] = pickup.split(',');
        const pickupLat = parseFloat(pickLat);
        const pickupLng = parseFloat(pickLng);
        console.log("Lat:", pickupLat,"Lng:",pickupLng );

        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupLat, pickupLng,5);
        console.log("Captains in radius:", captainsInRadius)
        ride.otp = ""
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
        captainsInRadius.forEach(captain => {
            console.log(` Sending ride to Captain: ${captain.socketId}`);
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            });
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};

//================================================ GET FARE =================================================

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        console.log("Received pickup and destination:", pickup, destination);
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

//================================================ CONFIRM RIDE =================================================

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        console.log("🚀 Emitting ride-confirmed event to:", ride.user.socketId);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};

//================================================ START RIDE =================================================

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

//================================================ END RIDE =================================================

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
