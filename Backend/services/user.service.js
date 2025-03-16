const userModel = require('../models/user.model');


// This function will create a user in database
module.exports.createUser = async({firstname,lastname,email,password})=>{
    if(!firstname || !email || !password){
        throw new Error('All fields are required');
    }
    const user = await userModel.create({fullname : {firstname,lastname},email,password});
    return user;
}

