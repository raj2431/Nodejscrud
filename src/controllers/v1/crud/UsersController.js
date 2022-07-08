const HttpResponse = require('../../../response/HttpResponse');
const UserService = require('../../../services/UserService');
const { check, validationResult, body } = require('express-validator');
const User = require('../../../models/User');


const userList = async (req, res, next) => {
    try {
        let users = await UserService.getAllUsers();
        return HttpResponse.apiResponse(res, users, HttpResponse.HTTP_OK, 'User list');
    } catch (err) {
        err.statusCode = HttpResponse.HTTP_INTERNAL_SERVER_ERROR;
        next(err);
    }
}

const userCreate = async (req, res, next) => {

    // console.log('files', req.files);
    // console.log('body', req.body);
    try {

        let userDocuments = [];

        (req.files).forEach((element, index) => {
            // console.log('body', req.body);
            userDocuments.push({
                documentType: req.body.documentType[index],
                documentName: req.body.documentName[index],
                document: element.filename,
            });
        });

        req.body.userDocuments = userDocuments;
        let user = await UserService.createUser(req.body);
        return HttpResponse.apiResponse(res, user, HttpResponse.HTTP_OK, 'User created successfully');
    } catch (err) {
        err.statusCode = HttpResponse.HTTP_INTERNAL_SERVER_ERROR;
        next(err);
    }
}


module.exports = {
    userList,
    userCreate
}