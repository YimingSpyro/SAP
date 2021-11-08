const express = require('express')
const db = require('./controller/staffController.js')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/test', (req, res) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
    })
    console.log("testing test api")
    var data = db.getAllStaff().then(
        (value) => {
            res.send(value);
        },
        (err) => {
            console.log(err)
        }
    );
})
app.post('/login', (req, res) => {
    console.log(req.body)
/*     var staff_id_input = req.qu;
    var staff_password_input = $('#password').val; */
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
    })
    console.log("testing test api")
    var data = db.getStaffByStaffId().then(
        (value) => {
            res.send(value);
        },
        (err) => {
            console.log(err)
        }
    );
    //res.send('https://cdn.techinasia.com/wp-content/uploads/2012/05/fuck_you.jpg');
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})