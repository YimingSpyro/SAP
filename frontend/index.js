const express = require("express");
const app = express();

app.use(express.static('public'))

const myPort = 3000
app.get("/login", (req, res) => {
    res.sendFile("/public/login.html", { root: __dirname });
});

app.get("/test", (req, res) => {
    res.sendFile("/public/home.html", { root: __dirname });
});
  
app.listen(myPort,() => {
    console.log(`Client Server started and accessible via port ${myPort}`);
});