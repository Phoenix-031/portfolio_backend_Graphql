const {GraphQLObjectType,GraphQLSchema} = require("graphql")
import {deleteMessage, deleteProject, updateProject, addProject,saveContact} from  "../graphql/Mutations"
import {getAllProjects, getMessages, filterProjects, loginAdmin,veriAdmin} from  "../graphql/Query"

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
    name:"RootQuery",
    fields:{
        getAllProjects: getAllProjects(),
        getMessages: getMessages(),
        filterProjects: filterProjects(),
        loginAdmin: loginAdmin(),
        verifyAdmin: veriAdmin()
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations,
})