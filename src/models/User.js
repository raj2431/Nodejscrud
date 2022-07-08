const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
    'firstName': {
        'type': String,
        'required': true,
    },
    'lastName': {
        'type': String,
        'required': true,
    },
    'email': {
        'type': String,
        'unique': true,
        'required': true,
    },

    'dateOfBirth': {
        'type': String,
        'required': false,
    },

    'cAddressS1': {
        'type': String,
        'required': false,
    },
    'cAddressS2': {
        'type': String,
        'required': false,
    },

    'isPermanentCurrentAdd': {
        'type': Boolean,
        'required': true,
        'default': false
    },

    'pAddressS1': {
        'type': String,
        'required': false,
    },
    'pAddressS2': {
        'type': String,
        'required': false,
    },
    'userDocuments' :[]

}, { 'timestamps': true });

userSchema.virtual('emailVerify', {
    ref: "UserDocument", //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'user', // is equal to foreignField
});

const User = mongoose.model("User", userSchema);

module.exports = User;

