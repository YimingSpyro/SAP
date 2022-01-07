// Import controlers
const authController = require("./controllers/authController");
const staffController = require("./controllers/staffController");
const checkUserFn = require("./middlewares/checkUserFn");


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
        router.post('/api/teaching-requirement/', staffController.createTeachingRequirement);
        router.post('/api/teaching-requirement/remarks', staffController.createTeachingRequirementRemarks);
        router.put('/api/teaching-requirement/', staffController.updateTeachingRequirement);
        router.delete('/api/teaching-requirement/:id', staffController.deleteTeachingRequirement);

        // MODULE
        router.get('/api/module/', staffController.getAllModules);
        router.post('/api/module/', staffController.createModule);

        // MODULE PREFERENCE
        router.get('/api/module/preference', staffController.getAllModulePreference);
        router.get('/api/module/preference/:id', staffController.getModulePreferenceByID);
        router.post('/api/module/preference', staffController.submitModulePreference);
        router.put('/api/module/preference/:id', staffController.updateModulePreferenceByID);
        
        // ASSIGNED MODULES
        router.get('/api/module/assign/:id', staffController.getAssignedModulesByID);
        router.post('/api/module/assign/', staffController.assignModuleByID);
        router.delete('/api/module/assign/:id', staffController.unassignModuleByID);

        //UPLOADING FILES

};