const examManager = require('../services/examService');
const config = require('../config/config');
const pool = require('../config/database')

exports.getExamByModule = async(req, res, next) => {
    let semester_code = req.query.semester_code;
    let mod_code = req.query.mod_code;
    let course_id = req.query.course_id;
    let data = [mod_code,semester_code,course_id]
    try {
        let results = await examManager.getExamByModule(data);
        console.log('Get Exam by Module');
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

};

exports.createExam = async(req, res, next) => {
    let moderator = req.body.moderator;
    let mdeo_marker = req.body.mdeo_marker;
    let co_marker = req.body.co_marker;
    let verifier = req.body.verifier;
    let verifier_details = req.body.verifier_details;
    let markers_moderator = req.body.markers_moderator;
    let module_mcl = req.body.module_mcl;
    let chief_examiner = req.body.chief_examiner;
    let co_examiner = req.body.co_examiner;
    let shared_paper = req.body.shared_paper;
    let shared_question = req.body.shared_question;
    let type_of_module = req.body.type_of_module;
    let external = req.body.external;
    let module_code = req.body.module_code;
    let semester_code = req.body.semester_code;
    let course_id = req.body.course_id;
    let data = [course_id, module_code, semester_code,moderator,mdeo_marker,co_marker,verifier,verifier_details,markers_moderator,module_mcl,chief_examiner,
        co_examiner,shared_paper,shared_question,type_of_module,external]
    data.forEach((element,index) => {
        if (element === "") {
            data[index] = null;
        }
    });
    console.log(data);
    try {
        let results = await examManager.createExam(data);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0) {
            throw 'Could Not Update to Database'
        }
        else {
            console.log('Create Exam');
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        console.error('Server is unable to process the request', { 'Error': error })
        return res.status(500).json({
            message: message
        });
    }

};

exports.updateExam = async(req, res, next) => {
    let moderator = req.body.moderator;
    let mdeo_marker = req.body.mdeo_marker;
    let co_marker = req.body.co_marker;
    let verifier = req.body.verifier;
    let verifier_details = req.body.verifier_details;
    let markers_moderator = req.body.markers_moderator;
    let module_mcl = req.body.module_mcl;
    let chief_examiner = req.body.chief_examiner;
    let co_examiner = req.body.co_examiner;
    let shared_paper = req.body.shared_paper;
    let shared_question = req.body.shared_question;
    let type_of_module = req.body.type_of_module;
    let external = req.body.external;
    let module_code = req.body.module_code;
    let semester_code = req.body.semester_code;
    let course_id = req.body.course_id;
    let data = [moderator,mdeo_marker,co_marker,verifier,verifier_details,markers_moderator,module_mcl,chief_examiner,
        co_examiner,shared_paper,shared_question,type_of_module,external,module_code,semester_code,course_id]
    data.forEach((element,index) => {
        if (element === "") {
            data[index] = null;
        }
    });
    try {
        let results = await examManager.updateExam(data);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0) {
            throw 'Could Not Update to Database'
        }
        else {
            console.log('Update Exam');
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        console.error('Server is unable to process the request', { 'Error': error })
        return res.status(500).json({
            message: message
        });
    }

};