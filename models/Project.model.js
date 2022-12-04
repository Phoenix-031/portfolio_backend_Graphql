const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
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
        default:""
    },

    live:{
        type:String,
        default:""
    }
},{timestamps:true})


module.exports = mongoose.model("project",projectSchema);

