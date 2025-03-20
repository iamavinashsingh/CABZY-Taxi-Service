const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

// DEFINING ROUTES

const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes'); 
const rideRoutes = require('./routes/ride.routes');

//Connection To Database

const connectToDb = require('./db/db');
connectToDb();

app.use(cors({
    origin: "https://cabzy-taxi-service-frontend.onrender.com" ,
    // Frontend URL :- https://cabzy-taxi-service-frontend.onrender.com {for production}  origin: "http://localhost:5173"{for local development}
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Agar cookies ya headers bhej rahe ho toh ye zaroori hai!
}));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended:true})); // for parsing application/x-www-form-urlencoded 
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use('/maps',mapsRoutes);
app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.use('/rides',rideRoutes);   


module.exports = app;
