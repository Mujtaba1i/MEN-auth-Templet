// imports ===========================================================================================

require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const methodOverride = require("method-override")
const User = require("./models/user")
const session = require('express-session')
const app = express()
const port = process.env.PORT ? process.env.PORT : "4000"

// controller ========================================================================================

const authCtrl = require("./controllers/auth")

// cookies ========================================================================================

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    })
)

// middleware ========================================================================================

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan("dev"))
app.use('/auth' , authCtrl)

// connecting to DB ==================================================================================

try{
    mongoose.connect(process.env.MONGODB_URI);
    mongoose.connection.on("connected", () => console.log(`Connected to MongoDB: ${mongoose.connection.name}`))
}
catch(err){
    console.log('Ran into an error: ' + err)
}

// Routes ============================================================================================

// Public Routes

app.get("/", async (req, res) => {
    const user = req.session.user
    res.render('index.ejs', { user })

})

// Protected Routes

app.get('/vip-lounge', async(req,res)=>{
    if(req.session.user){
    res.send(`Welcome to the party ${req.session.user.username}.`)
    } else {
    res.send("Sorry, no guests allowed.");
  }
})

















app.listen(port, () => console.log(`listening on port ${port}`))