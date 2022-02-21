// Import controlers
const authController = require("./controllers/authController");
const announcementController = require("./controllers/announcementController");
const staffController = require("./controllers/staffController");
const uploadsController = require("./controllers/uploadsController");
const examController = require("./controllers/examController")
const semesterController = require("./controllers/semesterController")
const courseController = require("./controllers/courseController")
const downloadsController = require("./controllers/downloadsController")
const moduleController = require("./controllers/moduleController")
const workloadController = require("./controllers/workloadController")
const checkUserFn = require("./middlewares/checkUserFn");
const multer = require('multer')
const getFields = multer();

//DECLARE MULTER CONFIGURATIONS--------------------------------
//declare where to store incoming files
//this stores profile pictures
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/profile_picture');
    },
    filename: function (req, file, cb) {
        cb(null, `${req.body.name}_${new Date().valueOf()}_${file.originalname}`);
    }
});
//this stores documents like excels
const reportStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/report_samples');
    },
    filename: function (req, file, cb) {
        cb(null, `${new Date().valueOf()}_${file.originalname}`);
    }
});
const PFPfileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const reportFileFilter = (req, file, cb) => {
    //checks for appropriate file type
    const checkFileVNDMS = /application\/vnd.ms-.*/
    const checkFileMS = /application\/ms.*/
    const checkFileOpenXML = /application\/vnd.openxmlformats-officedocument..*/
    if (checkFileVNDMS.test(file.mimetype) || checkFileOpenXML.test(file.mimetype) || checkFileMS.test(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const fileFilter = (req, file, cb) => {
    if (file) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const updateFilter = (req, file, cb) => {
    let c = uploadsController.checkFile(req)
    if (c) {
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
        fileSize: 1024 * 1024
    },
    fileFilter: PFPfileFilter
});
//This method is to upload excel or csv files
const uploadReport = multer({
    storage: reportStorage,
    fileFilter: reportFileFilter
});

const upload = multer({
    storage: reportStorage,
    fileFilter: fileFilter
});

const updateReport = multer({
    storage: reportStorage,
    fileFilter: updateFilter //check if the file fields are empty to prevent upload
});

//END OF DECLARING MULTER CONFIGURATIONS--------------------------------

// Match URL's with controllers
exports.appRoute = router => {
    /* 
        router.post('/api/user/login', authController.processLogin);
        router.post('/api/user/api/register', validName.validateName,emailValidationFn.validateEmail,validationFn.validatePassword,authController.processRegister);
        router.post('/api/user/process-submission', checkUserFn.getClientUserId, userController.processDesignSubmission);
        router.put('/api/user/',checkUserFn.getClientUserId,checkUserFn.checkAdmin, userController.processUpdateOneUser);
        router.put('/api/user/design/',checkUserFn.getClientUserId, userController.processUpdateOneDesign);

        router.get('/api/user/process-search-design/:pagenumber/:search?', checkUserFn.getClientUserId, userController.processGetSubmissionData);
        router.get('/api/user/process-search-user/:pagenumber/:search?', checkUserFn.getClientUserId,checkUserFn.checkAdmin, userController.processGetUserData);

        router.get('/api/user/:recordId', checkUserFn.getClientUserId,checkUserFn.checkAdmin, userController.processGetOneUserData); 
        router.get('/test', staffController.processGetAllStaff);*/
        
    // AUTHENTICATION
    router.get('/api/staff-privileges/:id', authController.getStaffPrivileges);
    router.post('/api/login/', authController.processLogin);
    router.post('/api/register', authController.processRegister);
    router.post('/api/change-password', checkUserFn.checkJWT, authController.processChangePassword);
    //router.get('/checkauthentication',authController.processTestCookie);

    // SECTION
    router.get('/api/section/', staffController.getAllSections);

    // STAFF TYPES
    router.get('/api/staff/types', staffController.getStaffTypes);
    router.post('/api/staff/types/', staffController.createStaffType);
    router.delete('/api/staff/types/', staffController.deleteStaffType);
    router.put('/api/staff/types/', staffController.updateStaffType);

    // ANNOUNCEMENT
    router.get('/api/announcements/', announcementController.getAllAnnouncements);
    router.post('/api/announcements/', announcementController.createAnnouncement);
    router.put('/api/announcements/', announcementController.updateAnnouncement);
    router.delete('/api/announcements/', announcementController.deleteAnnouncement);

    // DESIGNATION
    router.get('/api/designation/', staffController.getAllDesignations);
    router.post('/api/designation/', staffController.createDesignation);
    router.delete('/api/designation/', staffController.deleteDesignation);
    router.put('/api/designation/', staffController.updateDesignation);

    // PERSONAL INFORMATION
    router.get('/api/staff/', staffController.getAllStaff);
    router.get('/api/staff/:id', staffController.getStaffByID);
    router.put('/api/staff/:id', staffController.updateStaffByID)
    router.put('/api/admin/maintenance/staff/password/', staffController.resetStaffPassword);
    router.put('/api/staff/personal/:id', staffController.updatePersonalInfoByID)

    // PERSONAL TEACHING REQUIREMENT
    router.get('/api/teaching-requirement/:id', staffController.getTeachingRequirementByID);
    router.get('/api/teaching-requirement/remarks/:id', staffController.getTeachingRequirementRemarks);
    router.post('/api/teaching-requirement/', staffController.createTeachingRequirement);
    router.post('/api/teaching-requirement/remarks', staffController.createTeachingRequirementRemarks);
    router.put('/api/teaching-requirement/remarks', staffController.updateTeachingRequirementRemarks);
    router.put('/api/teaching-requirement/', staffController.updateTeachingRequirement);

    router.delete('/api/teaching-requirement/:id', staffController.deleteTeachingRequirement);

    // MODULE
    router.get('/api/module/', moduleController.getAllModules);
    router.get('/api/module/sem', moduleController.getAllSemesterModules);
    router.get('/api/module/code/', moduleController.getModuleByCode);
    router.get('/api/module/section/', moduleController.getModuleBySection);
    router.get('/api/module/section/stage', moduleController.getModuleBySectionAndStage);
    router.post('/api/module/', moduleController.createModule);
    router.get('/api/all-modules/', moduleController.getEveryModule);
    router.put('/api/update-module/', moduleController.updateModule);
    router.get('/api/mod-coord/modules', moduleController.getModuleByModCoord);
    router.put('/api/mod-coord/update-module/', moduleController.updateMCModule);
    router.get('/api/mod-coord/dashboard-modules', moduleController.getMCDashboardModules);

    // MODULE PREFERENCE
    router.get('/api/module/preference', staffController.getAllModulePreference);
    router.get('/api/module/preference/:id', staffController.getModulePreferenceByID);
    router.post('/api/module/preference', staffController.submitModulePreference);
    router.put('/api/module/preference/', staffController.updateModulePreferenceByID);

    // ASSIGNED MODULES
    router.get('/api/module/assign/', staffController.getAssignedModulesByModule);
    router.get('/api/module/assign/:id', staffController.getAssignedModulesByID);
    router.post('/api/module/assign/', staffController.assignModuleByID);
    router.put('/api/module/assign/', staffController.updateAssignedModuleByID);
    router.delete('/api/module/assign/:id', staffController.unassignModuleByID);

    //MODULE WORKLOAD 
    router.get('/api/module-workload/mc',workloadController.getWorkloadByMC)
    router.get('/api/module-workload/admin',workloadController.getWorkloadByAdmin)
    router.post('/api/module-workload/mc',workloadController.createWorkload)
    router.delete('/api/module-workload/mc',workloadController.deleteWorkload)

    //STAFF-INFO
    router.get('/api/admin/maintenance/staff-info', staffController.getAllStaff);
    router.post('/api/admin/maintenance/staff/create', staffController.createStaff);
    router.put('/api/admin/maintenance/staff/update/:id', staffController.updateStaffByID);
    router.put('/api/admin/maintenance/staff/deactivate/:id', staffController.deleteStaffByID);
    router.get('/api/admin/maintenance/staff-names', staffController.getStaffNames);
    router.get('/api/admin/maintenance/all-staff-names', staffController.getAllStaffNames);
    router.get('/api/admin/maintenance/staff/roles', staffController.getStaffRoles);
    //router.post('/api/admin/maintenance/staff/roles', staffController.createStaffRoles);
    //router.delete('/api/admin/maintenance/staff/roles', staffController.deleteStaffRoles);
    
    // COURSE
    router.get('/api/courses/', courseController.getAllCourses);
    router.get('/api/course/', courseController.getAllCoursesByStatus);
    router.post('/api/course/', courseController.createCourse);
    router.put('/api/course/', courseController.updateCourse);
    router.put('/api/course/disable', courseController.disableCourse);
    router.put('/api/course/enable', courseController.enableCourse);
    router.delete('/api/course/', courseController.deleteCourse);

    // SEMESTER
    router.get('/api/semester/', semesterController.getAllSemestersByStatus);
    router.post('/api/semester/', semesterController.createSemester);
    router.put('/api/semester/', semesterController.updateSemester);
    router.put('/api/semester/disable', semesterController.disableSemester);
    router.put('/api/semester/enable', semesterController.enableSemester);
    router.delete('/api/semester/', semesterController.deleteSemester);
    router.get('/api/report/semester/', semesterController.getAllSemesters);

    //PROFILE PICTURE
    router.post('/api/uploads/profile-picture/:staff_id', uploadPFP.single('profile_picture'), uploadsController.uploadProfilePicture)
    router.get('/api/uploads/profile-picture/:staff_id', uploadsController.getProfilePicture)
    //router.post('/uploads/test', upload.single('file'), uploadsController.testFiles)

    //REPORTS
    //router.get('/reports/download/:file_id/:filename', uploadsController.downloadFile)
    router.post('/api/reports/upload/excel/', uploadsController.uploadFileJSON)

    //DOWNLOADS
    router.get('/api/reports/download/assignment-report/:acad_sem', downloadsController.getAssignmentReport)
    router.get('/api/reports/download/mc-list/:acad_sem', downloadsController.getMCList)
    router.get('/api/reports/download/summary-by-module/:acad_sem', downloadsController.getSummaryByModule)
    router.get('/api/reports/download/summary-by-staff/:acad_sem', downloadsController.getSummaryByStaff)
    router.get('/api/reports/download/staff-hours/:acad_sem', downloadsController.getTotalHoursByStaff)
    router.get('/api/reports/download/workload-summary/', downloadsController.getWorkloadSummaryByModule)
    router.get('/api/reports/download/examiner-reports/', downloadsController.getExaminerReports)

    //REPORTS API NOT IN USE
    //router.post('/uploads/reports/:staff_id', uploadReport.single('report_file'), uploadsController.insertNewReport)
    //router.delete('/uploads/reports/', getFields.none(), uploadsController.deleteReport)
    //router.get('/uploads/reports/', getFields.none(), uploadsController.getAllReport)
    //router.get('/uploads/reports/:staff_id', getFields.none(), uploadsController.getReportByStaffID)
    //router.get('/uploads/reports/file/id', getFields.none(), uploadsController.getReportByID)
    //router.put('/uploads/reports/file/:staff_id', updateReport.single('report_file'), uploadsController.checkFileMiddleware, uploadsController.updateReport)
    
    //EXAM 
    router.get('/api/exam/module', examController.getExamByModule);
    router.post('/api/exam', examController.createExam);
    router.put('/api/exam', examController.updateExam);

    // TEACHING ASSIGNMENT SYSTEM + CAS - ADMIN SUPPORT
    router.get('/api/tas/staff/', staffController.getAllStaffTAS);
    router.put('/api/tas/module/', staffController.updateModuleTAS);
    router.put('/api/cas/module/', staffController.updateModuleCAS);
    router.get('/api/cas/module/stage', staffController.getModuleStage);
    router.put('/api/cas/module/stage', staffController.updateNormalStudents);

    //NAVBAR AND DASHBOARD
    router.get('/api/nav-items', authController.getNavItems);
    router.get('/api/dashboard-items', authController.getDashboardItems);
}