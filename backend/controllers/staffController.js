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
exports.UpdateStaffByID = async(req, res, next) => {
    let staff_id = req.params.id
    let new_staff_name = req.body.staff_name
    let new_staff_abbrv = req.body.staff_abbrv
    let new_staff_email = req.body.staff_email
    let new_staff_number = req.body.staff_number
    let new_staff_mobile = req.body.staff_mobile
    let new_staff_remarks = req.body.staff_remarks
    let data = [new_staff_name,new_staff_abbrv,new_staff_email,new_staff_number,new_staff_mobile,new_staff_remarks,staff_id]
    try {
        let results = await staffManager.UpdateStaffByStaffId(data);
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