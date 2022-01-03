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
app.get("/profile", (req, res) => {
    res.sendFile("/view/personalinformation.html", { root: __dirname });
});
app.get("/teaching-requirement", (req, res) => {
    res.sendFile("/view/teachrequirement.html", { root: __dirname });
});
app.listen(myPort,() => {
    console.log(`Client Server started and accessible via port ${myPort}`);
});