const express = require("express")
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const dotenv = require('dotenv')
const { ensureLoggedIn } = require('connect-ensure-login')
const MongoStore = require("connect-mongo");
const multer = require('multer')
const path = require('path')
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

app.use(upload.single('uploaded-file'))

app.use(passport.authenticate('session'))

app.use('/auth', authRouter)

// app.use('/page', pageRouter)

app.get('/posts', ensureLoggedIn("/auth/login"), async (req, res) => {
  const infos = await User.find({email: req.body.email})
  res.render('posts.ejs', {infos})
})

// KOLLA LEKTION 4
app.post('/posts', upload.single('files'), async (req,res) => {
  const {name, email} = req.body
  const profilePhoto = new User({profilePhoto})

  const photoPath = req.file.path
  profilePhoto = fs.readFileSync(photoPath)
  // const profilePhoto = User.profilePhoto.data = fs.readFileSync(photoPath)
  User.profilePhoto.contentType = 'image/jpg'

  const profileInfo = new User({name, email, profilePhoto})
  await profileInfo.save()
  res.redirect('/posts')
})


mongoose.connect(mongoUrl)
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`)
})