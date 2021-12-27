var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = 'tassystem';

function genAccessToken(rows) {
    var row = rows[0];
    var items = {
        staff_name: row.staff_name,
        staff_id: row.staff_id
    }
    const tokenPayload = items;
    const accessToken = jwt.sign(tokenPayload, JWT_SECRET_KEY);

    //insert record into jwt records table
    insertJwtRecord(row,accessToken);
    console.log(accessToken)
    return accessToken;
}
function insertJwtRecord(row,token){
    authManager.insertJwtRecord([row.staff_id,token])
}
const saltRounds = 10;
const authManager = require('../services/authService');
const config = require('../config/config');
const pool = require('../config/database')

module.exports.processLogin = ((req, res) => {
    console.log("login called")
    let staff_id = req.body.staff_id;
    let password = req.body.password;
    console.log("staff_id is " + staff_id);
    console.log(password);
    var data = authManager.login([staff_id, password])
        .then((rows) => {
            var hash = rows[0].staff_password;
            bcrypt.compare(password, hash, (err, resp) => {
                if (resp) {
                    const accessToken = genAccessToken(rows,);
                    const result = JSON.parse(JSON.stringify(rows[0]));
                    result['token'] = accessToken
                    var userData = result; 
                    res.cookie("token",result.token, {
                        httpOnly: true
                    });

                    res.status(200).json({
                        data: result
                    });

                } else {
                    res.status(500).json({
                        error: err
                    });
                }
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
module.exports.processTestCookie = ((req, res) => {
    res.cookie("username", "pls work damn it", {
        httpOnly: true
    });
    res.send(req.cookies)
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