/* Example
exports.processGetOneUserData = async(req, res, next) => {
    let recordId = req.params.recordId;
    let userId = req.headers.user;
    try {
        let results = await userManager.getOneUserData(recordId);
        console.log('Inspect result variable inside processGetOneUserData code\n', results);
        if (results) {
            var jsonResult = {
                'userdata': results[0],
            }
            user.log("Success",{"getOneUserData":results, "userId":userId})
            return res.status(200).json(jsonResult);
        }
    } catch (error) {
        let message = 'Server is unable to process your request.';
        user.error('Server is unable to process the request', {'Error':error})
        return res.status(500).json({
            message: message
        });
    }

}; //End of processGetOneUserData */
const authManager = require('../services/authService');
const config = require('../config/config');
const pool = require('../config/database')

module.exports.processLogin= ((req,res)=>{
    let staff_id = req.body.staff_id;
    let password = req.body.password;
    console.log("staff_id is "+staff_id);
    console.log(password);
    var data = authManager.login([staff_id,password])
    .then((value)=>{
        console.log(value);
        var userData = value[0];
        let sendData = {
            staff_id :userData.staff_id,
            staff_name:userData.staff_name,
        }
        res.status(200).json({
            data:sendData
        });
    }).catch((error) => {
        console.log(error)
        res.status(500).json({
            error:error
        });
    })
})
module.exports.processRegister= ((req,res)=>{
    let staff_id = req.body.staff_id;
    let password = req.body.password;
  
 /*    res.status(200).json({
        data:formData
    }); */
    var data = authManager.register([staff_id,password])
    .then((value)=>{
        res.status(200).json({
            data:value
        });
    },(err)=>{
        res.status(500);
        console.log(err).json({
            error:'Unkown Error'
        })
    })
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