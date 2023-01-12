import { Schema,model } from "mongoose"

const userSchema = new Schema({
    secret:{
        type: String,
        required:true,
    },

    password:{
        type: String,
        required:true,
    },

    email:{
        type: String,
        required:true,
    },
}, { timestamps:true})


export default  model("user", userSchema)