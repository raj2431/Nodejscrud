const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userDocumentSchema = new Schema({
    'user': {
        "type": Schema.Types.ObjectId,
        "ref": "User",
        "required": true,
    },
    'documentName': {
        'type': String,
        'required': true,
    },
    'documentType': {
        'type': String,
        'required': true,
    },
    'docunemt': {
        'type': String,
        'required': true,
    }
    
}, { 'timestamps': true });

const UserDocument = mongoose.model("UserDocument", userDocumentSchema);
module.exports = UserDocument;