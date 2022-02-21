const config = require('../config/config');
const pool = require('../config/database')

// SECTION
module.exports.getAllSections = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT DISTINCT section_name, fk_course_id FROM designation`, [], (err, results) => {
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


// STAFF TYPES
module.exports.getStaffTypes = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM staff_types`, [], (err, results) => {
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
module.exports.createStaffType = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO staff_types VALUES(?,?,?,?)`, data, (err, results) => {
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
module.exports.deleteStaffType = (staff_type) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`DELETE FROM staff_types WHERE staff_type = ?;`, [staff_type], (err, results) => {
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
module.exports.updateStaffType = (data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`UPDATE staff_types 
                     SET staff_type = ?, staff_description = ?, hours = ?, remarks = ?
                     WHERE staff_type = ?;`, data, (err, results) => {
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


// DESIGNATION
module.exports.getAllDesignations = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT designation_id, designation_name, fk_course_id, section_name FROM designation`, [], (err, results) => {
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
module.exports.createDesignation = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO designation (designation_name,fk_course_id,section_name) VALUES(?,?,?)`, data, (err, results) => {
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
module.exports.deleteDesignation = (designation_id) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`DELETE FROM designation WHERE CONCAT(prefix,designation_id) = ?;`, [designation_id], (err, results) => {
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
module.exports.updateDesignation = (data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`UPDATE designation 
                     SET designation_name = ?, fk_course_id = ?, section_name = ?
                     WHERE CONCAT(prefix,designation_id) = ?;`, data, (err, results) => {
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
                            let role_ids = roles[0];
                            const staff_id = roles[1];
                            if (role_ids <= 0) return reject("No role specified!");
                            else {
                                if (role_ids.length > 1) {
                                    console.log("multiple role");
                                    for (let i = 0; i < role_ids.length; i++) {
                                        {
                                            connection.query(`INSERT INTO staff_privileges (fk_role_id,fk_staff_id) VALUES(?,?)`, [role_ids[i], staff_id], (err, results1) => {
                                                if (err) {
                                                    console.log(err);
                                                    reject(err);
                                                } else {
                                                    if (results1 && i == role_ids.length) {
                                                        console.log(results1);
                                                        return resolve(results);
                                                    }
                                                }
                                            })
                                        }
                                    }
                                } else {
                                    console.log("one role");
                                    connection.query(`INSERT INTO staff_privileges (fk_role_id,fk_staff_id) VALUES(?,?)`, [role_ids[0], staff_id], (err, results1) => {
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
                                }
                            }
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
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(`SELECT staff_id, staff_name, staff_abbrv, staff_email,staff_number, staff_mobile, staff_remarks,staff_status, fk_staff_type ,designation_id, designation_name,section_name,fk_schedule_id AS 'schedule_id'
                FROM staff_information t1 INNER JOIN designation t2 WHERE t1.fk_designation_id=t2.designation_id;`, [], (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (results) {
                            console.log("yo");
                            connection.query(`SELECT * from staff_privileges;`, [], (err, results1) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    if (results1) {
                                        var privilegeById = [];
                                        for (const i in results1) {
                                            if (privilegeById > 1) {
                                                for (const j in privilegeById) {
                                                    if (!privilegeById[j].staff_id == results1[i].fk_staff_id) {
                                                        console.log("same");
                                                    }
                                                }
                                            }
                                            /* if(privilegeById.filter(e =>e.staff_id=results1[i].fk_staff_id)) {
                                                privilegeById.push({
                                                    staff_id :results1[i].fk_staff_id,
                                                })
                                                console.log(privilegeById);
                                                console.log(privilegeById.length);
                                            } */
                                        }
                                        console.log(privilegeById);
                                        console.log(privilegeById.length);
                                        return resolve(results);
                                    } else {
                                        return resolve('Error Message');
                                    }
                                }

                            });

                        } else {
                            return resolve('Error Message');
                        }
                    }

                });
            }
        })

    });
};
module.exports.getAllStaffNames = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT staff_id, staff_name FROM staff_information;`, [], (err, results) => {
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
module.exports.getStaffNames = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT staff_id, staff_name FROM staff_information WHERE staff_status='Active' ;`, [], (err, results) => {
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
module.exports.updateStaffByStaffId = (data, [role_ids, staff_id]) => {
    return new Promise((resolve, reject) => {
        //used pool.getconnnection here to perform multiple queries

        data.push(staff_id);
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                connection.query(`UPDATE staff_information 
                SET staff_name= ?, staff_abbrv = ?,fk_staff_type=?,fk_schedule_id=?,fk_designation_id=?, staff_email = ?, staff_number = ?, staff_mobile = ?, staff_remarks = ?,staff_status=? 
                WHERE staff_id = ?;`, data, (err, results) => {
                    if (err) {
                        console.log("error");
                        reject(err);
                    } else {
                        if (results) {
                            if (role_ids <= 0) return reject("No role specified!");
                            else {
                                connection.query(`DELETE FROM staff_privileges WHERE fk_staff_id = ? `, [staff_id], (err, results1) => {
                                    if (err) {
                                        console.log(err);
                                        reject(err);
                                    } else {
                                        if (results1) {
                                            if (role_ids.length > 1) {
                                                console.log("multiple role");
                                                for (let i = 0; i < role_ids.length; i++) {
                                                    console.log(i);
                                                    {
                                                        connection.query(`INSERT INTO staff_privileges (fk_role_id,fk_staff_id) VALUES(?,?)`, [role_ids[i], staff_id], (err, results2) => {
                                                            if (err) {
                                                                console.log(err);
                                                                reject(err);
                                                            } else {


                                                                if (results2 && i == role_ids.length - 1) {
                                                                    return resolve(results);
                                                                }
                                                            }
                                                        })
                                                    }
                                                }
                                            } else {
                                                console.log("one role");
                                                connection.query(`INSERT INTO staff_privileges (fk_role_id,fk_staff_id) VALUES(?,?)`, [role_ids[0], staff_id], (err, results1) => {
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
                                            }
                                        }
                                    }
                                })
                            }
                        } else {
                            return resolve('Error Message');
                        }
                    }

                });
            }
        })

    });
};

module.exports.resetStaffPassword = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`UPDATE staff_information 
                     SET staff_password = ?
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
module.exports.getStaffRoles = (staff_id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM staff_privileges WHERE fk_staff_id = ?`, [staff_id], (err, results) => {
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
/* module.exports.createStaffRoles = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO staff_privileges (fk_role_id, fk_staff_id) VALUES (?,?)`, data, (err, results) => {
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
module.exports.deleteStaffRoles = (staff_id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM staff_privileges WHERE fk_staff_id = ?`, [staff_id], (err, results) => {
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
 */
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
        pool.query(`SELECT * FROM mod_assign
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
         WHERE fk_staff_id = ? AND mod_assign.fk_semester_code = ? AND module.fk_semester_code = ?;`, data, (err, results) => {
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
        pool.query(`SELECT staff_id, staff_name, fk_staff_type FROM staff_information
         WHERE staff_status='Active'
         ORDER BY staff_id ASC;`, [section], (err, results) => {
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
             SET normal_students = ?, os_students = ?, total_students = ?
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
        console.error("SQL Error: ", error);
        return error
    });
};
module.exports.getModuleStage = (semester_code) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`SELECT DISTINCT mod_stage FROM module WHERE fk_semester_code = ?`, [semester_code], (err, results) => {
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
module.exports.updateNormalStudents = (data) => {
    return new Promise((resolve, reject) => {
        //please use only ? when declaring values to be inserted to prevent sql injection
        pool.query(`UPDATE module  
             SET normal_students = ?
             WHERE fk_course_id = ? AND fk_semester_code = ? AND mod_stage = ?;`, data, (err, results) => {
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