const config = require('../config/config');
const pool = require('../config/database')

module.exports.getProfilePicture = (staff_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM profile_picture WHERE fk_staff_id = ?;', [staff_id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    }).catch((error) => {
        console.error(error);
        return error
    })
};

exports.updateProfilePicture = (staff_id, filename) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE profile_picture SET filename = ? WHERE fk_staff_id = ?;', [filename, staff_id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    }).catch((error) => {
        console.error(error);
        return error
    })
}

exports.insertProfilePicture = (staff_id, filename) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO profile_picture (filename,fk_staff_id) VALUES (?,?);', [filename, staff_id], (err, rows) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(rows);
            }
        })
    }).catch((error) => {
        console.error(error);
        return error
    })
}