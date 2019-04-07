const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")
const app = express()
//引入users
const users = require("./routes/api/users")
const profiles = require("./routes/api/profiles")

//使用body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//DB connect
const db = require("./config/keys").mongoURI
//connect to mongoose
mongoose.connect(db,{useNewUrlParser: true})
.then (()=>console.log("mongoDB conneted") )
.catch(err => console.log(err))


const port = process.env.port || 5000


// app.get("/",(req,res)=>{
//     res.send(`hello world!`)
// })
//使用router
app.use("/api/users",users)
app.use("/api/profiles",profiles)

//passport初始化
app.use(passport.initialize());
require('./config/passport')(passport)

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})

