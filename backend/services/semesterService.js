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

// SEMESTER
module.exports.getAllSemestersByStatus = (status) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT semester_id, semester_code, remarks, latest_sem FROM semester_code WHERE latest_sem = ?`, [status], (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results) {
                    return resolve(results);
                } else {
                    return resolve('Error Message');
                }
            }
            
        });
    });
};
module.exports.createSemester = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO semester_code (semester_id,semester_code,remarks,latest_sem) VALUES(?,?,?,"INACTIVE")`, data, (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results) {
                    return resolve(results);
                } else {
                    return resolve('Error Message');
                }
            }
            
        });
    });
};
module.exports.updateSemester = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE semester_code
         SET semester_id = ?, semester_code = ?, remarks = ?
         WHERE semester_id = ?;`, data, (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results) {
                    return resolve(results);
                } else {
                    return resolve('Error Message');
                }
            }
            
        });
    });
};
module.exports.disableSemester = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE semester_code
         SET latest_sem = ?
         WHERE semester_id = ?;`, data, (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results) {
                    return resolve(results);
                } else {
                    return resolve('Error Message');
                }
            }
            
        });
    });
};
module.exports.enableSemester = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE semester_code
         SET latest_sem = ?
         WHERE semester_id = ?;`, data, (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results) {
                    return resolve(results);
                } else {
                    return resolve('Error Message');
                }
            }
            
        });
    });
};
module.exports.deleteSemester = (semester_id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM semester_code WHERE semester_id = ?;`, [semester_id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results) {
                    return resolve(results);
                } else {
                    return resolve('Error Message');
                }
            }
            
        });
    });
};