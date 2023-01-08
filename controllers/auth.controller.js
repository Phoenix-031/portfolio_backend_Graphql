const User = require('../models/User.model')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const loginAdmin = async(req,res) => {

    console.log(req.body)

    try {
        const {password,email} = req.body.data
        console.log(password,email)

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

const registerAdmin = async(req,res) => {

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

const verifyUser = (req, res) => {

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

const sendLoginToken = (user, statusCode, res) => {
	const accessToken = jwt.sign({ id: user._id,email: user.email,password:user.password,secret:user.secret }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LOGIN_EXPIRE });
	res.status(statusCode).json({
		success: true,
		accessToken,
	});
};

module.exports = {loginAdmin,registerAdmin,verifyUser}