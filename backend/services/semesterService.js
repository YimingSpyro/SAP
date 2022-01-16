const config = require('../config/config');
const pool = require('../config/database')

module.exports.getAllSemesters= () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM tas.semester_code;', (err, rows) => {
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