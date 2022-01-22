const config = require('../config/config');
const pool = require('../config/database')

module.exports.getAssignmentReport = (acad_sem) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT SUM(ma_lecture), SUM(ma_tutorial), SUM(ma_practical), mod_code, mod_stage, mod_abbrv, lecture_class, practical_class, tutorial_class, fk_course_id FROM mod_assign INNER JOIN  module ON mod_assign.fk_mod_code = module.mod_code WHERE mod_assign.fk_semester_code = ? AND module.fk_semester_code = ? GROUP BY mod_code;',
            [acad_sem,acad_sem],(err, rows) => {
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

module.exports.getMCList = (acad_sem) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT mod_code, mod_abbrv, fk_mod_coord, staff_name FROM tas.module INNER JOIN staff_information ON fk_mod_coord = staff_id WHERE fk_mod_coord != \'\' AND fk_semester_code = ?;',
            [acad_sem],(err, rows) => {
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