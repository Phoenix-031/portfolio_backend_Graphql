const {GraphQLObjectType,GraphQLSchema, graphqlSync} = require('graphql')
const {UserType,ProjectType,ContactType} = require('../graphql/Types')
const {deleteMessage, deleteProject, updateProject, addProject,saveContact} = require("../graphql/Mutations")
const {getAllProjects, getMessages, filterProjects, loginAdmin,verifyAdmin} = require("../graphql/Query")

const Mutations = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        updateProject: updateProject(),
        addProject: addProject(),
        deleteProject: deleteProject(),
        deleteMessage: deleteMessage(),
        saveContact: saveContact(),
    }
})

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        getAllProjects: getAllProjects(),
        getMessages: getMessages(),
        filterProjects: filterProjects(),
        loginAdmin: loginAdmin(),
        verifyAdmin: verifyAdmin()
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations,
})