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
        console.log('Create Teaching Requirement', results);
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
exports.updateTeachingRequirement = async(req, res, next) => {
    let ptr_id = req.query.ptr_id
    let ptr_day = req.body.ptr_day
    let ptr_time = req.body.ptr_time
    let ptr_duration = req.body.ptr_duration
    let ptr_reason = req.body.ptr_reason
    let ptr_remarks = req.body.ptr_remarks
    let data = [ptr_day,ptr_time,ptr_duration,ptr_reason,ptr_remarks,ptr_id]
    try {
        let results = await staffManager.updateTeachingRequirement(data);
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
exports.deleteTeachingRequirement = async(req, res, next) => {
    let ptr_id = req.params.id;
    try {
        let results = await staffManager.deleteTeachingRequirement(ptr_id);
        console.log('Delete Teaching Requirement by ID', results);
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


/* ==== MODULES API ==== */


// API Get All Modules
exports.getAllModules = async(req, res, next) => {
    try {
        let results = await staffManager.getAllModules();
        console.log('Get All Modules', results);
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
// API Create Modules
exports.createModule = async(req, res, next) => {
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
    let data = [mod_code,mod_name,mod_abbrv,mass_lect,fk_mod_coord,mod_dlt,mod_lecture,mod_tutorial,mod_practical,fk_cluster_ldr,fk_semester_code,
        odd_lechr,even_lechr,odd_prachr, even_prachr,odd_tuthr,even_tuthr]
    try {
        let results = await staffManager.createModule(data);
        console.log('Create Module', results);
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


/* ==== MODULE PREFERENCE API ==== */


// API Get All Module Preferences
exports.getAllModulePreference = async(req, res, next) => {
    try {
        let results = await staffManager.getAllModulePreference();
        console.log('Get All Module Preference', results);
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
// API Get Module Preferences By Staff ID
exports.getModulePreferenceByID = async(req, res, next) => {
    try {
        let staff_id = req.params.id;
        let results = await staffManager.getModulePreferenceByID(staff_id);
        console.log('Get Module Preference By Staff ID', results);
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
// API Select Module Preference
exports.submitModulePreference = async(req, res, next) => {
    let staff_id = req.body.staff_id;
    let semester_code = req.body.semester_code;
    let preference = req.body.preference;
    let data = [staff_id, semester_code, preference];
    try {
        let results = await staffManager.submitModulePreference(data);
        console.log('Submit Module Preference', results);
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

// API Select Module Preference
exports.updateModulePreferenceByID = async(req, res, next) => {
    let staff_id = req.params.id;
    let preference = req.body.preference;
    let data = [preference, staff_id];
    try {
        let results = await staffManager.updateModulePreferenceByID(data);
        console.log('Update Module Preference', results);
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


/* ==== MODULE ASSIGNMENT API ==== */


// API Get Assigned Modules by Staff ID
exports.getAssignedModulesByID = async(req, res, next) => {
    let staff_id = req.params.id;
    try {
        let results = await staffManager.getAssignedModulesByID(staff_id);
        console.log('Get Staff Assigned Module', results);
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

// API Assign Module to Staff
exports.assignModuleByID = async(req, res, next) => {
    let module_code = req.body.module_code;
    let staff_id = req.body.staff_id;
    let ma_lecture = req.body.ma_lecture;
    let ma_tutorial = req.body.ma_tutorial;
    let ma_practical = req.body.ma_practical;
    let semester_code = req.body.semester_code;
    let data = [module_code, staff_id, ma_lecture, ma_tutorial, ma_practical, semester_code];
    try {
        let results = await staffManager.assignModuleByID(data);
        console.log('Assign Module to Staff', results);
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

// API Delete Module Assignment
exports.unassignModuleByID = async(req, res, next) => {
    let ma_id = req.params.id;
    try {
        let results = await staffManager.unassignModuleByID(ma_id);
        console.log('Delete Module Assignmen by ID', results);
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

