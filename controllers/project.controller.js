const Project = require('../models/Project.model')

const addProject = async(req,res) =>{
    try{
        const proj = new Project(req.body)

        const savedproj = await proj.save()

        res.status(200).json({
            success: true,
            savedproj
        })
    }catch(err){
        res.status(500).json({
            success:false,
            msg:"error addying project"
        })
    }
}

const getProjects = async (req,res) =>{
    try{
        const projlst = await Project.find()

        res.status(200).json({
            success:true,
            data:projlst
        })

    }catch(err) {
        console.log(err)
        res.status(500).json({
            success:false,
            msg:"error retrieving projects information"
        })
    }
}


const deleteProject = async (req,res) => {
    try{
        const proj = await Project.findById(req.params.id)

        
    }catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            msg:"Project could not be deleted"
        })
    }
}
module.exports = {addProject,getProjects,deleteProject}