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
const staffManager = require('../services/staffService');
const config = require('../config/config');
const pool = require('../config/database')

/* ==== PERSONAL INFORMATION API ==== */

// API GET All Staff Data
exports.getAllStaff = async(req, res, next) => {
    try {
        let results = await staffManager.getAllStaff();
        console.log('Get Staff Personal Information', results);
        if (results) {
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request.';
        console.error('Server is unable to process the request', {'Error':error})
        return res.status(500).json({
            message: message
        });
    }

};
// API GET Staff Data by ID
exports.getStaffByID = async(req, res, next) => {
    let staff_id = req.params.id
    try {
        let results = await staffManager.getStaffByStaffId(staff_id);
        console.log('Get Staff Personal Information by ID', results);
        if (results) {
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request.';
        console.error('Server is unable to process the request', {'Error':error})
        return res.status(500).json({
            message: message
        });
    }

};
// API Admin Update Staff Data by ID
exports.updateStaffByID = async(req, res, next) => {
    let staff_id = req.params.id
    let new_staff_name = req.body.staff_name
    let new_staff_abbrv = req.body.staff_abbrv
    let new_staff_email = req.body.staff_email
    let new_staff_number = req.body.staff_number
    let new_staff_mobile = req.body.staff_mobile
    let new_staff_remarks = req.body.staff_remarks
    let data = [new_staff_name,new_staff_abbrv,new_staff_email,new_staff_number,new_staff_mobile,new_staff_remarks,staff_id]
    try {
        let results = await staffManager.updateStaffByStaffId(data);
        console.log('Get Staff Personal Information by ID', results);
        if (results) {
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request.';
        console.error('Server is unable to process the request', {'Error':error})
        return res.status(500).json({
            message: message
        });
    }

};

/* ==== PERSONAL TEACHING REQUIREMENT API ==== */

// API GET Teaching Requirement by ID
exports.getTeachingRequirementByID = async(req, res, next) => {
    let staff_id = req.params.id
    try {
        let results = await staffManager.getTeachingRequirementByID(staff_id);
        console.log('Get Teaching Requirement by ID', results);
        if (results) {
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request.';
        console.error('Server is unable to process the request', {'Error':error})
        return res.status(500).json({
            message: message
        });
    }

};

// API Create Teaching Requirement
exports.createTeachingRequirement = async(req, res, next) => {
    let staff_id = req.body.staff_id
    let ptr_day = req.body.ptr_day
    let ptr_time = req.body.ptr_time
    let ptr_duration = req.body.ptr_duration
    let ptr_reason = req.body.ptr_reason
    let ptr_remarks = req.body.ptr_remarks
    let semester_code = req.body.semester_code
    let data = [staff_id,ptr_day,ptr_time,ptr_duration,ptr_reason,ptr_remarks,semester_code]
    try {
        let results = await staffManager.createTeachingRequirement(data);
        console.log('Get Staff Personal Information by ID', results);
        if (results) {
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request.';
        console.error('Server is unable to process the request', {'Error':error})
        return res.status(500).json({
            message: message
        });
    }

};

// API Update Teaching Requirement by ID
exports.updateTeachingRequirementByID = async(req, res, next) => {
    let staff_id = req.params.id
    let ptr_day = req.body.ptr_day
    let ptr_time = req.body.ptr_time
    let ptr_duration = req.body.ptr_duration
    let ptr_reason = req.body.ptr_reason
    let ptr_remarks = req.body.ptr_remarks
    let data = [ptr_day,ptr_time,ptr_duration,ptr_reason,ptr_remarks,staff_id]
    try {
        let results = await staffManager.updateTeachingRequirementByID(data);
        console.log('Update Teacing Requirement by ID', results);
        if (results) {
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request.';
        console.error('Server is unable to process the request', {'Error':error})
        return res.status(500).json({
            message: message
        });
    }

};

// API Delete Teaching Requirement by ID
exports.deleteTeachingRequirementByID = async(req, res, next) => {
    let staff_id = req.params.id
    try {
        let results = await staffManager.deleteTeachingRequirementByID(staff_id);
        console.log('Get Teaching Requirement by ID', results);
        if (results) {
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request.';
        console.error('Server is unable to process the request', {'Error':error})
        return res.status(500).json({
            message: message
        });
    }

};