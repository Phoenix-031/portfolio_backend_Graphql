const express = require('express')
const router = express.Router()
const {loginAdmin,registerAdmin,verifyUser} = require('../controllers/auth.controller')

//Routes

router.post('/',loginAdmin);
router.post('/register',registerAdmin);
router.get('/verify',verifyUser)

module.exports = router;