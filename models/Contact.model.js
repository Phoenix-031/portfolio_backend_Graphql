const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    subject:{
        type:String,
        default:""
    },

    message:{
        type:String,
        default:""
    }
},{timestamps:true})

module.exports = mongoose.model("contact", contactSchema)