const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
import { NextFunction, Request, Response } from 'express';
import  Admin  from '../models/User.model'

const verifyAdmin = async(req : Request,res : Response,next : NextFunction) => {

    try {
        const {token} = req.headers

        const verifyadm = jwt.verify(token,process.env.JWT_SECRET)

        if(verifyadm) {
            const adm =  await jwt.decode(token,process.env.JWT_SECRET)
            console.log(adm)

            if(adm.email  == process.env.ADMIN_EMAIL){

                const admusr = await Admin.findOne({email:adm.email})

                if(adm.password === admusr!.password) {
                    next()
                } else {
                    res.json({
                        success:false,
                        msg:'Invalid credentials'
                    })
                }
            } else {
                res.json({
                    success: false,
                    message: 'Not authorized'
                })
            }
        } else {
            res.json({
                success: false,
                message: 'Token not valid'
            })
        }
        
    } catch (err) {
        res.status(500).json({
            success: false,
            msg:'server error'
        })
        
    }
}

module.exports = {
    verifyAdmin
}