const config = require('../config/config');
const pool = require('../config/database')

// PERSONAL INFORRATION

module.exports.getAllStaff = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('Error Message Here', err);
                resolve(err);
            } else {
                //please use only ? when declaring values to be inserted to prevent sql injection
                connection.query(`SELECT staff_id, staff_name, staff_abbrv, staff_email, staff_number, staff_mobile, staff_remarks 
                 FROM staff_information;`, [] ,(err, results) => { 
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
            }
        });
    }); 
};
module.exports.getStaffByStaffId = (staff_id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('Error Message Here', err);
                resolve(err);
            } else {
                //please use only ? when declaring values to be inserted to prevent sql injection
                connection.query(`SELECT staff_id, staff_name, staff_abbrv, staff_email, staff_number, staff_mobile, staff_remarks 
                 FROM staff_information WHERE staff_id = ?;`, [staff_id] ,(err, results) => { 
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
            }
        });
    }); 
};
module.exports.updateStaffByStaffId = (data) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('Error Message Here', err);
                resolve(err);
            } else {
                //please use only ? when declaring values to be inserted to prevent sql injection
                connection.query(`UPDATE staff_information 
                     SET staff_name= ?, staff_abbrv = ?, staff_email = ?, staff_number = ?, staff_mobile = ?, staff_remarks = ? 
                     WHERE staff_id = ?;`, data ,(err, results) => { 
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
            }
        });
    }); 
};

// PERSONAL TEACHING REQUIREMENT

module.exports.getTeachingRequirementByID = (staff_id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('Error Message Here', err);
                resolve(err);
            } else {
                //please use only ? when declaring values to be inserted to prevent sql injection
                connection.query(`SELECT * FROM personal_teaching_req WHERE fk_staff_id = ?;`, [staff_id] ,(err, results) => { 
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
            }
        });
    }); 
};
module.exports.createTeachingRequirement = (data) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('Error Message Here', err);
                resolve(err);
            } else {
                //please use only ? when declaring values to be inserted to prevent sql injection
                connection.query(`INSERT INTO personal_teaching_req (fk_staff_id,ptr_day,ptr_time,ptr_duration,ptr_reason,ptr_remarks,fk_semester_code)
                 VALUES (?,?,?,?,?,?,?);`, data ,(err, results) => { 
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
            }
        });
    }); 
};
module.exports.updateTeachingRequirement = (data) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('Error Message Here', err);
                resolve(err);
            } else {
                //please use only ? when declaring values to be inserted to prevent sql injection
                connection.query(`UPDATE personal_teaching_req 
                 SET ptr_day = ?, ptr_time = ?, ptr_duration = ?, ptr_reason = ?, ptr_remarks = ?
                 WHERE CONCAT(prefix,ptr_id) = ?;`, data ,(err, results) => { 
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
            }
        });
    }); 
};
module.exports.deleteTeachingRequirement = (ptr_id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('Error Message Here', err);
                resolve(err);
            } else {
                //please use only ? when declaring values to be inserted to prevent sql injection
                connection.query(`DELETE FROM personal_teaching_req WHERE CONCAT(prefix,ptr_id) = ?;`, [ptr_id] ,(err, results) => { 
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
            }
        });
    }); 
};

// MODULE PREFERENCE
module.exports.getAllModules = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('Error Message Here', err);
                resolve(err);
            } else {
                //please use only ? when declaring values to be inserted to prevent sql injection
                connection.query(`SELECT * FROM module;`, [] ,(err, results) => { 
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
            }
        });
    }); 
};
module.exports.getAllModulePreference = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('Error Message Here', err);
                resolve(err);
            } else {
                //please use only ? when declaring values to be inserted to prevent sql injection
                connection.query(`SELECT * FROM module_preference;`, [] ,(err, results) => { 
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
            }
        });
    }); 
};
module.exports.getModulePreferenceByID = (staff_id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('Error Message Here', err);
                resolve(err);
            } else {
                //please use only ? when declaring values to be inserted to prevent sql injection
                connection.query(`SELECT * FROM module_preference WHERE fk_staff_id = ?;`, [staff_id] ,(err, results) => { 
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
            }
        });
    }); 
};
module.exports.submitModulePreference = (data) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('Error Message Here', err);
                resolve(err);
            } else {
                //please use only ? when declaring values to be inserted to prevent sql injection
                connection.query(`INSERT INTO module_preference (fk_staff_id,fk_semester_code,preference) VALUES (?,?,?);`, data ,(err, results) => { 
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
            }
        });
    }); 
};
module.exports.updateModulePreferenceByID = (data) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('Error Message Here', err);
                resolve(err);
            } else {
                //please use only ? when declaring values to be inserted to prevent sql injection
                connection.query(`UPDATE module_preference SET preference = ? WHERE fk_staff_id = ?;`, data ,(err, results) => { 
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
            }
        });
    }); 
};