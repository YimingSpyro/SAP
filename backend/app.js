const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/test', (req, res) => {
    res.set({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
    })
    res.send('https://cdn.techinasia.com/wp-content/uploads/2012/05/fuck_you.jpg')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})