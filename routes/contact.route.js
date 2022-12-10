const express = require('express');
const router = express.Router();
const {saveContact,sendContacts,deleteContact} = require('../controllers/contact.controller')

//routes

router.post('/',saveContact);
router.get('/',sendContacts);
router.delete(':contactId',deleteContact);

module.exports = router;