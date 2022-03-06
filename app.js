const express = require("express")
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const dotenv = require('dotenv')
const { ensureLoggedIn } = require('connect-ensure-login')
const MongoStore = require("connect-mongo");
dotenv.config()

const authRouter = require('./auth').router

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

app.use('/auth', authRouter)


app.get('/posts', ensureLoggedIn("/auth/login"), (req, res) => {
  res.render('posts.ejs')
})


mongoose.connect(mongoUrl)
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`)
});