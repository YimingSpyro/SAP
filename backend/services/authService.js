const config = require('../config/config');
const pool = require('../config/database')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = 'tassystem';

function genAccessToken(rows) {
    var row = rows[0];
    var items = {
        staff_name :row.staff_name,
        staff_id : row.staff_id
    }
    const tokenPayload = items;
    const accessToken = jwt.sign(tokenPayload, JWT_SECRET_KEY);
    console.log(accessToken)
    return accessToken;
}
const saltRounds = 10;
module.exports.login = ([staff_id, password]) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                connection.query('SELECT * FROM staff_information WHERE staff_id = ?', [staff_id], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        if (rows.length == 1) {
                            var hash = rows[0].staff_password;
                            bcrypt.compare(password, hash, (err, res) => {
                                if (res) {
                                    const accessToken = genAccessToken(rows);
                                    const result = JSON.parse(JSON.stringify(rows[0]));
                                    result['token'] = accessToken
                                    console.log(result);
                                   
                                    resolve(result);
                                } else {
                                    console.log(err);
                                    reject(err);
                                }
                            });
                        } else {
                            reject("Invalid Login");
                        }
                        /* resolve(rows); */
                    }
                })
                connection.release();
            }
        })
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
    })
}
