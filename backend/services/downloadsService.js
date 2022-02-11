const config = require('../config/config');
const pool = require('../config/database')

module.exports.getAssignmentReport = (acad_sem) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT SUM(ma_lecture), SUM(ma_tutorial), SUM(ma_practical), mod_code, mod_stage, mod_abbrv, lecture_class, practical_class, tutorial_class, fk_course_id, FLOOR(mod_lecture/15), FLOOR(mod_tutorial/15), FLOOR(mod_practical/15) FROM mod_assign INNER JOIN  module ON mod_assign.fk_mod_code = module.mod_code WHERE mod_assign.fk_semester_code = ? AND module.fk_semester_code = ? GROUP BY mod_code;',
            [acad_sem, acad_sem], (err, rows) => {
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
            [acad_sem], (err, rows) => {
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

module.exports.getSummaryByModule = (acad_sem) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT staff_name,fk_staff_id, ma_lecture,ma_tutorial, ma_practical, mod_code,fk_mod_coord, mod_stage, section_name
                    FROM mod_assign 
                    INNER JOIN  module
                    ON mod_assign.fk_mod_code = module.mod_code
                    INNER JOIN staff_information
                    ON mod_assign.fk_staff_id = staff_information.staff_id
                    INNER JOIN designation
                    ON designation.designation_id = staff_information.fk_designation_id
                    WHERE mod_assign.fk_semester_code = ? AND module.fk_semester_code = ?
                    ORDER BY designation.section_name, designation.fk_course_id`,
            [acad_sem, acad_sem], (err, rows) => {
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

module.exports.getSummaryByStaff = (acad_sem) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT staff_name,fk_staff_id,SUM(ma_lecture), SUM(ma_tutorial), SUM(ma_practical), FLOOR(mod_lecture/15)*SUM(ma_lecture) AS classhrL, FLOOR(mod_tutorial/15)*SUM(ma_tutorial) AS classhrT, FLOOR(mod_practical/15)*SUM(ma_practical) AS classhrP,mod_code, mod_abbrv,fk_mod_coord, module.fk_course_id AS course, mod_stage,section_name
                    FROM mod_assign 
                    INNER JOIN  module
                    ON mod_assign.fk_mod_code = module.mod_code
                    INNER JOIN staff_information
                    ON mod_assign.fk_staff_id = staff_information.staff_id
                    INNER JOIN designation
                    ON designation.designation_id = staff_information.fk_designation_id
                    WHERE mod_assign.fk_semester_code = ? AND module.fk_semester_code = ?
                    GROUP BY staff_name, mod_code, mod_stage
                    ORDER BY staff_name, course;`,
            [acad_sem, acad_sem], (err, rows) => {
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

module.exports.getTotalHoursByStaff = (acad_sem) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT staff_name,fk_staff_id, SUM(ma_lecture), SUM(ma_tutorial), SUM(ma_practical), SUM(FLOOR(mod_lecture/15)*ma_lecture) AS classhrL, SUM(FLOOR(mod_tutorial/15)*ma_tutorial) AS classhrT, SUM(FLOOR(mod_practical/15)*ma_practical) AS classhrP
                    FROM mod_assign 
                    INNER JOIN staff_information
                    ON mod_assign.fk_staff_id = staff_information.staff_id
                    INNER JOIN  module
                    ON mod_assign.fk_mod_code = module.mod_code
                    WHERE mod_assign.fk_semester_code = ? AND module.fk_semester_code = ? 
                    GROUP BY staff_name
                    ORDER BY staff_name;`,
            [acad_sem, acad_sem], (err, rows) => {
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

module.exports.getWorkloadSummaryByModule = (acad_sem) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT tas.mod_workload.*, mod_abbrv, module.fk_course_id, fk_mod_coord, 
                    staff_name FROM tas.mod_workload 
                    INNER JOIN module
                    ON fk_mod_code = mod_code
                    INNER JOIN staff_information
                    ON fk_mod_coord = staff_id
                    WHERE mod_workload.fk_semester_code = ? 
                    ORDER BY fk_mod_code, component_code;`,
            [acad_sem], (err, rows) => {
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

module.exports.getExaminerReports = (acad_sem) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT tas.exam_verifier_sys.*, mod_abbrv, mod_name FROM tas.exam_verifier_sys
                    INNER JOIN module
                    ON fk_module_code = mod_code
                    WHERE tas.exam_verifier_sys.fk_semester_code = ?;`,
            [acad_sem], (err, rows) => {
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