const config = require('../config/config');
const pool = require('../config/database')

//MODULES FOR PROFILE PICTURE-------------------------
module.exports.getProfilePicture = (staff_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM profile_picture WHERE fk_staff_id = ?;', [staff_id], (err, rows) => {
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

exports.updateProfilePicture = (staff_id, filename) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE profile_picture SET filename = ? WHERE fk_staff_id = ?;', [filename, staff_id], (err, rows) => {
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
}

exports.insertProfilePicture = (staff_id, filename) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO profile_picture (filename,fk_staff_id) VALUES (?,?);', [filename, staff_id], (err, rows) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(rows);
            }
        })
    }).catch((error) => {
        console.error(error);
        return error
    })
}

//MODULES FOR REPORTS-------------------------
//IN USE
module.exports.uploadJSONReport = (prepvalues, data) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO module (mod_code, year_offered, mod_stage, mod_name, mod_abbrv, mod_dlt, mod_lecture, mod_tutorial, mod_practical, credit_unit, prereq, module_type, type,total_hours, remarks,fk_semester_code, fk_course_id)
        VALUES ${prepvalues}
        ON DUPLICATE KEY UPDATE 
        mod_code=VALUES(mod_code),
        year_offered=VALUES(year_offered),
        mod_stage=VALUES(mod_stage),
        mod_name=VALUES(mod_name),
        mod_abbrv=VALUES(mod_abbrv),
        mod_dlt=VALUES(mod_dlt),
        mod_lecture=VALUES(mod_lecture),
        mod_tutorial=VALUES(mod_tutorial),
        mod_practical=VALUES(mod_practical),
        credit_unit=VALUES(credit_unit),
        prereq=VALUES(prereq),
        module_type=VALUES(module_type),
        type=VALUES(type),
        total_hours=VALUES(total_hours),
        remarks=VALUES(remarks),
        fk_semester_code=VALUES(fk_semester_code),
        fk_course_id=VALUES(fk_course_id);`, data,
            (err, rows) => {
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

//NOT IN USE
exports.insertNewReport = (data) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO reports_file_store VALUES (?,?,?,?,?,?,?);', data, (err, rows) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(rows);
            }
        })
    }).catch((error) => {
        console.error(error);
        return error
    })
}
module.exports.getAllReport = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT file_id, filename, file_remarks, fk_semester_code, uploaded_time ,staff_information.stafF_name, system_roles.remarks
        FROM reports_file_store AS rfi
        INNER JOIN staff_information ON rfi.uploaded_by = staff_information.staff_id
        INNER JOIN system_roles ON rfi.allocated_to = system_roles.role_name`, (err, rows) => {
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
module.exports.getReportByStaffID = (staff_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM reports_file_store WHERE uploaded_by = ?;', [staff_id], (err, rows) => {
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
module.exports.getReportByID = (file_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM reports_file_store WHERE file_id = ?;', [file_id], (err, rows) => {
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
exports.deleteReport = (file_id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM reports_file_store WHERE file_id = ?;', [file_id], (err, rows) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(rows);
            }
        })
    }).catch((error) => {
        console.error(error);
        return error
    })
}
exports.updateReport = (data) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE reports_file_store SET filename = ?, allocated_to = ?, file_remarks = ?, fk_semester_code = ?  WHERE file_id = ?;', data, (err, rows) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(rows);
            }
        })
    }).catch((error) => {
        console.error(error);
        return error
    })
}

