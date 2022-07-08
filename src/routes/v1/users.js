const { check, validationResult } = require('express-validator');
const multer = require('multer');
const router = require('express').Router();
const { validation } = require('../../exceptions/HttpExceptionHandler');
const { uploadFile } = require('../../helpers/FileHandler');


const { userAddValidation } = require('../../validations/v1/users/UserAddRequest');

const { userList, userCreate } = require('../../controllers/v1/crud/UsersController');

// Router
router.get('/users/list', userList);
router.post('/user/document-submit',  uploadFile('document','image'), userAddValidation, validation, userCreate);

module.exports = router;
