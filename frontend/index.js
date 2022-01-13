const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");

app.use(express.static('public'))
app.use(express.static('profile_picture'))
app.use(cookieparser());
const myPort = 8000
/* app.get("/login", (req, res) => {
    res.sendFile("/public/login.html", { root: __dirname });
});

app.get("/test", (req, res) => {
    res.sendFile("/public/home.html", { root: __dirname });
}); */
app.get("/login", (req, res) => {
    res.sendFile("/public/login.html", { root: __dirname });
});
app.get("/home", (req, res) => {
    res.sendFile("/public/home.html", { root: __dirname });
});
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
app.get("/reports", (req, res) => {
    res.sendFile("/view/reports.html", { root: __dirname });
});
app.get("/module-preference", (req, res) => {
    res.sendFile("/view/choosemodulepreference.html", { root: __dirname });
});
app.get("/module-assignment", (req, res) => {
    res.sendFile("/view/viewassignedmodule.html", { root: __dirname });
});
app.get("/teaching-assignment", (req, res) => {
    res.sendFile("/view/adminteachingassignmentsystem.html", { root: __dirname });
});
app.listen(myPort,() => {
    console.log(`Client Server started and accessible via port ${myPort}`);
});
