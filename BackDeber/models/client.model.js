const mongoose = require('mongoose')
const ClientSchema = mongoose.Schema({
    dni:{
        type: String,
        required: true,
        unique: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: String
    },
    creationDate:{
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('client', ClientSchema)