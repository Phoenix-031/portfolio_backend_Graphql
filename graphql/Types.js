const {GraphQLString,GraphQLID,GraphQLObjectType,GraphQLList,GraphQLBoolean} = require('graphql')

const ProjectType = new GraphQLObjectType({
    name:"getAllProjects",
    fields: () => ({
        _id : {type:GraphQLID},
        title:{type : GraphQLString},
        description: {type : GraphQLString},
        tags:{type:GraphQLList(GraphQLString)},
        imgurl:{type : GraphQLString},
        source:{type : GraphQLString},
        live:{type : GraphQLString},
        filter:{type : GraphQLList(GraphQLString)},
    })
})

const ContactType = new GraphQLObjectType({
    name:"Contact",
    fields:() => ({
        _id:{type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        subject:{type:GraphQLString},
        message:{type:GraphQLString}
    })
})

// const UserType = new GraphQLObjectType({
//     name:"User",
//     fields:() => ({
//         _id:{type:GraphQLID},
//         secret:{type:GraphQLString},
//         email:{type:GraphQLString},
//         password:{type:GraphQLString},
//     })

// })

const AuthType = new GraphQLObjectType({
    name:"Auth",
    fields:() => ({
        accessToken:{type:GraphQLString},
        success:{type:GraphQLBoolean}
    })
})

const ResponseType = new GraphQLObjectType({
    name:"Response",
    fields:() => ({
        message:{type : GraphQLString},
        success:{type : GraphQLBoolean},
    })
})

module.exports = {ProjectType,ContactType,AuthType,ResponseType}