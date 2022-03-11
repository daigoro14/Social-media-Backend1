const express = require("express")
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const dotenv = require('dotenv')
const { ensureLoggedIn } = require('connect-ensure-login')
const MongoStore = require("connect-mongo");
const multer = require('multer')
const path = require('path')
const fs = require('fs')
dotenv.config()

// const {ProfileInfo} = require('./models/profileInfo')
const {User} = require('./models/user')

const upload = multer({dest: 'uploads'})

const authRouter = require('./auth').router
const pageRouter = require('./page').router

const secretKey = process.env.secretKey
const app = express()
const PORT = 3000;
const mongoUrl = 'mongodb://localhost/backend1-uppgift'

app.use(express.urlencoded({extended: true}))

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl})
}))

app.use(passport.authenticate('session'))

// app.use(express.static("styles"))

app.use('/auth', authRouter)

app.use('/page', pageRouter)

mongoose.connect(mongoUrl)
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`)
})