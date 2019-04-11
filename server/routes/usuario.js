const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
const Usuario = require('../models/usuario')
const _ = require('underscore')

app.get('/', function (req, res) {
    res.json('Hello restApi')
})

app.get('/usuario', function (req, res) {
    res.json('get usuario')
})

app.post('/usuario', function (req, res) {
    const body = req.body;
    const usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((error, usuarioDb) => {
        if(error){
            return res.status(400).json({
                ok:false,
                error
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDb
        })
    })
})

app.put('/usuario/:id', function (req, res) {
    const id = req.params.id
    const body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'state'])

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (error, usuarioDb) => {
        if(error){
            return res.status(400).json({
                ok:false,
                error
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDb
        })
    })
})

app.delete('/usuario', function (req, res) {
    res.json('delete usuario')
})

module.exports = app