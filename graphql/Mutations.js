const { GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID } = require('graphql')
const {UserType,ProjectType,ContactType} = require('../graphql/Types')
const Project = require('../models/Project.model')
const User = require('../models/User.model')
const Contact = require("../models/Contact.model")


const addProject = () => ({
    type:ProjectType,
    args:{
        title:{type:GraphQLNonNull(GraphQLString)},
        description: {type:GraphQLNonNull(GraphQLString)},
        tags: {type:GraphQLList(GraphQLString)},
        source: {type:GraphQLString},
        live: {type:GraphQLString},
    },
    resolve :async(parent,args) => {
        console.log(args)
        try {
            const newProj = new Project(args);
            const p = await newProj.save();
            return p;
            
        } catch (err) {
            throw new Error(err.message)
            
        }
    }

})

const deleteProject = () => ({
    type:ProjectType,
    args:{id : {type:GraphQLID}},
    resolve : async(parent,args) => {
        try {
            return Project.findByIdAndDelete(args.id)
        } catch (err) {
            throw new Error(err.message)
            
        }
    }

})

const updateProject = () => ({
    type:ProjectType,
    args : {
        id: {type: GraphQLNonNull(GraphQLID)},
        title:{type : GraphQLString},
        description: {type : GraphQLString},
        tags:{type:GraphQLList(GraphQLString)},
        imgurl:{type : GraphQLString},
        source:{type : GraphQLString},
        live:{type : GraphQLString},
        filter:{type : GraphQLList(GraphQLString)},
    },
    resolve : async(parent,args) => {
        try {

            const proj =await Project.findByIdAndUpdate(args.id, {
                title: args.title,
                description: args.description,
                tags: args.tags,
                source: args.source,
                live: args.live,
            })
            return proj
        } catch (err) {
            throw new Error(err.message)
            
        }
    }

})

const deleteMessage = () => ({
    type:ContactType,
    args:{id : {type:GraphQLID}},
    resolve : async(parent,args) => {
        try {
            return Contact.findByIdAndDelete(args.id)
        } catch (err) {
            throw new Error(err.message)
            
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
            throw new Error(err.message)
            
        }
    }
})

module.exports = {deleteMessage, deleteProject, updateProject, addProject,saveContact}