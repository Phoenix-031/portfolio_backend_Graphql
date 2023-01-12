import { Schema,model } from "mongoose"

const contactSchema =new Schema({
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

export default model("contact", contactSchema)