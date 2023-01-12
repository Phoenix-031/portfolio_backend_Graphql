const { GraphQLString, GraphQLList, GraphQLNonNull, GraphQLIDa,GraphQLBoolean,GraphQLID } = require('graphql')
const {UserType,ProjectType,ContactType,ResponseType} = require('../graphql/Types')
const Project = require('../models/Project.model')
const User = require('../models/User.model')
const Contact = require("../models/Contact.model")
const jwt = require("jsonwebtoken")


const isAdmin = (token) => {
        const tk = jwt.verify(token,process.env.JWT_SECRET)
        // console.log( tk)

        if(tk) {
            console.log("salijdfgh")
            const data = jwt.decode(token,process.env.JWT_SECRET)
            if(data.email === process.env.ADMIN_EMAIL) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
}


const addProject = () => ({
    type:ResponseType,
    args:{
        title:{type:GraphQLNonNull(GraphQLString)},
        description: {type:GraphQLNonNull(GraphQLString)},
        tags: {type:GraphQLList(GraphQLString)},
        source: {type:GraphQLString},
        live: {type:GraphQLString},
        token:{type: GraphQLNonNull(GraphQLString)},
    },
    resolve :async(parent,args) => {
        console.log(args)

        try {
            if(isAdmin(args.token)) {
            const newProj = new Project(args);
            const p = await newProj.save();
                return {
                    success: true,
                    message: "Project added successfully"
                }
            }
            else {
                throw new Error("Request failed")
            }
        }catch(err) {
            return{
                message:err.message,
                success: false
            }
        }
    }

})

const deleteProject = () => ({
    type:ResponseType,
    args:{id : {type:GraphQLID},token: {type:GraphQLNonNull(GraphQLString)}},
    resolve : async(parent,args) => {
        // console.log(isAdmin(args.token))
        try {
            if(isAdmin(args.token)) {
                const d = await Project.findByIdAndDelete(args.id)
                return {
                    success: true,
                    message: "Project deleted successfully"
                }
            }
            else {
                throw new Error("Request failed")
            }
        } catch (err) {
                return {
                    success: false,
                    message: "Project could not be deleted"
                }
        }
    }
})

const updateProject = () => ({
    type:ResponseType,
    args : {
        id: {type: GraphQLNonNull(GraphQLID)},
        title:{type : GraphQLString},
        description: {type : GraphQLString},
        tags:{type:GraphQLList(GraphQLString)},
        imgurl:{type : GraphQLString},
        source:{type : GraphQLString},
        live:{type : GraphQLString},
        filter:{type : GraphQLList(GraphQLString)},
        token:{type: GraphQLNonNull(GraphQLString)}
    },
    resolve : async(parent,args) => {
        try {
            if(isAdmin(args.token)) {
                const proj =await Project.findByIdAndUpdate(args.id, {
                    title: args.title,
                    description: args.description,
                    tags: args.tags,
                    source: args.source,
                    live: args.live,
                })
                return {
                    success: true,
                    message: "Project updated successfully"
                }
            }
            else {
                throw new Error("Request failed")
            }
        }catch(err) {
            return {
                message:err.message,
                success:false
            }
        }
    }

})

const deleteMessage = () => ({
    type:ResponseType,
    args:{id : {type:GraphQLID},token:{type: GraphQLNonNull(GraphQLString)}},
    resolve : async(parent,args) => {
        try {
            if(isAdmin(args.token)) {
                const d = await Contact.findByIdAndDelete(args.id)
            return {
                message:"Contact deleted",
                success:true
            }
            } else {
                throw new Error("Request failed")
            }

        } catch (err) {
            return{
                message:err.message,
                success:false
            }
        }
    }
})

const saveContact = () => ({
    type:ContactType,
    args : {
        name: {type: GraphQLNonNull(GraphQLString)},
        email:{type: GraphQLNonNull(GraphQLString)},
        subject: {type: GraphQLString},
        message: {type: GraphQLString}
    },
    resolve : async(parent,args) => {
        try {
            const con = new Contact(args);
            const svcon =await con.save()
            return svcon
        } catch (err) {
            console.log(err.message)
            
        }
    }
})

module.exports = {deleteMessage, deleteProject, updateProject, addProject,saveContact}