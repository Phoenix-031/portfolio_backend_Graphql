const Contact = require('../models/Contact.model')
import { Request,Response } from "express"

const saveContact = async(req : Request,res : Response) =>{

    // console.log(req.body)
    
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

const sendContacts = async(req : Request,res : Response) =>{
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

const deleteContact = async(req : Request,res : Response) =>{
    try {
        
        // console.log(req.params)
        const delcont = await Contact.findByIdAndDelete(req.params.contactId);

        res.status(200).json({
            succes:true
        })
    } catch (err) {
        res.json({
            success:false,
            msg:"could not delete contact",
        })
        
    }
}

export {saveContact,sendContacts,deleteContact}