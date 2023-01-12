import { Router } from "express";
const router = Router();

import {loginAdmin,registerAdmin,verifyUser} from '../controllers/auth.controller'

//Routes

router.post('/',loginAdmin);
router.post('/register',registerAdmin);
router.get('/verify',verifyUser)

module.exports = router;