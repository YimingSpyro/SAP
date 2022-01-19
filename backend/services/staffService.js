const config = require('../config/config');
const pool = require('../config/database')

// SECTION
module.exports.getAllSections = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT section_name, fk_course_id FROM designation`, [], (err, results) => {
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
    });
};

// COURSE
module.exports.getAllCourses = (status) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT DISTINCT course_id, course_name, status FROM course WHERE status = ?`, [status], (err, results) => {
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
    });
};
module.exports.createCourse = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO course VALUES(?,?,"active")`, data, (err, results) => {
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
    });
};
module.exports.updateCourse = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE course
         SET course_id = ?, course_name = ?
         WHERE course_id = ?;`, data, (err, results) => {
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
    });
};
module.exports.disableCourse = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE course
         SET status = ?
         WHERE course_id = ?;`, data, (err, results) => {
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
    });
};
module.exports.enableCourse = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE course
         SET status = ?
         WHERE course_id = ?;`, data, (err, results) => {
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
    });
};
module.exports.deleteCourse = (course_id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM course WHERE course_id = ?;`, [course_id], (err, results) => {
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
    });
};

// PERSONAL INFORRATION
module.exports.createStaff = (data, roles) => {
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
                
            }
        })

    });
};
module.exports.getAllStaff = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT staff_id, staff_name, staff_abbrv, staff_email,staff_number, staff_mobile, staff_remarks,staff_status, fk_staff_type ,designation_id, designation_name,section_name,fk_schedule_id AS 'schedule_id'
        FROM staff_information t1 INNER JOIN designation t2 WHERE t1.fk_designation_id=t2.designation_id AND t1.staff_status='Active';`, [], (err, results) => {
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
module.exports.getStaffByStaffId = (staff_id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT staff_id, staff_name, staff_abbrv, staff_email, designation.designation_name ,staff_number, staff_mobile, staff_remarks, fk_staff_type 
                 FROM staff_information 
                 INNER JOIN designation ON fk_designation_id= designation.designation_id 
                 WHERE staff_id = ? AND staff_status='Active';`, [staff_id], (err, results) => {
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
module.exports.deleteStaffByStaffId = (staff_id) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE staff_information SET staff_status='Inactive' WHERE staff_id=?`, [staff_id], (err, results) => {
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
module.exports.updateStaffByStaffId = (data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`UPDATE staff_information 
                     SET staff_name= ?, staff_abbrv = ?,fk_staff_type=?,fk_schedule_id=?,fk_designation_id=?, staff_email = ?, staff_number = ?, staff_mobile = ?, staff_remarks = ?,staff_status=? 
                     WHERE staff_id = ?;`, data, (err, results) => {
            if (err) {
                console.log("error");
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

        return error
    });
};
module.exports.updatePersonalInfoByID = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`UPDATE staff_information 
                     SET staff_abbrv = ?, staff_email = ?, staff_number = ?, staff_mobile = ?, staff_remarks = ?
                     WHERE staff_id = ?;`, data, (err, results) => {
            if (err) {
                console.log("error");
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

        return error
    });
};

// PERSONAL TEACHING REQUIREMENT

module.exports.getTeachingRequirementByID = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT * FROM personal_teaching_req WHERE fk_staff_id = ? AND fk_semester_code = ? ORDER BY FIELD(ptr_day,'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'), ptr_time ASC;`, data, (err, results) => {
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

        return error
    });
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
                    console.log(results);
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
                    console.log(results);
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
module.exports.getAllModules = (semester_code) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT * FROM module WHERE fk_semester_code = ?;`, [semester_code], (err, results) => {
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

        return error
    });
};


// MODULE PREFERENCE

module.exports.getAllModulePreference = (semester_code) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT * FROM module_preference;`, [semester_code], (err, results) => {
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

        return error
    });
};
module.exports.getModulePreferenceByID = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT * FROM module_preference WHERE fk_staff_id = ? AND fk_semester_code = ?;`, data, (err, results) => {
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

        return error
    });
};

// MODULE ASSIGNMENT
module.exports.getAssignedModulesByModule = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT ma_lecture,ma_tutorial,ma_practical, module.mod_lecture, module.mod_tutorial, module.mod_practical, module.mod_code, module.mod_name, module.mod_abbrv, module.fk_mod_coord,module.fk_course_id,module.mod_stage, module.lecture_class, module.tutorial_class, module.practical_class, module.total_students FROM mod_assign
         INNER JOIN module
         ON mod_assign.fk_mod_code = module.mod_code
         WHERE fk_mod_code = ? AND module.fk_semester_code = ?;`, data, (err, results) => {
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
        return error
    });
};
module.exports.getAssignedModulesByID = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT assignment_id,ma_lecture,ma_tutorial,ma_practical, module.mod_lecture, module.mod_tutorial, module.mod_practical, module.fk_semester_code, module.mod_code, module.mod_name, module.mod_abbrv, module.fk_mod_coord,module.fk_course_id,module.mod_stage, module.lecture_class, module.tutorial_class, module.practical_class, module.total_students FROM mod_assign
         INNER JOIN module
         ON mod_assign.fk_mod_code = module.mod_code
         WHERE fk_staff_id = ? AND module.fk_semester_code = ?;`, data, (err, results) => {
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
        return error
    });
};
module.exports.updateAssignedModuleByID = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`UPDATE mod_assign  
             SET ma_lecture = ?, ma_tutorial = ?, ma_practical = ?
             WHERE CONCAT(prefix,assignment_id) = ?;`, data, (err, results) => {
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

        return error
    });
};


//TAS
module.exports.getAllStaffTAS = (section) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT staff_id, staff_name FROM staff_information
        WHERE staff_status='Active'`, [section], (err, results) => {
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

        return error
    });
};
module.exports.updateModuleTAS = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`UPDATE module  
             SET fk_mod_coord = ?, mod_lecture = ?, mod_tutorial = ?, mod_practical = ?, lecture_class = ?, tutorial_class = ?, practical_class = ?, total_students = ?
             WHERE mod_code = ? AND fk_semester_code = ?;`, data, (err, results) => {
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
        return error
    });
};

// CAS - Admin Support
module.exports.updateModuleCAS = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`UPDATE module  
             SET mod_lecture = ?, mod_tutorial = ?, mod_practical = ?, lecture_class = ?, tutorial_class = ?, practical_class = ?, total_students = ?
             WHERE mod_code = ? AND fk_semester_code = ?;`, data, (err, results) => {
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
        return error
    });
};