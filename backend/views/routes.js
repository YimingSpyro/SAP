// Import controlers
const staffController = require('../controllers/staffController');
const checkUserFn = require('../middlewares/checkUser');

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
        router.get('/api/user/:recordId', checkUserFn.getClientUserId,checkUserFn.checkAdmin, userController.processGetOneUserData); */
        router.get('/test', staffController.processGetAllStaff);

};