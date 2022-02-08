const courseService = require('../services/courseService')

module.exports.getAllCourses = async (req, res) => {
    try {
        let results = await courseService.getAllCourses();
        //console.log(('Fetching Available Courses');
        return res.status(200).json(results);
    }
    catch (error) {
        //console.log((error)
        return res.status(400).json({ message: "Invalid Input" });
    }
};

/* ==== COURSE API ==== */
exports.getAllCoursesByStatus = async (req, res, next) => {
    let status = req.query.status;
    try {
        let results = await courseService.getAllCoursesByStatus(status);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            //console.log(('Get All Courses');
            ////console.log((results);
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};
exports.createCourse = async (req, res, next) => {
    let course_id = req.body.course_code;
    let course_name = req.body.course_name;
    let data = [course_id, course_name]
    try {
        let results = await courseService.createCourse(data);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            //console.log(('Create Course', results);
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};
exports.updateCourse = async (req, res, next) => {
    let course_id = req.body.course_code;
    let course_name = req.body.course_name;
    let old_course_id = req.body.course_code_old
    let data = [course_id, course_name, old_course_id]
    try {
        let results = await courseService.updateCourse(data);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0){
            throw 'Could Not Update to Database'
        }
        else {
            //console.log(('Update Course', results);
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};
exports.disableCourse = async (req, res, next) => {
    let course_id = req.body.course_code;
    let data = [ "inactive", course_id]
    try {
        let results = await courseService.disableCourse(data);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0){
            throw 'Could Not Update to Database'
        }
        else {
            //console.log(('Update Course', results);
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};
exports.enableCourse = async (req, res, next) => {
    let course_id = req.body.course_code;
    let data = [ "active", course_id]
    try {
        let results = await courseService.enableCourse(data);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0){
            throw 'Could Not Update to Database'
        }
        else {
            ////console.log(('Update Course', results);
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};
exports.deleteCourse = async (req, res, next) => {
    let course_id = req.query.course_code;
    try {
        let results = await courseService.deleteCourse(course_id);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0){
            throw 'Could Not Delete'
        }
        else {
            ////console.log(('Update Course', results);
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};