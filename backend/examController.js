const exam = require('../services/exam');

module.exports.processGetAllExam = ((req,res)=>{
    var data = exam.getAllExam()
    .then((value)=>{
        res.status(200).json({
            data:value
        });
    },(err)=>{
        res.status(500);
        console.log(err).json({
            error:'Unknown Error'
        })
    })
})
module.exports.processGetExamByExamId = ((req,res)=>{
    var data = exam.getExamByExamId(req.params.id)
    .then((value)=>{
        res.status(200).json({
            data:value
        });
    },(err)=>{
        res.status(500);
        console.log(err).json({
            error:'Unknown Error'
        })
    })
})
module.exports.createExam = ((req,res)=>{
    var data = exam.createExam(req.body)
    .then((value)=>{
        res.status(200).json({
            data:value
        });
    },(err)=>{
        res.status(500);
        console.log(err).json({
            error:'Unknown Error'
        });
    })
})