const Project = require('../models/Project.model')

const addProject = async(req,res) =>{
    console.log(req.body)
    try{
        const proj = new Project({
            title:req.body.data.modaltitle,
            description:req.body.data.modaldescription,
            tags:req.body.data.modaltags,
            live:req.body.data.live,
            source:req.body.data.demo,
        })

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
        const proj = await Project.findByIdAndRemove(req.params.id)

        res.status(200).json({
            success:true,
        })
        
    }catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            msg:"Project could not be deleted"
        })
    }
}

const updateProject = async (req,res) => {
    console.log(req.body.data,req.params.projectId)
    
    try {

        const proj = await Project.findByIdAndUpdate(req.params.projectId,{
            title:req.body.data.modaltitle,
            description:req.body.data.modaldescription,
            tags:req.body.data.modaltags,
            live:req.body.data.live,
            source:req.body.data.demo,
        })

        res.status(200).json({
            success: true,
            proj
        })
    } catch (err) {
        res.json({
            success:false,
            msg:"error updating project"
        })
        
    }
}

const filterProject = async (req,res) => {

    try {

        const filterData = await Project.find({filter: {
            $all: [req.params.id]
        } })

        res.status(200).json({
            success:true,
            data:filterData
        })
        
    } catch (err) {
        res.json({
            success:false,
            msg:"error filtering projects"
        })
        
    }
}
module.exports = {addProject,getProjects,deleteProject,updateProject,filterProject}