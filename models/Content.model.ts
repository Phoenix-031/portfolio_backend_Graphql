import { Schema,model } from "mongoose"

const ContentSchema = new Schema({
    about:{
        type:String,
        required:true,
    },
    abouttags:{
        type:Array,
        required:true,
    },
    profileimg:{
        type:String,
        required:true,
        default:null,
    },
    intro:{
        type:String,
        required:true,
        default:null,
    },

    resumeurl:{
        type:String,
        required:true,
    },
    
},{timestamps:true})

module.exports = model('content',ContentSchema);