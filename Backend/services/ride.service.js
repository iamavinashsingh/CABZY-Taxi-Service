const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const axios = require('axios');


//  Reverse Geocoding Function (HERE API)
const getAddressFromCoordinates = async (lat, lng) => {
    try {
        console.log(`🔍 Fetching Address from HERE API for: ${lat}, ${lng}`);

        const response = await axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode`, {
            params: {
                at: `${lat},${lng}`,  //  Correct param for HERE API
                apiKey: process.env.HERE_MAPS_API_KEY  //  Correct API key format
            }
        });

        // console.log(" HERE API Response:", response.data);

        if (response.data.items.length > 0) {
            const item = response.data.items[0];

            //  Extract Address Correctly
            const address = item.address?.label || item.title || "Unknown Location"; 

            // console.log(`✅ Extracted Address: ${address}`);
            return address; // Return Human-Readable Address
        } else {
            console.error(" No address found in HERE API response!");
            return "Unknown Location"; //  Default Error Case
        }
    } catch (error) {
        console.error("🚨 HERE API Reverse Geocoding Error:", error.response?.data || error.message);
        return "Unknown Location"; //  Default Error Case
    }
};


// ================================================= FARE CALCULATION =================================================

async function getFare(pickup, destination) {

    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    console.log("Distance: ",distanceTime.distance,"Km");
    console.log("Time: ",distanceTime.duration,"minutes");

    const baseFare = {
        auto: 30,
        car: 50,
        bike: 20
    };

    const perKmRate = {
        auto: 8,
        car: 13,
        bike: 6
    };

    const perMinuteRate = {
        auto: 1.25,
        car: 2.25,
        bike: 1
    };

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance) * perKmRate.auto) + ((distanceTime.duration) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance) * perKmRate.car) + ((distanceTime.duration) * perMinuteRate.car)),
        bike: Math.round(baseFare.bike + ((distanceTime.distance) * perKmRate.bike) + ((distanceTime.duration) * perMinuteRate.bike))
    };
    console.log("Fare calculated:", fare);
    return fare;

}
module.exports.getFare = getFare;

// ================================================= OTP GENERATION =================================================

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

// ================================================= CREATE RIDE FUNCTIONS =================================================

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    console.log("📌 Creating ride with coordinates:", pickup, destination, vehicleType);

    // 🗺️ 1️⃣ Reverse Geocode Pickup & Destination
    const [pickupLat, pickupLng] = pickup.split(',');
    const [destinationLat, destinationLng] = destination.split(',');

    // console.log("📍 Parsed Coordinates:", { pickupLat, pickupLng, destinationLat, destinationLng });

    const pickupAddress = await getAddressFromCoordinates(pickupLat, pickupLng);
    const destinationAddress = await getAddressFromCoordinates(destinationLat, destinationLng);

    // console.log("🚖 Resolved Addresses:", { pickupAddress, destinationAddress });

    //Fare Calculation
    const fare = await getFare(pickup, destination);
    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    // Ride Data Store with Address
    const ride = await rideModel.create({
        user,
        pickup: pickupAddress,  //  Address instead of coordinates
        destination: destinationAddress,  // Address instead of coordinates
        otp: getOtp(6),
        distance: Math.round(distanceTime.distance),
        duration: Math.round(distanceTime.duration),
        fare: fare[vehicleType]
    });

    console.log("✅ Ride Created in DB:", ride);
    return ride;
};

//================================================= CONFIRM RIDE FUNCTIONS =================================================

module.exports.confirmRide = async ({rideId, captain}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}

//================================================= START RIDE FUNCTIONS =================================================

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}

//================================================= END RIDE FUNCTIONS =================================================

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}
