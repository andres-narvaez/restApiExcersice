require('./config/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.json('Hello restApi')
})

app.get('/usuario', function (req, res) {
    res.json('get usuario')
})

app.post('/usuario', function (req, res) {
    const body = req.body;
    res.json({
        body
    })
})

app.put('/usuario/:id', function (req, res) {
    const id = req.params.id
    res.json({
        id
    })
})

app.delete('/usuario', function (req, res) {
    res.json('delete usuario')
})

app.listen(process.env.PORT, () => {
    console.log(`Listen port ${process.env.PORT}`)
})