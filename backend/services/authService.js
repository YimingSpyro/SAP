const config = require('../config/config');
const pool = require('../config/database')
async function appendRoleToObject(rows, rows1) {
    console.log(rows);
    console.log(rows1);
    var roles = [];
    for (let i = 0; i < rows1.length; i++) {
        var row = rows1[i];
        roles.push({
            role_id: row.role_id,
            role_name: row.role_name,
            remarks: row.remarks
        })
    }
    rows[0]["roles"] = roles;
    return rows
}
module.exports.login = ([staff_id, password]) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                connection.query('SELECT t1.*,t4.* FROM staff_information t1  INNER JOIN designation t4 ON t4.designation_id=t1.fk_designation_id WHERE t1.staff_id=?', [staff_id], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        if (rows) {
                            connection.query(`SELECT t1.*,t2.* FROM staff_privileges t1 INNER JOIN system_roles t2 ON t1.fk_role_id = t2.role_id WHERE fk_staff_id = ?;`, staff_id, (err, rows1) => {
                                if (err) {
                                    console.log(err);
                                    reject(err);
                                } else {
                                    if (rows1) {
                                        if (rows1.length <= 0 || rows.length <= 0) reject('Error Message');
                                        else {
                                            const finalRows = appendRoleToObject(rows, rows1)
                                            if (!finalRows) reject('Error Message');
                                            else resolve(finalRows);
                                        }
                                    } else {
                                        console.log("error");
                                         reject("error")
                                    }
                                }
                            })
                        } else {
                            reject('Error Message');
                        }
                    }
                })
                connection.release();
            }
        })
    }).catch((error) => {
        console.error(error);
        return error
    })

}
module.exports.register = ([staff_id, password]) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                bcrypt.hash(password, saltRounds, function (err, hash) {
                    if (err) {
                        return callback(err, null);
                    }

                    password = hash;

                    connection.query('INSERT INTO temp_user_accounts VALUES(?,?);', [staff_id, password], (err, rows) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(rows);
                        }
                        connection.release();
                    });
                });
            }
        })
    }).catch((error) => {
        console.error(error);
        return error
    })

}
module.exports.changePassword = ([staff_id, new_password]) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                connection.query('UPDATE staff_information SET staff_password = ? WHERE staff_id=?', [new_password, staff_id], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        })
    })

}
module.exports.insertJwtRecord = ([staff_id, token]) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                connection.query('INSERT INTO jwt_token_storage (fk_staff_id,jwt_token) VALUES(?,?)', [staff_id, token], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {

                        resolve(rows);
                    }
                    connection.release();
                })
            }
        })
    }).catch((error) => {
        console.error(error);
        return error
    })
}
module.exports.getStaffByStaffId = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                connection.query('SELECT * FROM staff_information', (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {

                        resolve(rows);
                    }
                    connection.release();
                })
            }
        })
    }).catch((error) => {
        console.error(error);
        return error
    })
}
module.exports.getStaffPrivileges = (staff_id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                connection.query('SELECT * FROM staff_privileges WHERE fk_staff_id=?', [staff_id], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {

                        resolve(rows);
                    }
                    connection.release();
                })
            }
        })
    }).catch((error) => {
        console.error(error);
        return error
    })
}
module.exports.getNavItems = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                connection.query('SELECT * FROM nav_items', (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {

                        resolve(rows);
                    }
                    connection.release();
                })
            }
        })
    }).catch((error) => {
        console.error(error);
        return error
    })
}
module.exports.getDashboardItems = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                connection.query('SELECT * FROM dashboard_items', (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {

                        resolve(rows);
                    }
                    connection.release();
                })
            }
        })
    }).catch((error) => {
        console.error(error);
        return error
    })
}
