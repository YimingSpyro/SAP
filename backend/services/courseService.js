const config = require('../config/config');
const pool = require('../config/database')

//function gets all courses, including inactive courses, except SOC default.
module.exports.getAllCourses= () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM tas.course WHERE course_id != \'SOC\';', (err, rows) => {
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