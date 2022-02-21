const moduleService = require('../services/moduleService')

module.exports.getEveryModule = async (req, res) => {
    try {
        let results = await moduleService.getEveryModule();
        console.log('Fetching All Modules');
        return res.status(200).json(results);
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Invalid Input" });
    }
};
/* ==== MODULES API ==== */

// API Get Modules by mod code
exports.getModuleBySection = async (req, res, next) => {
    let section = req.query.section;
    let semester_code = req.query.semester_code;
    let data = [section, semester_code]
    try {
        let results = await moduleService.getModuleBySection(data);
        console.log('Get Module by ID');
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            console.log('Update Assign Module by Staff ID');
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
exports.getModuleBySectionAndStage = async (req, res, next) => {
    let section = req.query.section;
    let semester_code = req.query.semester_code;
    let mod_stage = req.query.mod_stage;
    let data = [section, semester_code, mod_stage]
    try {
        let results = await moduleService.getModuleBySectionAndStage(data);
        console.log('Get Module by ID');
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            console.log('Update Assign Module by Staff ID');
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
exports.getModuleByCode = async (req, res, next) => {
    let mod_code = req.query.section;
    let semester_code = req.query.semester_code;
    let data = [mod_code, semester_code]
    try {
        let results = await moduleService.getModuleByCode(data);
        console.log('Get Module by ID');
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            console.log('Update Assign Module by Staff ID');
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
// API Get Modules by Semester and Coordinator
exports.getModuleByModCoord = async (req, res, next) => {
    //let semester_code = req.query.semester_code;
    let fk_mod_coord = req.query.mod_coord;
    try {
        let results = await moduleService.getModuleByModCoord([fk_mod_coord]);
        //console.log('Get All Modules', results);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            console.log('Get Module by Mod Coord');
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

// API Get Modules for Dashboard
exports.getMCDashboardModules = async (req, res, next) => {
    //let semester_code = req.query.semester_code;
    let fk_mod_coord = req.query.mod_coord;
    try {
        let results = await moduleService.getMCDashboardModules([fk_mod_coord]);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            console.log('Get Dashboard Modules');
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
// API Get All Modules
exports.getAllModules = async (req, res, next) => {
    let semester_code = req.query.semester_code;
    let course_id = req.query.course;
    //console.log(semester_code)
    //console.log(course_id)
    try {
        let results = await moduleService.getAllModules(semester_code, course_id);
        //console.log('Get All Modules', results);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            //console.log('Get All Modules', results);
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

// API Get All Modules
exports.getAllSemesterModules = async (req, res, next) => {
    let semester_code = req.query.semester_code;
    try {
        let results = await moduleService.getAllSemesterModules(semester_code);
        //console.log('Get All Modules', results);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            //console.log('Get All Modules', results);
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
// API Create Modules NOT IN USE
exports.createModule = async (req, res, next) => {
    let mod_code = req.body.mod_code;
    let mod_name = req.body.mod_name;
    let mod_abbrv = req.body.mod_abbrv;
    let mass_lect = req.body.mass_lect;
    let fk_mod_coord = req.body.fk_mod_coord;
    let mod_dlt = req.body.mod_dlt;
    let mod_lecture = req.body.mod_lecture;
    let mod_tutorial = req.body.mod_tutorial;
    let mod_practical = req.body.mod_practical;
    let fk_cluster_ldr = req.body.fk_cluster_ldr;
    let fk_semester_code = req.body.fk_semester_code;
    let odd_lechr = req.body.odd_lechr;
    let even_lechr = req.body.even_lechr;
    let odd_prachr = req.body.odd_prachr;
    let even_prachr = req.body.even_prachr;
    let odd_tuthr = req.body.odd_tuthr;
    let even_tuthr = req.body.even_tuthr;
    let fk_course_id = req.body.fk_course_id;
    let data = [mod_code, mod_name, mod_abbrv, mass_lect, fk_mod_coord, mod_dlt, mod_lecture, mod_tutorial, mod_practical, fk_cluster_ldr, fk_semester_code,
        odd_lechr, even_lechr, odd_prachr, even_prachr, odd_tuthr, even_tuthr, fk_course_id]
    try {
        let results = await moduleService.createModule(data);
        console.log('Create Module');
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            console.log('Updated Module');
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
// API Update Modules for ADMINS (important)
exports.updateModule = async (req, res, next) => {
    //data to be updated
    let mod_code = req.body.data.mod_code;
    let mod_name = req.body.data.mod_name;
    let mod_abbrv = req.body.data.mod_abbrv;
    let mod_stage = req.body.data.mod_stage;
    let fk_mod_coord = req.body.data.fk_mod_coord;
    let fk_semester_code = req.body.data.fk_semester_code;
    let fk_course_id = req.body.data.fk_course_id;
    let mod_dlt = req.body.data.mod_dlt;
    let mod_lecture = req.body.data.mod_lecture;
    let mod_tutorial = req.body.data.mod_tutorial;
    let mod_practical = req.body.data.mod_practical;
    let total_hours = req.body.data.total_hours;
    let lecture_class = req.body.data.lecture_class;
    let tutorial_class = req.body.data.tutorial_class;
    let practical_class = req.body.data.practical_class;
    let prereq = req.body.data.prereq;
    let remarks = req.body.data.remarks;
    let credit_unit = req.body.data.credit_unit;
    let normal_students = req.body.data.normal_students;
    let os_students = req.body.data.os_students;
    let total_students = req.body.data.total_students;
    let type = req.body.data.type;
    let mod_type = req.body.data.mod_type;
    //old data to be referenced in update query
    let year_offered = req.body.data.year_offered;
    let current_sem = req.body.data.current_sem;
    let current_stage = req.body.data.current_stage;
    let old_mod_code = req.body.data.old_mod_code;
    //arrange the data for sql query
    let data = [mod_code, mod_name, mod_abbrv, mod_stage,
        fk_mod_coord, fk_semester_code, fk_course_id,
        mod_dlt, mod_lecture, mod_tutorial, mod_practical, total_hours,
        lecture_class, tutorial_class, practical_class,
        type, mod_type, prereq, remarks, credit_unit,
        normal_students, os_students, total_students,
        current_sem, old_mod_code, year_offered, current_stage
    ]
    try {
        let results = await moduleService.updateModule(data);
        console.log('Updating Moduling Info');
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            console.log('Updated Module Successfully');
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

// API Update Modules for MC (important)
exports.updateMCModule = async (req, res, next) => {
    //data to be updated
    let mass_lect = req.body.data.mass_lect;
    let odd_lechr = req.body.data.odd_lechr;
    let even_lechr = req.body.data.even_lechr;
    let odd_prachr = req.body.data.odd_prachr;
    let even_prachr = req.body.data.even_prachr;
    let odd_tuthr = req.body.data.odd_tuthr;
    let even_tuthr = req.body.data.even_tuthr;
    //old data to be referenced in update query
    let year_offered = req.body.data.year_offered;
    let current_sem = req.body.data.current_sem;
    let current_stage = req.body.data.current_stage;
    let old_mod_code = req.body.data.old_mod_code;
    //arrange the data for sql query
    let data = [odd_lechr, even_lechr, odd_prachr, even_prachr, odd_tuthr, even_tuthr, mass_lect,
        current_sem, old_mod_code, year_offered, current_stage
    ]
    try {
        let results = await moduleService.updateMCModule(data);
        console.log('Updating MC Module Info');
        if (results.errno) {
            throw 'Database Timeout Error'
        }
        else {
            console.log('Updated Module Successfully');
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
