const express = require('express');
const router = express.Router();
const {saveContact,sendContacts,deleteContact} = require('../controllers/contact.controller');
const { verifyAdmin } = require('../middlewares/admin.middlware');

//routes

router.post('/',saveContact);
router.get('/',verifyAdmin,sendContacts);
router.delete('/:contactId',deleteContact);

module.exports = router;