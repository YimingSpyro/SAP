const examManager = require('../services/exam');
const config = require('../config/config');
const pool = require('../config/database')

exports.processGetAllExam = async(req, res, next) => {
    try {
        let results = await examManager.getAllStaff();
        console.log('Get All Exams', results);
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

exports.getExamByExamId = async(req, res, next) => {
    let exam_id = req.params.id
    try {
        let results = await examManager.getExamByExamId(exam_id);
        console.log('Get Exam by ID', results);
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
    let mod_code = req.body.mod_code
    let exam_type = req.body.exam_type
    let offered_to = req.body.offered_to
    let examiner_id = req.body.examiner_id
    let moderator_id = req.body.moderator_id
    let external_mod = req.body.external_mod
    let marker_id = req.body.marker_id
    let verifier_id = req.body.verifier_id
    let verifier_details = req.body.verifier_details
    let marks_moderator = req.body.marks_moderator
    let semester_code = req.body.semester_code
    let data = [mod_code, exam_type, offered_to, examiner_id, moderator_id, external_mod, marker_id, verifier_id, verifier_details, marks_moderator, semester_code]
    try {
        let results = await examManager.createExam(data);
        console.log('Create Exam', results);
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