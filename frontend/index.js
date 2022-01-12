const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");

app.use(express.static('public'))
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
app.get("/teaching-requirement", (req, res) => {
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
app.listen(myPort,() => {
    console.log(`Client Server started and accessible via port ${myPort}`);
});