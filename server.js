// imports ===========================================================================================

const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const methodOverride = require("method-override")
const User = require("./models/user")
const app = express()
const port = process.env.PORT ? process.env.PORT : "3000"
require("dotenv").config()

// controller ========================================================================================

const authCtrl = require("./controllers/auth")

// middleware ========================================================================================

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan("dev"))
app.use('/auth' , authCtrl)

// connecting to DB ==================================================================================

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => console.log(`Connected to MongoDB ${mongoose.connection.name}`))

// ===============================================================================================

// Public

app.get("/", async (req, res) => res.render('index.ejs'))

// Protected Route


















app.listen(port, () => console.log(`listening on port ${port}`))