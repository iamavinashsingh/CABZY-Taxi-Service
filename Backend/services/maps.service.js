const axios = require('axios');
const captainModel = require('../models/captain.model');

const apiKey = process.env.HERE_MAPS_API_KEY; 

//=================================================  GET COORDINATES FROM ADDRESS  =================================================

module.exports.getAddressCoordinate = async (address) => {
    const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apikey=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.items.length > 0) { 
            const location = response.data.items[0].position;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//=================================================  GET DISTANCE & TIME  =================================================

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const url = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${origin}&destination=${destination}&return=summary&apikey=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.routes.length > 0) {  
            const summary = response.data.routes[0].sections[0].summary;
            const result = {
                distance: summary.length / 1000, // Convert meters to KM
                duration: summary.baseDuration / 60 // Convert seconds to minutes
            };
            // console.log('Distance and Time:', result);
            return result;
            
        } else {
            throw new Error('No routes found');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

//================================================= AUTOCOMPLETE  ADDRESS  =================================================
module.exports.getAutoCompleteSuggestions = async (input, latitude, longitude) => {
    const url = `https://autosuggest.search.hereapi.com/v1/autosuggest?q=${encodeURIComponent(input)}&at=${latitude},${longitude}&apikey=${apiKey}`;
    
    try {
        const response = await axios.get(url);

       
        if (!response.data || !response.data.items || response.data.items.length === 0) {
            throw new Error('No suggestions found');
        }

        
        return response.data.items.map(item => ({
            title: item.title,
            address: item.address ? item.address.label : "No Address Available",
            position: item.position
        }));

    } catch (err) {
        console.error("HERE API Error:", err.message);
        throw new Error('Failed to fetch autocomplete suggestions');
    }
};

//=================================================  GET CAPTAIN RADIUS  =================================================
module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
    console.log(`🔍 Searching captains near: ${lat}, ${lng}, within ${radius} km`);

    const captains = await captainModel.find({
        "location.lat": { $gte: lat - 0.1, $lte: lat + 0.1 },  // Approx. range
        "location.lng": { $gte: lng - 0.1, $lte: lng + 0.1 }
    });

    console.log("🚖 Captains found:", captains);
    return captains;
};

