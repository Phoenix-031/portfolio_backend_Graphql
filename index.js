const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDb = require("./config/db");

const Projectroutes = require('./routes/project.route');
const Contactroutes = require('./routes/contact.route');
const Authroutes = require('./routes/auth.route');

dotenv.config({path:"./config/config.env"})

connectDb()
const app = express();

//middlewares
app.use(cors());
app.use(express.json())


//routes

app.use('/api/projects',Projectroutes)
app.use('/api/contact',Contactroutes)
app.use('/api/auth',Authroutes)

app.get('/',(req,res)=>{
    res.status(200).json("server is up and running")
})


const PORT = process.env.PORT || 8967;
app.listen(PORT, () => {
    console.log(`server started at: http://localhost:${PORT}`);
})