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
const config = require('../config/config');
const pool = require('../config/database')
module.exports.getAllStaff = ()=>{
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                resolve(err);
            }else{
                connection.query('SELECT * FROM staff_information',(err,rows)=>{
                    if (err) {
                        reject(err);
                    } else {
                        console.log(rows);
                        resolve(rows);
                    }
                    connection.release();
                })
            }
        })
    })
}
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