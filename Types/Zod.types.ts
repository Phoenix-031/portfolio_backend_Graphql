const {z} = require('zod')

const LogintokenType = z.object({
    success:z.boolean(),
    accessToken:z.string(),
})

const UserType = z.object({
    username : z.string(),
    password : z.string(),
    _id:z.string(),
    secret : z.string(),
})

const UserModelType = z.object({
    email:z.string().email(),
    password:z.string(),
    secret:z.string(),
})

const ContactModelType = z.object({
    name:z.string(),
    email:z.string(),
    subject:z.string().optional(),
    message:z.string().optional(),
})
const ProjectModelType = z.object({
    title:z.string(),
    description:z.string(),
    tags:z.array(z.string()),
    imgurl:z.string().url(),
    source:z.string().url(),
    live:z.string().url(),
    filter:z.array(z.string().optional()),
})

export {ProjectModelType,ContactModelType,UserModelType,LogintokenType}