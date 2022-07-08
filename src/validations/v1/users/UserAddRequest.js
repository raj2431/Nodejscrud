const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const UserService = require('../../../services/UserService');
const userAddValidation = [
    body('firstName', 'First Name is requied').not().isEmpty(),
    body('lastName', 'Last Name is requied').not().isEmpty(),
    body('email', 'Please enter a valid email').not().isEmpty().isEmail().normalizeEmail({ gmail_remove_dots: true }).custom(value => {
        return UserService.findUserByEmail(value).then(user => {
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        });
    }),
    body('dateOfBirth', 'Date of birth is required').not().isEmpty().custom(value => {
        if (parseInt(getAge(value)) < 18) {
            return Promise.reject('Minmum age should be 18 years');
        }
        return Promise.resolve(false);
    }),
    body('cAddressS1', 'Current address street one is required').not().isEmpty(),
    body('cAddressS2', 'Current address street two is required').not().isEmpty(),
    body('isPermanentCurrentAdd', 'Please of birth is required'),
    body('pAddressS1', 'Permanent address street one is required').custom(
        (pAddressS1, { req, location, path }) => (req.body.isPermanentCurrentAdd == false && (req.body.pAddressS1 == undefined || req.body.pAddressS1 == '')) == true ? false : true
    ),
    body('pAddressS2', 'Permanent address street two is required').custom(
        (pAddressS2, { req, location, path }) => (req.body.isPermanentCurrentAdd == false && (req.body.pAddressS2 == undefined || req.body.pAddressS2 == '')) == true ? false : true
    ),
    body('documentName', 'Document name is required').not().isEmpty(),
    body('documentType', 'Document type is required').not().isEmpty(),
    body('document', 'Please select document').isEmpty()
];

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

module.exports = { userAddValidation };