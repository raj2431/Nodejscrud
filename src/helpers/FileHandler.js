const multer = require('multer');
const fs = require('fs');

/**
 * Image filter
 * @param {*} req 
 * @param {*} file 
 * @param {*} cb 
 */
const imagefileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false);
    }
}

/**
 * Set disk storage and file name
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdir(`./storage/${file.fieldname}/`, (err) => {
            cb(null, `./storage/${file.fieldname}/`)
        });
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname);
    },
    fileFilter: imagefileFilter
});


/**
 * Upload any type of file
 */
const fileUpload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 5
    }
});

const uploadFile = (filename) => {
    return fileUpload.array(filename);
}

module.exports = {
    uploadFile
};