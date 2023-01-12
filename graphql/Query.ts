import { z } from "zod"
import { UserModelType } from "../Types/Zod.types"

const { GraphQLList, GraphQLString } = require("graphql")
const {ProjectType,ContactType,AuthType} = require("./Types")
import Project from "../models/Project.model"
import User from "../models/User.model"
import Contact from "../models/Contact.model"
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const sendLoginToken = (user : z.infer<typeof UserModelType>) => {
	const accessToken = jwt.sign({ id: user._id,email: user.email,password:user.password,secret:user.secret}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LOGIN_EXPIRE });
    return accessToken
};

const getAllProjects = () => ({
    type:GraphQLList(ProjectType),
    resolve: (parent : any,args : any) => {
        return Project.find()
    }
})

const getMessages = () => ({
    type:GraphQLList(ContactType),
    resolve: (parent : any, args : any) => {
        return Contact.find()
    }
})

const filterProjects = () => ({
    type: GraphQLList(ProjectType),
    args : {id : {type: GraphQLString}},
    resolve: async(parent : any, args : any) => {
        try {
            const filterData = await Project.find({filter: {
                $all: [args.id]
            } })

            return filterData
            
        } catch (err : any) {
            console.error(err.message)
            
        }
    }
})

const loginAdmin = () => ({
    type: AuthType,
    args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString}
    },
    resolve: async(parent : any, args : any) => {
        try {
            const adm = await User.findOne({email : args.email})      

            if(adm) {
                const auth =await bcrypt.compare(args.password, adm.password)
                if(auth) {
                    return {
                        accessToken:sendLoginToken(adm),
                        success:true
                    }
                } else {
                    return {
                        accessToken:"",
                        success:false
                    }
                }
            }
            
        } catch (err : any) {
            console.log(err.message)
            
        }
    }
})

const veriAdmin = () => ({
    type: AuthType,
    args: {token : {type:GraphQLString}},
    resolve: (parent : any, args : any) => {
        const verfiyAdmin = jwt.verify(args.token,process.env.JWT_SECRET)
        console.log(args)

        if(verfiyAdmin) {
            const eml = jwt.decode(args.token,process.env.JWT_SECRET)

            if(eml.email === 'pradhandebayan@gmail.com') {
                return {
                    success:true,
                }
            } else {
                return {
                    success:false,
                }
            }
        }
    }

})

export {getAllProjects, getMessages, filterProjects, loginAdmin,veriAdmin}