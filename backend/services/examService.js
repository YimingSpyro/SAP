const config = require('../config/config');
const pool = require('../config/database');


module.exports.getExamByModule = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM exam_verifier_sys WHERE fk_module_code = ? AND fk_semester_code = ? AND fk_course_id = ?;`, data, (err, results) => {
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

module.exports.createExam = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`INSERT INTO exam_verifier_sys VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, data, (err, results) => {
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

module.exports.updateExam = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`UPDATE exam_verifier_sys
         SET moderator = ?, mdeo_marker = ?, co_marker = ?, verifier = ?, verifier_details = ?, markers_moderator = ?,
         module_mcl = ?, chief_examiner = ?, co_examiner = ?, shared_paper = ?, shared_question = ?, type_of_module = ?, external = ?
         WHERE fk_module_code = ? AND fk_semester_code = ? AND fk_course_id = ?`, data, (err, results) => {
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