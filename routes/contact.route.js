const express = require('express');
const router = express.Router();
const saveContact = require('../controllers/contact.controller')

//routes

router.post('/',saveContact);

module.exports = router;