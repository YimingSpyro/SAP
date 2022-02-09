const express = require("express");
const cors = require('cors')
const config = require('./config/config');
const cookieParser = require("cookie-parser");
var jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = 'tassystem';
var fs = require('fs')

const https = require('https')

//Server Settings
const PORT = 8080;
const path = require("path");



let app = express();

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    //Localhost Dev URL
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:8000');
    
    //Live URL
    //res.setHeader('Access-Control-Allow-Origin', 'https://soctas2021.irc.sg:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cookieParser());

/* //Pug Template Engine
app.set("view engine", "pug");
app.set("views", path.resolve("./src/views")); */


//Request Parsing
/* var corsOptions = {
    origin: 'http://localhost:8000',
}
app.use(cors(corsOptions)); */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Express Router
const router = express.Router();
app.use(router);

//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
const rootPath = path.resolve("./dist");
app.use(express.static(rootPath));

const route = require('./routes');
route.appRoute(app, router);

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, JWT_SECRET_KEY)
        console.log(data);
        if (data.staff_name) return res.redirect('https://soctas2021.irc.sg/home.html')
    } catch {
        return res.sendStatus(403);
    }
}

app.get('/getcookie', isAuthenticated, (req, res) => {
    //show the saved cookies
    console.log(req.cookies)
    res.cookie("username", "shesh", {
        httpOnly: true
    });
    res.send(req.cookies);
});



//Index Page (Home public page)
router.get('/', (req, res, next) => {
    res.send('<html><title>TAS Backend API</title><body>This address is currently used for TAS API</body></html>');
    res.end();
});

//This is an error handling middleware, all 4 parameters are required
router.use((err, req, res, next) => {
    if (err) {

        return res.send(err.message);
    }
});

process.on('uncaughtException', function (error, origin) {
    //Handle the error safely. 
    //Developer note: As long as you have callback hell, the error handling code
    //will break. This often occurs during team development.
    //Key reference: https://www.toptal.com/nodejs/node-js-error-handling
    console.log('process.on method is automatically called for unhandled errors:\n ',
        error, 'origin:\n',
        origin);
    process.exit(1);
})



/* app.listen(PORT, err => {
    if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
    console.log(`Server is Listening on: http://localhost:${PORT}/`);
}); */

console.log(__dirname)
var options = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem')
};
https.createServer(options, app).listen(8080);

// Connect to the Database
const pool = require('./config/database')
pool.getConnection((err) => {
    if (err) {
        console.log('Error Message Here', err);
        resolve(err);
    } else {
        console.log("Connected");
    }
});