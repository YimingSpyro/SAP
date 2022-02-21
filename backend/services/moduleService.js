const config = require('../config/config');
const pool = require('../config/database')

module.exports.getEveryModule = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT tas.module.*, tas.staff_information.staff_name FROM tas.module INNER JOIN tas.staff_information ON fk_mod_coord = staff_id ORDER BY fk_semester_code, mod_stage LIMIT 10;', (err, rows) => {
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

// MODULE 
module.exports.getModuleBySection = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT * FROM module WHERE fk_course_id = ? AND fk_semester_code = ?`, data, (err, results) => {
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
module.exports.getModuleBySectionAndStage = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT * FROM module WHERE fk_course_id = ? AND fk_semester_code = ? AND mod_stage = ?`, data, (err, results) => {
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
module.exports.getModuleByCode = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT * FROM module WHERE mod_code = ? AND fk_semester_code = ?`, data, (err, results) => {
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
// MODULE 
module.exports.getModuleByModCoord = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT * FROM module INNER JOIN semester_code ON fk_semester_code = semester_code WHERE fk_mod_coord = ? AND latest_sem = 'ACTIVE'`, data, (err, results) => {
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
    }).catch((error) => {

        return error
    });
};
//getdashboard specifically for mc
module.exports.getMCDashboardModules = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT module.fk_course_id, mod_code,module.mod_stage, mod_name, mod_abbrv, SUM(mod_workload.weightage) FROM module 
        INNER JOIN semester_code ON fk_semester_code = semester_code 
        LEFT OUTER JOIN mod_workload ON mod_code = fk_mod_code
        WHERE fk_mod_coord = ? AND latest_sem = 'ACTIVE' 
        GROUP BY fk_mod_code`, data, (err, results) => {
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
    }).catch((error) => {

        return error
    });
};
module.exports.getAllModules = (semester_code,course_id) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT tas.module.*, tas.staff_information.staff_name FROM module LEFT OUTER JOIN tas.staff_information ON fk_mod_coord = staff_id WHERE fk_semester_code = ? AND fk_course_id=?;`, [semester_code,course_id], (err, results) => {
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
module.exports.getAllSemesterModules = (semester_code) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT * FROM module WHERE fk_semester_code = ? ;`, [semester_code], (err, results) => {
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
module.exports.createModule = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`INSERT INTO module (mod_code,mod_name,mod_abbrv,mass_lect,fk_mod_coord,mod_dlt,mod_lecture,mod_tutorial,mod_practical,fk_cluster_ldr,fk_semester_code,odd_lechr,even_lechr,odd_prachr,even_prachr,odd_tuthr,even_tuthr,fk_course_id)
                                 VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`, data, (err, results) => {
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
    }).catch((error) => {

        return error
    });
};
module.exports.updateModule = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`UPDATE tas.module
        SET mod_code=?,mod_name=?,mod_abbrv=?,mod_stage=?,
        fk_mod_coord=?,fk_semester_code=?,fk_course_id=?,
        mod_dlt=?,mod_lecture=?,mod_tutorial=?,mod_practical=?,total_hours=?,
        lecture_class=?,tutorial_class=?,practical_class=?,
        type=?,module_type=?,prereq=?,remarks=?,credit_unit=?,
        normal_students=?,os_students=?,total_students=?
        WHERE fk_semester_code= ? AND  mod_code= ?  AND year_offered= ? AND mod_stage= ?;`, data, (err, results) => {
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
module.exports.updateMCModule = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`UPDATE tas.module
        SET odd_lechr=?,even_lechr=?,odd_prachr=?,even_prachr=?,
        odd_tuthr=?,even_tuthr=?, mass_lect=?
        WHERE fk_semester_code= ? AND  mod_code= ?  AND year_offered= ? AND mod_stage= ?;`, data, (err, results) => {
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
