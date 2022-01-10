const config = require('../config/config');
const pool = require('../config/database');

module.exports.getAllExam = ()=>{
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                console.log(err);
                resolve(err);
            }else{
                connection.query('SELECT * FROM exam_verifier_sys;',(err,rows)=>{
                    if (err) {
                        reject(err);
                    } else {
                        console.log(rows);
                        return resolve(rows);
                    }
                    connection.release();
                })
            }
        })
    })
}
module.exports.getExamByExamId = examId =>{
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                resolve(err);
            }else{
                connection.query('SELECT * FROM exam_verifier_sys WHERE exam_id='+examId,(err,rows)=>{
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
module.exports.createExam = params =>{
    console.log("params:",params);
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                resolve(err);
            }else{
                try {
                    connection.query(`INSERT INTO exam_verifier_sys(fk_mod_code, exam_type, offered_to, fk_examiner_id, fk_moderator_id, external_mod, fk_marker_id, fk_verifier_id, verifier_details, marks_moderator, fk_semester_code) VALUES ("${params.fk_mod_code}","${params.exam_type}","${params.offered_to}",${params.fk_examiner_id},${params.fk_moderator_id},${params.external_mod},${params.fk_marker_id},${params.fk_verifier_id},${params.verifier_details},${params.marks_moderator},"${params.fk_semester_code}")`,(err,rows)=>{
                        if (err) {
                            return reject(err);
                        } else {
                            return resolve(rows);
                        }
                        connection.release();
                    })
                } catch (error) {
                    console.log(error);
                    return;
                }
            }
        })
    })
}