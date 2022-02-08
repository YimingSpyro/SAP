const uploadsService = require('../services/uploadsService')
const staffService = require('../services/staffService')
const semesterService = require('../services/semesterService')

module.exports.getAllSemesters = async (req, res) => {
    try {
        let results = await semesterService.getAllSemesters();
        console.log('Fetching Available Semesters');
        return res.status(200).json(results);
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Invalid Input" });
    }
};

/* ==== SEMESTER API ==== */

exports.getAllSemestersByStatus = async (req, res, next) => {
    let status = req.query.status;
    try {
        let results = await semesterService.getAllSemestersByStatus(status);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            console.log('Get All Semester');
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};
exports.createSemester = async (req, res, next) => {
    let semester_id = req.body.semester_id;
    let semester_code = req.body.semester_code;
    let remarks = req.body.remarks;
    let data = [semester_id, semester_code, remarks]
    try {
        let results = await semesterService.createSemester(data);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            console.log('Create Semester');
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};
exports.updateSemester = async (req, res, next) => {
    let semester_id = req.body.semester_id;
    let semester_code = req.body.semester_code;
    let remarks = req.body.remarks
    let old_semester_id = req.body.semester_id_old
    let data = [semester_id, semester_code, remarks, old_semester_id]
    try {
        let results = await semesterService.updateSemester(data);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0){
            throw 'Could Not Update to Database'
        }
        else {
            console.log('Update Semester');
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};
exports.disableSemester = async (req, res, next) => {
    let semester_id = req.body.semester_id;
    let data = [ "INACTIVE", semester_id]
    try {
        let results = await semesterService.disableSemester(data);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0){
            throw 'Could Not Update to Database'
        }
        else {
            console.log('Disable Semester');
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};
exports.enableSemester = async (req, res, next) => {
    let semester_id = req.body.semester_id;
    let data = [ "ACTIVE", semester_id]
    try {
        let results = await semesterService.enableSemester(data);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0){
            throw 'Could Not Update to Database'
        }
        else {
            console.log('Enable Semester');
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};
exports.deleteSemester = async (req, res, next) => {
    let semester_id = req.query.semester_id;
    try {
        let results = await semesterService.deleteSemester(semester_id);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0){
            throw 'Could Not Delete'
        }
        else {
            console.log('Delete Semester');
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};