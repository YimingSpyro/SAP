const config = require('../config/config');
const pool = require('../config/database');

module.exports.getAllExam = () => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT * FROM exam_verifier_sys;`, [], (err, results) => {
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
    }).catch((error) => {
        console.error(error);
        return error
    });
};

module.exports.getExamByExamId = () => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT * FROM exam_verifier_sys WHERE exam_id = ?;`, [examId], (err, results) => {
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
    }).catch((error) => {
        console.error(error);
        return error
    });
};

module.exports.createExam = () => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`INSERT INTO exam_verifier_sys(fk_mod_code, exam_type, offered_to, fk_examiner_id, fk_moderator_id, external_mod, fk_marker_id, fk_verifier_id, verifier_details, marks_moderator, fk_semester_code) VALUES (?,?,?,?,?,?,?,?,?,?,?)`, data, (err, results) => {
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
    }).catch((error) => {
        console.error(error);
        return error
    });
};