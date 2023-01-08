const { GraphQLList, GraphQLString,Graphql, GraphQLObjectType } = require('graphql')
const {UserType,ProjectType,ContactType,AuthType} = require('../graphql/Types')
const Project = require('../models/Project.model')
const User = require('../models/User.model')
const Contact = require("../models/Contact.model")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")

const sendLoginToken = (user) => {
	const accessToken = jwt.sign({ id: user._id,email: user.email,password:user.password,secret:user.secret }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LOGIN_EXPIRE });
    return accessToken
};

const getAllProjects = () => ({
    type:GraphQLList(ProjectType),
    resolve: (parent,args) => {
        return Project.find()
    }
})

const getMessages = () => ({
    type:GraphQLList(ContactType),
    resolve: (parent, args) => {
        return Contact.find()
    }
})

const filterProjects = () => ({
    type: GraphQLList(ProjectType),
    args : {id : {type: GraphQLString}},
    resolve: async(parent, args) => {
        try {
            const filterData = await Project.find({filter: {
                $all: [args.id]
            } })

            return filterData
            
        } catch (err) {
            throw new Error(err.message)
            
        }
    }
})

const loginAdmin = () => ({
    type: AuthType,
    args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString}
    },
    resolve: async(parent, args) => {
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
            
        } catch (err) {
            throw new Error(err.message)
            
        }
    }
})

const verifyAdmin = () => ({
    type: AuthType,
    args: {token : {type:GraphQLString}},
    resolve: (parent, args) => {
        const verfiyAdmin = jwt.verify(args.token,process.env.JWT_SECRET)
        console.log(args)

        if(verfiyAdmin) {
            const eml = jwt.decode(args.token,process.env.JWT_SECRET)

            if(eml.email === 'pradhandebayan@gmail.com') {
                return {
                    success:true,
                    accessToken:args.token
                }
            } else {
                return {
                    success:false,
                    accessToken:args.token
                }
            }
        }
    }

})

module.exports = {getAllProjects, getMessages, filterProjects, loginAdmin,verifyAdmin}