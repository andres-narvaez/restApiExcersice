require('./config/config')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.use(require('./routes/usuario'))


mongoose.connect('mongodb://localhost:27017/cafe', { useNewUrlParser: true }, (error, response) => {
    if(error) throw error
    console.log('Base de datos online')
});

app.listen(process.env.PORT, () => {
    console.log(`Listen port ${process.env.PORT}`)
})