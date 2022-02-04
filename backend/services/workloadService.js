const config = require('../config/config');
const pool = require('../config/database');

//regex patterns for workload summary
const exam_pattern = /.+ST$/
const ca_pattern = /^CA\d/

module.exports.getWorkloadByMC = (staff_id) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT tas.mod_workload.*, module.fk_mod_coord FROM tas.mod_workload
                    INNER JOIN module
                    ON fk_mod_code = mod_code
                    INNER JOIN semester_code
                    ON tas.mod_workload.fk_semester_code = semester_code
                    WHERE fk_mod_coord = ? AND latest_sem = 'ACTIVE';`, [staff_id], (err, results) => {
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
    }).catch((error) => {

        return error
    });
};

module.exports.getWorkloadByAdmin = (semester_code) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT tas.mod_workload.*, module.fk_mod_coord FROM tas.mod_workload
                    INNER JOIN module
                    ON fk_mod_code = mod_code
                    INNER JOIN semester_code
                    ON tas.mod_workload.fk_semester_code = semester_code
                    WHERE tas.mod_workload.fk_semester_code = ?;`, [semester_code], (err, results) => {
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
    }).catch((error) => {

        return error
    });
};
module.exports.createWorkload = (component_code,data) => {
    let query;
    if (ca_pattern.test(component_code)) {
        query = `INSERT INTO mod_workload (fk_mod_code, fk_semester_code, fk_uploaded_by, mod_stage, component_code, nrc, weightage,
            group_size, start_weeks, end_weeks, remarks) VALUES (?,?,?,?,?,?,?,?,?,?,?)
            ON DUPLICATE KEY UPDATE
            fk_mod_code=VALUES(fk_mod_code),
            fk_semester_code=VALUES(fk_semester_code),
            fk_uploaded_by=VALUES(fk_uploaded_by),
            mod_stage=VALUES(mod_stage),
            nrc=VALUES(nrc),
            weightage=VALUES(weightage),
            group_size=VALUES(group_size),
            start_weeks=VALUES(start_weeks),
            end_weeks=VALUES(end_weeks),
            remarks=VALUES(remarks);`
    } else if (exam_pattern.test(component_code)) {
        query = `INSERT INTO mod_workload (fk_mod_code, fk_semester_code, fk_uploaded_by, mod_stage, component_code, nrc, weightage,
            testwk_type, type, duration, special_requirement ) VALUES (?,?,?,?,?,?,?,?,?,?,?)
            ON DUPLICATE KEY UPDATE
            fk_mod_code=VALUES(fk_mod_code),
            fk_semester_code=VALUES(fk_semester_code),
            fk_uploaded_by=VALUES(fk_uploaded_by),
            mod_stage=VALUES(mod_stage),
            nrc=VALUES(nrc),
            weightage=VALUES(weightage),
            testwk_type=VALUES(testwk_type),
            type=VALUES(type),
            duration=VALUES(duration),
            special_requirement=VALUES(special_requirement);`
    };
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(query, data, (err, results) => {
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
    }).catch((error) => {
        return error
    });
};

module.exports.deleteWorkload = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`DELETE FROM mod_workload WHERE fk_mod_code=? AND fk_semester_code=? AND mod_stage=? AND component_code=?;`,data, (err, results) => {
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
    }).catch((error) => {

        return error
    });
};



