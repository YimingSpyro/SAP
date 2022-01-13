const config = require('../config/config');
const pool = require('../config/database')

module.exports.login = ([staff_id, password]) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                connection.query('SELECT t1.*,t3.role_id,t3.role_name,t3.remarks,t4.* FROM staff_information t1 INNER JOIN staff_privileges t2 ON t1.staff_id=t2.fk_staff_id INNER JOIN system_roles t3 on t2.fk_role_id=t3.role_id  INNER JOIN designation t4 ON t4.designation_id=t1.fk_designation_id WHERE t1.staff_id=?', [staff_id], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        if (rows.length == 1) {
                            console.log(rows);
                            resolve(rows)
                        } else {
                            reject("Invalid Login");
                        }
                        /* resolve(rows); */
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
