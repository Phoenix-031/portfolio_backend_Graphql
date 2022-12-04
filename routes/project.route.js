const express = require("express");
const router = express.Router();
const {getProjects,deleteProject,addProject} = require("../controllers/project.controller");

//controllers


router.get('/',getProjects);
// router.get('/:id',getProject);
router.post("/",addProject);
// router.delete('/:id',deleteProject)


module.exports = router;