const workloadService = require('../services/workloadService')
const exam_pattern = /.+ST$/
const ca_pattern = /^CA\d/
exports.getWorkloadByMC = async (req, res, next) => {
    let staff_id = req.query.mod_coord
    try {
        let results = await workloadService.getWorkloadByMC(staff_id);
        console.log('Get Workload By MC');
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
exports.getWorkloadByAdmin = async (req, res, next) => {
    let semester_code = req.query.code;
    try {
        let results = await workloadService.getWorkloadByAdmin(semester_code);
        console.log('Get Workload By Admin');
        console.log(results)
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
exports.deleteWorkload = async (req, res, next) => {
    console.log(req.body)
    let staff_id = req.query.mod_coord;
    let mod_code = req.body.mod_code;
    let semester_code = req.body.semester_code;
    let mod_stage = req.body.mod_stage;
    let component_code = req.body.component_code;
    //fk_mod_code=? AND fk_semester_code=? AND mod_stage=? AND component_code=?
    let data = [mod_code,semester_code,mod_stage,component_code]
    try {
        let results = await workloadService.deleteWorkload(data);
        console.log('Delete Workload');
        if (results.errno) {
            console.log(results)
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
exports.createWorkload = async (req, res, next) => {
    let staff_id = req.query.mod_coord;
    let mod_code = req.body.data.mod_code;
    let semester_code = req.body.data.semester_code;
    let mod_stage = req.body.data.mod_stage;
    let component_code = req.body.data.component_code;
    let weightage = req.body.data.weightage;
    let nrc = req.body.data.nrc;
    //CA*
    let group_size = req.body.data.group_size;
    let start_week = req.body.data.start_week;
    let end_week = req.body.data.end_week;
    let remarks = req.body.data.remarks;
    //*ST
    let testwk_type = req.body.data.testwk_type;
    let type = req.body.data.type;
    let duration = req.body.data.duration;
    let special_requirement = req.body.data.special_requirement;
    console.log(req.body.data)
    let data;
    if (ca_pattern.test(component_code)) {
        //fk_mod_code, fk_semester_code, fk_uploaded_by, mod_stage, component_code, nrc, weightage, group_size, start_weeks, end_weeks, remarks
        data = [mod_code, semester_code, staff_id, mod_stage, component_code, nrc, weightage, group_size, start_week, end_week, remarks];
    } else if (exam_pattern.test(component_code)) {
        //fk_mod_code, fk_semester_code, fk_uploaded_by, mod_stage, component_code, nrc, weightage, testwk_type, type, duration, special_requirement
        data = [mod_code, semester_code, staff_id, mod_stage, component_code, nrc, weightage, testwk_type, type, duration, special_requirement];
    };
    try {
        let results = await workloadService.createWorkload(component_code, data);
        console.log('Insert New Workload');
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