/* Example
exports.processGetOneUserData = async(req, res, next) => {
    let recordId = req.params.recordId;
    let userId = req.headers.user;
    try {
        let results = await userManager.getOneUserData(recordId);
        console.log('Inspect result variable inside processGetOneUserData code\n');
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
var bcrypt = require('bcryptjs');
const saltRounds = 10;
const staffManager = require('../services/staffService');
const config = require('../config/config');
const pool = require('../config/database');
const e = require('express');


/* ==== SECTION API ==== */
exports.getAllSections = async (req, res, next) => {
    try {
        let results = await staffManager.getAllSections();
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            console.log('Get All Sections');
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};


/* ==== STAFF TYPES API ==== */
exports.getStaffTypes = async (req, res, next) => {
    try {
        let results = await staffManager.getStaffTypes();
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            console.log('Get All Sections');
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};
exports.createStaffType = async (req, res, next) => {
    let staff_type = req.body.staff_type;
    let staff_description = req.body.staff_description;
    let hours = req.body.hours;
    let remarks = req.body.remarks;
    let data = [staff_type, staff_description, hours, remarks]
    try {
        let results = await staffManager.createStaffType(data);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            console.log('Create Staff Type');
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};
exports.deleteStaffType = async (req, res, next) => {
    let staff_type = req.query.staff_type;
    try {
        let results = await staffManager.deleteStaffType(staff_type);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            console.log('Delete Staff Type');
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
exports.updateStaffType = async (req, res, next) => {
    let staff_type = req.body.staff_type;
    let staff_description = req.body.staff_description;
    let hours = req.body.hours;
    let remarks = req.body.remarks;
    let data = [staff_type, staff_description, hours, remarks, staff_type]
    try {
        let results = await staffManager.updateStaffType(data);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0) {
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



/* ==== DESIGNATION API ==== */


exports.getAllDesignations = async (req, res, next) => {
    try {
        let results = await staffManager.getAllDesignations();
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
exports.createDesignation = async (req, res, next) => {
    let designation_name = req.body.designation_name;
    let course_id = req.body.course_id;
    let section_name = req.body.section_name;
    let data = [designation_name, course_id, section_name]
    try {
        let results = await staffManager.createDesignation(data);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            console.log('Create Designation');
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};
exports.deleteDesignation = async (req, res, next) => {
    let designation_id = req.query.designation_id;
    try {
        let results = await staffManager.deleteDesignation(designation_id);
        console.log('Delete Teaching Requirement by ID');
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
exports.updateDesignation = async (req, res, next) => {
    let designation_name = req.body.designation_name;
    let course_id = req.body.course_id;
    let section_name = req.body.section_name;
    let designation_id = req.body.designation_id;
    let data = [designation_name, course_id, section_name, designation_id]
    try {
        let results = await staffManager.updateDesignation(data);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0) {
            throw 'Could Not Update to Database'
        }
        else {
            console.log('Update Designation');
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};


/* ==== PERSONAL INFORMATION API ==== */

// API GET All Staff Data
exports.getAllStaff = async (req, res, next) => {
    try {
        let results = await staffManager.getAllStaff();
        console.log('Get Staff Personal Information');
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
//API GET Only Some Columns
exports.getStaffNames = async (req, res, next) => {
    try {
        let results = await staffManager.getStaffNames();
        console.log('Get Staff Names');
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            console.log('Getting Staff Names Successful');
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

//API GET Only Some Columns
exports.getAllStaffNames = async (req, res, next) => {
    try {
        let results = await staffManager.getAllStaffNames();
        console.log('Get All Staff Names');
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            console.log('Getting All Staff Names Successful');
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
// API GET Staff Data by ID
exports.getStaffByID = async (req, res, next) => {
    let staff_id = req.params.id
    try {
        let results = await staffManager.getStaffByStaffId(staff_id);
        console.log('Get Staff Personal Information by ID');
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
//CREATE STAFF
exports.createStaff = async (req, res, next) => {
    //console.log(req.body)
    let data = req.body;
    let staff_id = data["staff_id"];
    let staff_name = data["staff_name"];
    let staff_password = data["staff_password"];
    let staff_abbrv = data["staff_abbrv"];
    let staff_type = data["staff_type"];
    let staff_schedule_id = data["staff_schedule"];
    let staff_designation_id = data["staff_designation"];
    let staff_email = data["staff_email"];
    let staff_number = data["staff_contact"];
    let staff_mobile = data["staff_mobile"];
    let staff_remarks = data["staff_remarks"];
    let staff_status = data["staff_status"];
    let staff_role_id = data["staff_role"];

    bcrypt.hash(staff_password, saltRounds, function (err, hash) {
        if (err) {
            res.status(500).json({
                error: "Unable to create staff"
            });
        } else {
            try {
                staff_password = hash;
                var data = staffManager.createStaff([staff_id, staff_name, staff_abbrv, staff_designation_id, staff_email, staff_number, staff_mobile, staff_remarks, staff_password, staff_type, staff_schedule_id, staff_status], [staff_role_id, staff_id])
                    .then((value) => {
                        res.status(200).json({
                            data: value
                        });
                    }, (err) => {
                        res.status(500).json({
                            error: "Unable to create staff"
                        })
                    }).catch((e) => {
                        res.status(500).json({
                            error: "Unable to create staff"
                        })
                    })
            } catch (e) {
                res.status(500).json({
                    error: "Unable to create staff"
                });

            }
        }

    });

};
// API Personal Information Update Staff Data by ID
exports.updatePersonalInfoByID = async (req, res, next) => {
    let staff_id = req.params.id
    let new_staff_abbrv = req.body.staff_abbrv
    let new_staff_email = req.body.staff_email
    let new_staff_number = req.body.staff_number
    let new_staff_mobile = req.body.staff_mobile
    let new_staff_remarks = req.body.staff_remarks
    let data = [new_staff_abbrv, new_staff_email, new_staff_number, new_staff_mobile, new_staff_remarks, staff_id]
    try {
        let results = await staffManager.updatePersonalInfoByID(data);
        console.log('Update Staff Personal Information by ID');
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0) {
            throw 'Could Not Update to Database'
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
// API Admin Delete Staff Data by ID
exports.deleteStaffByID = async (req, res, next) => {
    //console.log("called");
    let staff_id = req.params.id
    try {
        let results = await staffManager.deleteStaffByStaffId(staff_id);
        console.log('Get Staff Personal Information by ID');
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
// API Admin Update Staff Data by ID
exports.updateStaffByID = async (req, res, next) => {
    let staff_id = req.params.id
    let new_staff_name = req.body.staff_name
    let new_staff_abbrv = req.body.staff_abbrv
    let new_staff_type = req.body.staff_type
    let new_staff_schedule_id = req.body.staff_schedule
    let new_staff_designation_id = req.body.staff_designation
    let new_staff_email = req.body.staff_email
    let new_staff_number = req.body.staff_contact
    let new_staff_mobile = req.body.staff_mobile
    let new_staff_remarks = req.body.staff_remarks
    let new_staff_status = req.body.staff_status
    let new_staff_role_id = req.body.staff_role;
    
    //console.log(data);
    try {
        let results = await staffManager.updateStaffByStaffId([new_staff_name, new_staff_abbrv, new_staff_type, new_staff_schedule_id, new_staff_designation_id, new_staff_email, new_staff_number, new_staff_mobile, new_staff_remarks, new_staff_status],[new_staff_role_id,staff_id]);
        console.log('Update Staff Personal Information by ID');
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0) {
            throw 'Could Not Update to Database'
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
exports.getStaffRoles = async (req, res, next) => {
    let staff_id = req.query.staff_id;
    try {
        let results = await staffManager.getStaffRoles(staff_id);
        console.log('get Staff Roles');
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
exports.createStaffRoles = async (req, res, next) => {
    let role = req.body.role;
    let staff_id = req.body.staff_id;
    let data = [role, staff_id]
    try {
        let results = await staffManager.createStaffRoles(data);
        console.log('Create Staff Roles');
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0) {
            throw 'Could Not Update to Database'
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
exports.deleteStaffRoles = async (req, res, next) => {
    let staff_id = req.body.staff_id;
    try {
        let results = await staffManager.deleteStaffRoles(staff_id);
        console.log('Delete Staff Roles');
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0) {
            throw 'Could Not Update to Database'
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



// API Admin Reset Staff Password by ID
exports.resetStaffPassword = async (req, res, next) => {
    let new_password = req.body.new_password;
    let staff_id = String(req.body.staff_id)
    try {
        bcrypt.hash(new_password, saltRounds,async function (err, hash) {
            if (err) {
                res.status(500).json({
                    error: "Unable to Update staff"
                });
            } else  {
                new_password = hash;
                let data = [new_password,staff_id]
                let results = await staffManager.resetStaffPassword(data)
                if (results.errno) {
                    console.error(results)
                    throw 'Database SQL Error' + results.errno
                }
                else if (results.affectedRows == 0) {
                    throw 'Could Not Update to Database'
                }
                else {
                    console.log('Update Password by Staff ID');
                    return res.status(200).json(results);
                }
            }
        });
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        console.error('Server is unable to process the request', { 'Error': error })
        return res.status(500).json({
            message: message
        });
    }


};


/* ==== PERSONAL TEACHING REQUIREMENT API ==== */


// API GET Teaching Requirement by ID
exports.getTeachingRequirementByID = async (req, res, next) => {
    let staff_id = req.params.id
    let semester_code = req.query.semester_code
    let data = [staff_id, semester_code]
    try {
        let results = await staffManager.getTeachingRequirementByID(data);
        console.log('Get Teaching Requirement by ID');
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
// API Create Teaching Requirement
exports.createTeachingRequirement = async (req, res, next) => {
    let staff_id = req.body.staff_id
    let ptr_day = req.body.ptr_day
    let ptr_time = req.body.ptr_time
    let ptr_duration = req.body.ptr_duration
    let ptr_reason = req.body.ptr_reason
    let semester_code = req.body.semester_code
    let data = [staff_id, ptr_day, ptr_time, ptr_duration, ptr_reason, semester_code]
    try {
        let results = await staffManager.createTeachingRequirement(data);
        console.log('Create Teaching Requirement');
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
// API Update Teaching Requirement by ID
exports.updateTeachingRequirement = async (req, res, next) => {
    let ptr_id = req.query.ptr_id
    let ptr_day = req.body.ptr_day
    let ptr_time = req.body.ptr_time
    let ptr_duration = req.body.ptr_duration
    let ptr_reason = req.body.ptr_reason
    let data = [ptr_day, ptr_time, ptr_duration, ptr_reason, ptr_id]
    try {
        let results = await staffManager.updateTeachingRequirement(data);
        console.log('Update Teacing Requirement by ID');
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0) {
            throw 'Could Not Update to Database'
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
// API Delete Teaching Requirement by ID
exports.deleteTeachingRequirement = async (req, res, next) => {
    let ptr_id = req.params.id;
    try {
        let results = await staffManager.deleteTeachingRequirement(ptr_id);
        console.log('Delete Teaching Requirement by ID');
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
// API GET Teaching Requirement Remarks
exports.getTeachingRequirementRemarks = async (req, res, next) => {
    let staff_id = req.params.id;
    let semester_code = req.query.semester_code;
    let data = [staff_id, semester_code];
    try {
        let results = await staffManager.getTeachingRequirementRemarks(data);
        console.log('Get Teaching Requirement by ID');
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
// API Create Teaching Requirement Remarks
exports.createTeachingRequirementRemarks = async (req, res, next) => {
    let staff_id = req.body.staff_id
    let ptr_remarks = req.body.ptr_remarks
    let semester_code = req.body.semester_code
    let data = [staff_id, ptr_remarks, semester_code]
    try {
        let results = await staffManager.createTeachingRequirementRemarks(data);
        console.log('Create Teaching Requirement');
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
// API Update Teaching Requirement Remarks
exports.updateTeachingRequirementRemarks = async (req, res, next) => {
    let staff_id = req.body.staff_id
    let ptr_remarks = req.body.ptr_remarks
    let semester_code = req.body.semester_code
    let data = [ptr_remarks, semester_code, staff_id]
    try {
        let results = await staffManager.updateTeachingRequirementRemarks(data);
        console.log('Update Teacing Requirement Remarks by ID');
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0) {
            throw 'Could Not Update to Database'
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

/* ==== MODULE PREFERENCE API ==== */


// API Get All Module Preferences
exports.getAllModulePreference = async (req, res, next) => {
    let semester_code = req.query.semester_code;
    try {
        let results = await staffManager.getAllModulePreference(semester_code);
        console.log('Get All Module Preference');
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
// API Get Module Preferences By Staff ID
exports.getModulePreferenceByID = async (req, res, next) => {
    try {
        let staff_id = req.params.id;
        let semester_code = req.query.semester_code;
        let data = [staff_id, semester_code]
        let results = await staffManager.getModulePreferenceByID(data);
        console.log('Get Module Preference By Staff ID');
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
// API Select Module Preference
exports.submitModulePreference = async (req, res, next) => {
    let staff_id = req.body.staff_id;
    let semester_code = req.body.semester_code;
    let preference = req.body.preference;
    let data = [staff_id, semester_code, preference];
    try {
        let results = await staffManager.submitModulePreference(data);
        console.log('Submit Module Preference');
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
// API Select Module Preference
exports.updateModulePreferenceByID = async (req, res, next) => {
    let staff_id = req.body.staff_id;
    let preference = req.body.preference;
    let semester_code = req.body.semester_code;
    let data = [preference, staff_id, semester_code];
    try {
        let results = await staffManager.updateModulePreferenceByID(data);
        console.log('Update Module Preference');
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0) {
            throw 'Could Not Update to Database'
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


/* ==== MODULE ASSIGNMENT API ==== */


// API Get Assigned Modules by module
exports.getAssignedModulesByModule = async (req, res, next) => {
    let mod_code = req.query.mod_code;
    let semester_code = req.query.semester_code;
    let data = [mod_code, semester_code]
    try {
        let results = await staffManager.getAssignedModulesByModule(data);
        console.log('Get Staff Assigned Module');
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
// API Get Assigned Modules by Staff ID
exports.getAssignedModulesByID = async (req, res, next) => {
    let staff_id = req.params.id;
    let semester_code = req.query.semester_code;
    let data = [staff_id, semester_code, semester_code]
    try {
        let results = await staffManager.getAssignedModulesByID(data);
        console.log('Get Staff Assigned Module');
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
// API Update Module by Staff ID
exports.updateAssignedModuleByID = async (req, res, next) => {
    let ma_lecture = req.body.ma_lecture;
    let ma_tutorial = req.body.ma_tutorial;
    let ma_practical = req.body.ma_practical;
    let ma_id = req.body.ma_id;
    let data = [ma_lecture, ma_tutorial, ma_practical, ma_id];
    try {
        let results = await staffManager.updateAssignedModuleByID(data);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0) {
            throw 'Could Not Update to Database'
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
// API Assign Module to Staff
exports.assignModuleByID = async (req, res, next) => {
    let module_code = req.body.module_code;
    let staff_id = req.body.staff_id;
    let ma_lecture = req.body.ma_lecture;
    let ma_tutorial = req.body.ma_tutorial;
    let ma_practical = req.body.ma_practical;
    let semester_code = req.body.semester_code;
    let data = [module_code, staff_id, ma_lecture, ma_tutorial, ma_practical, semester_code];
    try {
        let results = await staffManager.assignModuleByID(data);
        console.log('Assign Module to Staff');
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
// API Delete Module Assignment
exports.unassignModuleByID = async (req, res, next) => {
    let ma_id = req.params.id;
    try {
        let results = await staffManager.unassignModuleByID(ma_id);
        console.log('Delete Module Assignmen by ID');
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


/* ==== TEACHING ASSIGNMENT SYSTEM ==== */

// API Get All Staff for TAS
exports.getAllStaffTAS = async (req, res, next) => {
    let section = req.query.section;
    try {
        let results = await staffManager.getAllStaffTAS(section);
        console.log('Get Staff Assigned Module');
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
// API Update Module By TAS
exports.updateModuleTAS = async (req, res, next) => {
    let mod_coord = req.body.mod_coord;
    let mod_lecture = req.body.mod_lecture;
    let mod_tutorial = req.body.mod_tutorial;
    let mod_practical = req.body.mod_practical;
    let lecture_class = req.body.lecture_class;
    let tutorial_class = req.body.tutorial_class;
    let practical_class = req.body.practical_class;
    let total_students = req.body.total_students;
    let mod_code = req.body.mod_code;
    let semester_code = req.body.semester_code;
    let data = [mod_coord, mod_lecture, mod_tutorial, mod_practical, lecture_class, tutorial_class, practical_class, total_students, mod_code, semester_code];
    try {
        let results = await staffManager.updateModuleTAS(data);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0) {
            throw 'Could Not Update to Database'
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
// API Update Module By CAS - admin support
exports.updateModuleCAS = async (req, res, next) => {
    let normal_students = req.body.normal_students;
    let os_students = req.body.os_students;
    let total_students = req.body.total_students;
    let mod_code = req.body.mod_code;
    let semester_code = req.body.semester_code;
    let data = [normal_students, os_students, total_students, mod_code, semester_code];
    try {
        let results = await staffManager.updateModuleCAS(data);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0) {
            throw 'Could Not Update to Database'
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
// API Get Module Stage
exports.getModuleStage = async (req, res, next) => {
    let semester_code = req.query.semester_code;
    try {
        let results = await staffManager.getModuleStage(semester_code);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            console.log('Get Module Stages');
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
// API Update Module By CAS - admin support
exports.updateNormalStudents = async (req, res, next) => {
    let normal_students = req.body.normal_students;
    let course_id = req.body.course_id
    let semester_code = req.body.semester_code;
    let mod_stage = req.body.mod_stage;
    let data = [normal_students, course_id, semester_code, mod_stage];
    try {
        let results = await staffManager.updateNormalStudents(data);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else if (results.affectedRows == 0) {
            throw 'Could Not Update to Database'
        }
        else {
            console.log('Update Normal Students by Mod Stage and Section');
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