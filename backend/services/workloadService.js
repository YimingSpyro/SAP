const config = require('../config/config');
const pool = require('../config/database')

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