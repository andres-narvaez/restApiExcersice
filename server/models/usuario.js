const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useCreateIndex', true)

const Schema = mongoose.Schema

const roles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Name is mandatory']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is mandatory']
    },
    password: {
        type: String,
        required: [true, 'Password is mandatory']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roles
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

usuarioSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password

    return userObject
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico'})

module.exports = mongoose.model('Usuario', usuarioSchema)