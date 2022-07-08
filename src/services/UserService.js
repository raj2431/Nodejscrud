const User = require("../models/User");
const UserDocument = require('../models/UserDocument');

const createUser = async (data) => {
    let user = await User.create(data);
    // let emailVerify = await UserDocument.create({ email: req.body.email, user: user._id });
    return userDataParse(user);
}

/**
 * Find by email
 * @param {*} email 
 * @returns 
 */
const findUserByEmail = async (email) => {
    return await User.findOne({ email: email });
}

/**
 * Find by email
 * @param {*} email 
 * @returns 
 */
const findUserByMobileNumber = async (mobile_number) => {
    let user = await User.findOne({ mobile_number: mobile_number });
    return userDataParse(user);
}


const getAllUsers = async () => {
    return await User.find().limit(100).sort({ 'createdAt': -1 }).exec();
}

/**
 * Parse user data
 * @param {*} user 
 * @returns 
 */
const userDataParse = async (user) => {
    return user;
    return {
        first_name: user.f || "",
        last_name: user.last_name || "",
        email: user.email,
        address: user.address || "",
        status: user.status
    }
}


module.exports = {
    findUserByEmail,
    findUserByMobileNumber,
    userDataParse,
    getAllUsers,
    createUser
}