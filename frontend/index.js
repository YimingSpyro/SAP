const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
var fs = require('fs')
const https = require('https')
app.use(express.static('public'))
app.use(express.static('profile_picture'))
app.use(cookieparser());
const myPort = 8000

//OPTIONS FOR LOCAL SERVER HTTPS DEVELOPMENT
var options = {
    key: fs.readFileSync('./cert/privkey.pem'),
    cert: fs.readFileSync('./cert/fullchain.pem')
}; 

https.createServer(options, app).listen(8000);

//Localhost WITHOUT https
/* app.listen(myPort,() => {
    console.log(`Client Server started and accessible via port ${myPort}`)
}); */

//GET FILE for receiving SSL certificate
/* app.get("/acme-challenge/76g8xXdP7WQ67LwefjaHG1mSyptexvOt5f0_odCF2ek", (req, res) => {
    res.sendFile("/public/.well-known/acme-challenge/76g8xXdP7WQ67LwefjaHG1mSyptexvOt5f0_odCF2ek.txt", { root: __dirname });
});
 */
app.get("/", (req, res) => {
    res.sendFile("/public/login.html", { root: __dirname });
});
app.get("/home", (req, res) => {
    res.sendFile("/public/home.html", { root: __dirname });
});

/* 
app.get("/test", (req, res) => {
    res.sendFile("/public/home.html", { root: __dirname });
}); */
app.get("/profile", (req, res) => {
    res.sendFile("/view/personalinformation.html", { root: __dirname });
});
app.get("/teaching-requirement/", (req, res) => {
    res.sendFile("/view/teachrequirement.html", { root: __dirname });
});
app.get("/maintenance", (req, res) => {
    res.sendFile("/view/adminmaintenancesystem.html", { root: __dirname });
});
app.get("/maintenance/staff-info", (req, res) => {
    res.sendFile("/view/adminstaffmaintenancesystem.html", { root: __dirname });
});
app.get("/admin-dashboard", (req, res) => {
    res.sendFile("/view/admindashboard.html", { root: __dirname });
});
app.get("/change-password", (req, res) => {
    res.sendFile("/view/changepassword.html", { root: __dirname });
});

app.get("/profile-picture/:pfp_id", (req, res) => {
    res.sendFile("/profile_picture/" + req.params.pfp_id, { root: __dirname });
});

app.get("/announcements", (req, res) => {
    res.sendFile("/view/adminannouncements.html", { root: __dirname });
});
//SENDFILE FOR MODULE COORDINATOR APIS---------------------------
app.get("/module-coordinator/maintenance", (req, res) => {
    res.sendFile("/view/mod-coord/mod-maintenance.html", { root: __dirname });
});
//SENDFILE FOR REPORT APIS---------------------------
app.get("/reports/assignment-report", (req, res) => {
    res.sendFile("/view/reports-html/assignmentreports.html", { root: __dirname });
});
app.get("/reports/mc-list", (req, res) => {
    res.sendFile("/view/reports-html/mclist.html", { root: __dirname });
});
app.get("/reports/summary-by-module", (req, res) => {
    res.sendFile("/view/reports-html/summarybymod.html", { root: __dirname });
});
app.get("/reports/summary-by-staff", (req, res) => {
    res.sendFile("/view/reports-html/summarybystaff.html", { root: __dirname });
});
app.get("/reports/examiner-and-verifier-report", (req, res) => {
    res.sendFile("/view/reports-html/examnverifier.html", { root: __dirname });
});
app.get("/reports/examiner-and-moderator-report", (req, res) => {
    res.sendFile("/view/reports-html/examnmoderator.html", { root: __dirname });
});
app.get("/reports/workload-summary", (req, res) => {
    res.sendFile("/view/reports-html/workloadsummaryreport.html", { root: __dirname });
});
app.get("/upload-reports", (req, res) => {
    res.sendFile("/view/uploadReport.html", { root: __dirname });
});

//SENDFILE FOR EXAM MATTERS AND WORKLOAD SUMMARY-----------------
app.get("/exam-verifier", (req, res) => {
    res.sendFile("/view/adminexammatters.html", { root: __dirname });
});

//SENDFILE FOR MODULE APIS---------------------------
app.get("/module-preference", (req, res) => {
    res.sendFile("/view/choosemodulepreference.html", { root: __dirname });
});
app.get("/module-assignment", (req, res) => {
    res.sendFile("/view/viewassignedmodule.html", { root: __dirname });
});
app.get("/teaching-assignment", (req, res) => {
    res.sendFile("/view/adminteachingassignmentsystem.html", { root: __dirname });
});
app.get("/class-assignment", (req, res) => {
    res.sendFile("/view/classassignmentsystem.html", { root: __dirname });
});

//SENDFILE FOR COURSE PLANNING APIS---------------------------
app.get("/course", (req, res) => {
    res.sendFile("/view/admincoursemaintenance.html", { root: __dirname });
});
app.get("/semester", (req, res) => {
    res.sendFile("/view/adminsemestermaintenance.html", { root: __dirname });
});
app.get("/designation", (req, res) => {
    res.sendFile("/view/admindesignationmaintenance.html", { root: __dirname });
});
app.get("/staff-hours", (req, res) => {
    res.sendFile("/view/adminstaffhoursmaintenance.html", { root: __dirname });
});


