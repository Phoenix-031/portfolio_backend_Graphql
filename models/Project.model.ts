import { Schema,model } from "mongoose"

const projectSchema = new Schema({
    title:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    tags:{
        type: Array,
        required: true
    },

    imgurl:{
        type: String,
        default:"https://blogthinkbig.com/wp-content/uploads/sites/4/2020/06/GitHub-Desktop-Logo.jpg?fit=1500%2C1000"
    },

    source:{
        type: String,
        default:"https://github.com/Phoenix-031"
    },

    live:{
        type:String,
        default:"https://github.com/Phoenix-031"
    },

    filter:{
        type:Array,
        default:["All"],
        required:true
    }
},{timestamps:true})


export default model("project",projectSchema);

