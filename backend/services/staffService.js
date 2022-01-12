const config = require('../config/config');
const pool = require('../config/database')

// PERSONAL INFORRATION
module.exports.createStaff = (data,roles) => {
    return new Promise((resolve, reject) => {
        //used pool.getconnnection here to perform multiple queries
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                connection.query(`INSERT INTO staff_information (staff_id,staff_name,staff_abbrv,fk_designation_id,staff_email,staff_number,staff_mobile,staff_remarks,staff_password,fk_staff_type,fk_schedule_id,staff_status)
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?);`, data, (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log("created");
                        if (results) {
                            connection.query(`INSERT INTO staff_privileges (fk_role_id,fk_staff_id) VALUES(?,?)`, roles, (err, results1) => {
                                if (err) {
                                    console.log(err);
                                    reject(err);
                                } else {
                                    if (results1) {
                                        console.log(results1);
                                        return resolve(results);
                                    } else {
                                        return resolve('Error Message');
                                    }
                                }
                            })
                            console.log(results);
                            return resolve(results);
                        } else {
                            return resolve('Error Message');
                        }
                    }
                });
                connection.release();
            }
        })

    });
};
module.exports.getAllStaff = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT staff_id, staff_name, staff_abbrv, staff_email,staff_number, staff_mobile, staff_remarks, fk_staff_type ,designation_id, designation_name,section_name
        FROM staff_information t1 INNER JOIN designation t2 WHERE t1.fk_designation_id=t2.designation_id AND t1.staff_status='Active';`, [], (err, results) => {
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
            connection.release();
        });
    });
};
module.exports.getStaffByStaffId = (staff_id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT staff_id, staff_name, staff_abbrv, staff_email, fk_designation_id,staff_number, staff_mobile, staff_remarks, fk_staff_type 
                 FROM staff_information WHERE staff_id = ?;`, [staff_id], (err, results) => {
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
            connection.release();
        });
    });
};
module.exports.deleteStaffByStaffId = (staff_id) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE staff_information SET staff_status='Inactive' WHERE staff_id=?`, [staff_id], (err, results) => {
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
            connection.release();
        });
    });
};
module.exports.updateStaffByStaffId = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`UPDATE staff_information 
                     SET staff_name= ?, staff_abbrv = ?, staff_email = ?, staff_number = ?, staff_mobile = ?, staff_remarks = ? 
                     WHERE staff_id = ?;`, data, (err, results) => {
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

// PERSONAL TEACHING REQUIREMENT

module.exports.getTeachingRequirementByID = (staff_id) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT * FROM personal_teaching_req WHERE fk_staff_id = ? ORDER BY FIELD(ptr_day,'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'), ptr_time ASC;`, [staff_id], (err, results) => {
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
module.exports.createTeachingRequirement = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`INSERT INTO personal_teaching_req (fk_staff_id,ptr_day,ptr_time,ptr_duration,ptr_reason,fk_semester_code)
                 VALUES (?,?,?,?,?,?);`, data, (err, results) => {
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
    })
};
module.exports.updateTeachingRequirement = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`UPDATE personal_teaching_req 
                 SET ptr_day = ?, ptr_time = ?, ptr_duration = ?, ptr_reason = ?
                 WHERE CONCAT(prefix,ptr_id) = ?;`, data, (err, results) => {
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
module.exports.deleteTeachingRequirement = (ptr_id) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`DELETE FROM personal_teaching_req WHERE CONCAT(prefix,ptr_id) = ?;`, [ptr_id], (err, results) => {
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

module.exports.getTeachingRequirementRemarks = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT ptr_remarks FROM ptr_remarks WHERE fk_staff_id = ? AND fk_semester_code = ?;`, data, (err, results) => {
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
module.exports.createTeachingRequirementRemarks = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`INSERT INTO ptr_remarks (fk_staff_id,ptr_remarks,fk_semester_code)
                 VALUES (?,?,?);`, data, (err, results) => {
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
module.exports.updateTeachingRequirementRemarks = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`UPDATE ptr_remarks  
                 SET ptr_remarks = ?
                 WHERE fk_semester_code = ? AND fk_staff_id = ?;`, data, (err, results) => {
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

// MODULE 

module.exports.getAllModules = () => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT * FROM module;`, [], (err, results) => {
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
module.exports.createModule = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`INSERT INTO module (mod_code,mod_name,mod_abbrv,mass_lect,fk_mod_coord,mod_dlt,mod_lecture,mod_tutorial,mod_practical,fk_cluster_ldr,fk_semester_code,odd_lechr,even_lechr,odd_prachr,even_prachr,odd_tuthr,even_tuthr,fk_course_id)
                                 VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`, data, (err, results) => {
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


// MODULE PREFERENCE

module.exports.getAllModulePreference = () => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT * FROM module_preference;`, [], (err, results) => {
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
module.exports.getModulePreferenceByID = (staff_id) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT * FROM module_preference WHERE fk_staff_id = ?;`, [staff_id], (err, results) => {
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
module.exports.submitModulePreference = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`INSERT INTO module_preference (fk_staff_id,fk_semester_code,preference) VALUES (?,?,?);`, data, (err, results) => {
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
module.exports.updateModulePreferenceByID = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`UPDATE module_preference SET preference = ? WHERE fk_staff_id = ? AND fk_semester_code = ?;`, data, (err, results) => {
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

// MODULE ASSIGNMENT
module.exports.getAssignedModulesByID = (staff_id) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT ma_lecture,ma_tutorial,ma_practical, module.mod_code, module.mod_name, module.mod_abbrv, module.fk_mod_coord,module.fk_course_id,module.year_offered FROM mod_assign
         INNER JOIN module
         ON mod_assign.fk_mod_code = module.mod_code
         WHERE fk_staff_id = ?;`, [staff_id], (err, results) => {
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
module.exports.assignModuleByID = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`INSERT INTO mod_assign (fk_mod_code,fk_staff_id,ma_lecture,ma_tutorial,ma_practical,fk_semester_code) VALUES (?,?,?,?,?,?);`, data, (err, results) => {
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
module.exports.unassignModuleByID = (ma_id) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`DELETE FROM mod_assign WHERE CONCAT(prefix,assignment_id) = ?;`, [ma_id], (err, results) => {
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