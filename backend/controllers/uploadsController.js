const config = require('../config/config');
const pool = require('../config/database')

//MULTER PACKAGE CONFIGURATIONS START-----------
//declare multer package for file uploads.
//const multer = require('multer')

/* const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
}; */

const multer = require('multer')
const upload = multer({
/*     limits: {
        fileSize: 1024 * 1024 * 5
    }, */
    dest: '../uploads/profile_picture'
    //fileFilter: fileFilter
});

//MULTER PACKAGE CONFIGURATIONS END--------------
