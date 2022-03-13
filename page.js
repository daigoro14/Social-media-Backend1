const express = require('express')
const passport = require('passport')
const { ensureLoggedIn } = require('connect-ensure-login')
const multer = require('multer')
const path = require('path')
const fs = require('fs')




const router = express.Router()

const {User} = require('./models/user')
const {PostEntry} = require('./models/posts')
const { localsName } = require('ejs')

// const upload = multer({dest: 'uploads'})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })


    router.use(express.static('public'))

    router.use(passport.authenticate('session'))

    router.use(ensureLoggedIn("/auth/login"))
  
  router.get('/profile', async (req, res) => {
    const user = await User.findOne({username: req.user.username})
    // const {username} = req.user
    // const postUser = await PostEntry.find({username})

    // console.log(postUser)
    res.render('profile.ejs', {user})
  })
  router.post('/profile', upload.single('profilePhoto'), async (req,res) => {

    const {name, email} = req.body
    const {username} = req.user
  
    const user = await User.findOne({username})
    await user.updateOne({name, email, profilePhoto: `/images/${req.file.filename}`})

    // const postUser = await PostEntry.find({username})

    // console.log(postUser)
    // await postUser.replace({profilePhoto: user.profilePhoto})

    res.redirect('/page/profile')
  })


  router.get('/posts', async (req, res) => {
    const user = await User.findOne({username: req.user.username})
    const entries = await PostEntry.find()
    entries.sort((a, b) => {
        const dateA = a.date
        const dateB = b.date
        if (dateA > dateB) {
            return -1
        } else if (dateA < dateB) {
            return 1
        } else {
            return 0
        }
    })
    res.render('posts.ejs', {user, entries})
  })
  router.post('/posts', async (req, res) => {
    const user = await User.findOne({username: req.user.username})
    const {post} = req.body;
    // const user = req.user;
    const entry = new PostEntry({post, username: user.username, profilePhoto: user.profilePhoto});
    await entry.save();
    res.redirect("/page/posts");
  })

  router.get('/user/:user', async (req, res) => {
    const user = await User.findOne({username: req.user.username})
    const userProfile = req.params
    const profileInfo = await User.find({username: userProfile.user})
    const entries = await PostEntry.find({username: userProfile.user})
    entries.sort((a, b) => {
        const dateA = a.date
        const dateB = b.date
        if (dateA > dateB) {
            return -1
        } else if (dateA < dateB) {
            return 1
        } else {
            return 0
        }
    })
    console.log(profileInfo[0].username)
      res.render('user.ejs', {user, userProfile, profileInfo, entries})
  })

  exports.router = router