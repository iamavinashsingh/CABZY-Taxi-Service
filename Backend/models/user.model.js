const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type : String,
            required : [true, "Firstname is required"],
            minlength : [3, "Firstname should be atleast 3 characters long"]
        },
        lastname:{
            type : String,
            required : [true, "Lastname is required"],
            minlength : [3, "Lastname should be atleast 3 characters long"]
        }
    },
    email:{
        type : String,
        required : [true, "Email is required"],
        unique : true, 
        minlength : [5,"Email should be atleast 5 characters long"],
        match: [ /^\S+@\S+\.\S+$/, 'Please enter a valid email' ]
    },
    password:{
        type : String,
        select : false,
        required : [true, "Password is required"],
    },
    socketId:{
        type : String,
       
    }
})


// Creating  methods for token generation
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET, {expiresIn : '24h'});
    return token;
}

// Hashing password before saving
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

// comparing password
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;

//this usermodel will be used in the controller to perform CRUD operations on the user collection