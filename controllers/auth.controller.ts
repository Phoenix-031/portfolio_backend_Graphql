const User = require('../models/User.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
import { Request,Response } from "express"
import { z } from "zod"
import { UserModelType } from "../Types/Zod.types"

const loginAdmin = async(req : Request,res :Response) => {

    // console.log(req.body)

    try {
        const {password,email} = req.body.data
        // console.log(password,email)

        const Adm =await User.findOne({email})
        // console.log(Adm)
     
        if(Adm) {
            const auth = await bcrypt.compare(password,Adm.password) 
            console.log(auth)
            if(auth){
                sendLoginToken(Adm,200,res)
            }
        } else {
            res.json({
                success: false,
                msg:'Invalid login credentials'
            })
        }
    } catch (err) {
        res.json({
            success:false,
            msg:'login failed'
        })
        
    }
}

const registerAdmin = async(req : Request,res : Response) => {

    try {

        const {secret,password,email} = req.body

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)
        
        const adm = new User({
            email,
            secret,
            password: hashedpassword,
        })

        // console.log(adm)
        const usr = await adm.save()

        // console.log(usr)

        res.status(200).json({
            success: true,
            usr
        })
        
    } catch (err) {
        res.json({
            success:false,
            msg:'register failed'
        })
        
    }
}

const verifyUser = (req :Request, res : Response) => {

    try {
        const {token} = req.headers

        const verfiyAdmin = jwt.verify(token,process.env.JWT_SECRET)

        if(verfiyAdmin) {
            const eml = jwt.decode(token,process.env.JWT_SECRET)
            console.log(eml)

            if(eml.email === 'pradhandebayan@gmail.com') {
                res.json({
                    success:true
                })
            } else {
                res.json({
                    success:false
                })
            }
        }
        
    } catch (err) {
        res.json({
            success:false,
            msg:'Invalid token'
        })
        
    }
}

const sendLoginToken = (user: z.infer<typeof UserModelType >, statusCode : number, res : Response) => {
	const accessToken = jwt.sign({ id: user._id,email: user.email,password:user.password,secret:user.secret }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LOGIN_EXPIRE });
	res.status(statusCode).json({
		success: true,
		accessToken,
	});
};

export {loginAdmin,registerAdmin,verifyUser}