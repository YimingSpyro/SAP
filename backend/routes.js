// Import controlers
const authController = require("./controllers/authController");
const staffController = require("./controllers/staffController");
const uploadsController = require("./controllers/uploadsController");
const checkUserFn = require("./middlewares/checkUserFn");

//DECLARE MULTER PACKAGE--------------------------------
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/profile_picture');
    },
    filename: function (req, file, cb) {
        cb(null, `${req.body.name}_${new Date().valueOf()}_${file.originalname}` );
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

//Declare upload using multer package
//This method is to upload profile pictures with the multer package
//it also checks for the correct filetype and limits to 3MB
const uploadPFP = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3
    },
    fileFilter: fileFilter
});


//END OF DECLARING MULTER PACKAGE--------------------------------

// Match URL's with controllers
exports.appRoute = router => {
    /* 
        router.post('/api/user/login', authController.processLogin);
        router.post('/api/user/register', validName.validateName,emailValidationFn.validateEmail,validationFn.validatePassword,authController.processRegister);
        router.post('/api/user/process-submission', checkUserFn.getClientUserId, userController.processDesignSubmission);
        router.put('/api/user/',checkUserFn.getClientUserId,checkUserFn.checkAdmin, userController.processUpdateOneUser);
        router.put('/api/user/design/',checkUserFn.getClientUserId, userController.processUpdateOneDesign);
     
        router.get('/api/user/process-search-design/:pagenumber/:search?', checkUserFn.getClientUserId, userController.processGetSubmissionData);
        router.get('/api/user/process-search-user/:pagenumber/:search?', checkUserFn.getClientUserId,checkUserFn.checkAdmin, userController.processGetUserData);

        router.get('/api/user/:recordId', checkUserFn.getClientUserId,checkUserFn.checkAdmin, userController.processGetOneUserData); 
        router.get('/test', staffController.processGetAllStaff);*/

    // LOGIN
    router.post('/login', authController.processLogin);
    router.post('/register', authController.processRegister);
    //router.get('/checkauthentication',authController.processTestCookie);

    // PERSONAL INFORMATION
    router.get('/api/staff/', staffController.getAllStaff);
    router.get('/api/staff/:id', staffController.getStaffByID);
    router.put('/api/staff/:id', staffController.updateStaffByID)

    // PERSONAL TEACHING REQUIREMENT
    router.get('/api/teaching-requirement/:id', staffController.getTeachingRequirementByID);
    router.get('/api/teaching-requirement/remarks/:id', staffController.getTeachingRequirementRemarks);
    router.post('/api/teaching-requirement/', staffController.createTeachingRequirement);
    router.post('/api/teaching-requirement/remarks', staffController.createTeachingRequirementRemarks);
    router.put('/api/teaching-requirement/remarks', staffController.updateTeachingRequirementRemarks);
    router.put('/api/teaching-requirement/', staffController.updateTeachingRequirement);
    router.delete('/api/teaching-requirement/:id', staffController.deleteTeachingRequirement);

    // MODULE
    router.get('/api/module/', staffController.getAllModules);
    router.post('/api/module/', staffController.createModule);

    // MODULE PREFERENCE
    router.get('/api/module/preference', staffController.getAllModulePreference);
    router.get('/api/module/preference/:id', staffController.getModulePreferenceByID);
    router.post('/api/module/preference', staffController.submitModulePreference);
    router.put('/api/module/preference/', staffController.updateModulePreferenceByID);

    // ASSIGNED MODULES
    router.get('/api/module/assign/:id', staffController.getAssignedModulesByID);
    router.post('/api/module/assign/', staffController.assignModuleByID);
    router.delete('/api/module/assign/:id', staffController.unassignModuleByID);

    //PROFILE PICTURE
    router.post('/uploads/profile-picture/:staff_id', uploadPFP.single('profile_picture'), uploadsController.uploadProfilePicture)
    router.get('/uploads/profile-picture/:staff_id', uploadsController.getProfilePicture)

}