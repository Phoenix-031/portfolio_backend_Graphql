const Contact = require('../models/Contact.model')

const saveContact = async(req,res) =>{

    console.log(req.body)
    
    try{

        const crtusr = new Contact(req.body)

        const svuser = await crtusr.save()
        res.status(200).json({
            success: true,
            svuser
        })

    }catch(err) {
        console.log(err);
        res.status(500).json({
            success:true,
            msg:"could not save contact information",
        })
    }
}

const sendContacts = async(req,res) =>{
    try {
        const con = await Contact.find()

        res.status(200).json({
            success: true,
            con
        })
    } catch (err) {
        res.status(500).json({
            success:false,
            msg:"could not send contacts",
        })
        
    }
}

const deleteContact = async(req,res) =>{
    try {
        
    } catch (err) {
        res.json({
            success:false,
            msg:"could not delete contact",
        })
        
    }
}

module.exports = {saveContact,sendContacts,deleteContact}