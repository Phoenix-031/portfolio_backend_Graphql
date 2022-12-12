const express = require("express");
const router = express.Router();
const {getProjects,deleteProject,addProject, updateProject, filterProject} = require("../controllers/project.controller");

//controllers


router.get('/',getProjects);
router.get('/:id',filterProject);
router.post("/",addProject);
router.put('/:projectId',updateProject)
router.delete('/:id',deleteProject)


module.exports = router;