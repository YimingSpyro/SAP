var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
const config = require('../config/config');

function genAccessToken(rows) {
    var row = rows[0];
    //console.log(row.roles);
    //console.log(config.JWTExpire);
    var items = {
        staff_name: row.staff_name,
        staff_id: row.staff_id,
        staff_roles: row.roles
    }
    const tokenPayload = items;
    const accessToken = jwt.sign(tokenPayload, config.JWTKey, {
        expiresIn: config.JWTExpire
    });

    //insert record into jwt records table
    insertJwtRecord(row, accessToken);
    //console.log(accessToken)
    return accessToken;
}
function insertJwtRecord(row, token) {
    authManager.insertJwtRecord([row.staff_id, token])
}
const saltRounds = 10;
const authManager = require('../services/authService');
const pool = require('../config/database');

module.exports.processLogin = ((req, res) => {
    console.log("login called")
    let staff_id = req.body.staff_id;
    let password = req.body.password;
    //console.log("staff_id is " + staff_id);
    //console.log(password);
    var data = authManager.login([staff_id, password])
        .then((rows) => {
            if (rows == 'Error Message') {
                res.status(500).json({
                    error: "Invalid Login"
                });
            } else {
                var hash = rows[0].staff_password;
                bcrypt.compare(password, hash, (err, resp) => {
                    if (resp) {
                        const accessToken = genAccessToken(rows,);
                        // const result = JSON.parse(JSON.stringify(rows[0]));
                        const result = rows;
                        result['token'] = accessToken
                        res.cookie("token", result.token, {
                            httpOnly: true
                        });
                        res.status(200).json({
                            data: result
                        });

                    } else {
                        //console.log("BCRYPT error");
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    }
                });

            }
        }).catch((error) => {
            console.log(error)
            res.status(500).json({
                error: error
            });
        })
})
module.exports.getStaffPrivileges = ((req, res) => {
    console.log("staffpriivledgs api");
    let staff_id = req.params.id;
    var data = authManager.getStaffPrivileges(staff_id)
        .then((rows) => {
            res.status(200).json({
                data: rows
            });
        }).catch((error) => {
            console.log(error)
            res.status(500).json({
                error: error
            });
        })
})
module.exports.processRegister = ((req, res) => {
    let staff_id = req.body.staff_id;
    let password = req.body.password;

    /*    res.status(200).json({
           data:formData
       }); */
    var data = authManager.register([staff_id, password])
        .then((value) => {
            res.status(200).json({
                data: value
            });
        }, (err) => {
            res.status(500);
            console.log(err).json({
                error: 'Unkown Error'
            })
        })
})
module.exports.processChangePassword = (async (req, res) => {
    var staff_id = req.staff_id;
    //console.log(staff_id);
    var old_password = req.body.old_password;
    //console.log(old_password);
    var new_password = req.body.new_password;
    var re_new_password = req.body.re_new_password;
    if (new_password != re_new_password) return res.status(500).json({ message: 'New Passwords do not match' });
    try {
        await authManager.login([staff_id, old_password])
            .then((rows) => {
                try {
                    var old_password_hashed = rows[0].staff_password;
                    bcrypt.compare(old_password, old_password_hashed, (err, resp) => {
                        if (resp) {
                            bcrypt.compare(new_password, old_password_hashed, (err, resp) => {
                                if (resp) {
                                    return res.status(500).json({
                                        message: "New password cannot be the same as old password!"
                                    });
                                }
                            });
                            bcrypt.hash(new_password, saltRounds, function (err, hash) {
                                if (err) {
                                    throw err
                                }
                                var new_password_hashed = hash;
                                authManager.changePassword([staff_id, new_password_hashed]).then((rows) => {
                                    if (rows.affectedRows == 1) {
                                        return res.status(200).json({
                                            message: "Succesfully updated password"
                                        });
                                    }
                                }), ((error) => {
                                    return res.status(500).json({
                                        message: error
                                    });
                                })
                            });


                        } else {
                            return res.status(500).json({
                                message: "Error: Incorrect Password"
                            });
                        }
                    });
                } catch (error) {
                    let message = 'Server is unable to process your request. Error: ' + error;
                    console.error('Server is unable to process the request', { 'Error': error })
                    return res.status(500).json({
                        message: message
                    });
                }


            })
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        console.error('Server is unable to process the request', { 'Error': error })
        return res.status(500).json({
            message: message
        });
    }

})
module.exports.getNavItems = (async (req, res) => {
    try {
        let results = await authManager.getNavItems();
        console.log('Get All Nav Items');
        if (results) {
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request.';
        console.error('Server is unable to process the request', { 'Error': error })
        return res.status(500).json({
            message: message
        });
    }
})
module.exports.getDashboardItems = (async (req, res) => {
    try {
        let results = await authManager.getDashboardItems();
        console.log('Get All Dashboard Items');
        if (results) {
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request.';
        console.error('Server is unable to process the request', { 'Error': error })
        return res.status(500).json({
            message: message
        });
    }
})
/* module.exports.getStaffByStaffId = ()=>{
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                resolve(err);
            }else{
                connection.query('SELECT * FROM staff_information',(err,rows)=>{
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
} */