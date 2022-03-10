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
// const pageRouter = require('./page').router

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

// app.use('/page', pageRouter)

app.get('/posts', ensureLoggedIn("/auth/login"), async (req, res) => {
  console.log(req.user)
  const user = await User.findOne({username: req.user.username})
  // var img = fs.readFileSync(user.profilePhoto)
  // var encode_img = img.toString('base64')
  // console.log(encode_img)
  // res.render('posts.ejs', {user, img: encode_img})
  res.render('posts.ejs', {user})
})

app.post('/posts', ensureLoggedIn('/auth/login'), upload.single('profilePhoto'), async (req,res) => {
  console.log('body', req.body)
  const {name, email} = req.body
  const profilePhoto = req.file
  const {username} = req.user

  const user = await User.findOne({username})
  await user.updateOne({name, email, profilePhoto: profilePhoto.path})
  // await profileInfo.save()
  res.redirect('/posts')
})


mongoose.connect(mongoUrl)
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`)
})