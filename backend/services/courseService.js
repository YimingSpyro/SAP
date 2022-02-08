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

// COURSE
module.exports.getAllCoursesByStatus = (status) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT DISTINCT course_id, course_name, status FROM course WHERE status = ?`, [status], (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results) {
                    //console.log(results);
                    return resolve(results);
                } else {
                    return resolve('Error Message');
                }
            }
            
        });
    });
};
module.exports.createCourse = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO course VALUES(?,?,"active")`, data, (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results) {
                    console.log(results);
                    return resolve(results);
                } else {
                    return resolve('Error Message');
                }
            }
            
        });
    });
};
module.exports.updateCourse = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE course
         SET course_id = ?, course_name = ?
         WHERE course_id = ?;`, data, (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results) {
                    console.log(results);
                    return resolve(results);
                } else {
                    return resolve('Error Message');
                }
            }
            
        });
    });
};
module.exports.disableCourse = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE course
         SET status = ?
         WHERE course_id = ?;`, data, (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results) {
                    console.log(results);
                    return resolve(results);
                } else {
                    return resolve('Error Message');
                }
            }
            
        });
    });
};
module.exports.enableCourse = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE course
         SET status = ?
         WHERE course_id = ?;`, data, (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results) {
                    console.log(results);
                    return resolve(results);
                } else {
                    return resolve('Error Message');
                }
            }
            
        });
    });
};
module.exports.deleteCourse = (course_id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM course WHERE course_id = ?;`, [course_id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results) {
                    console.log(results);
                    return resolve(results);
                } else {
                    return resolve('Error Message');
                }
            }
            
        });
    });
};