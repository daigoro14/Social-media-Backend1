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
    res.render('profile.ejs', {user})
  })
  router.post('/profile', upload.single('profilePhoto'), async (req,res) => {

    const {name, email} = req.body
    const {username} = req.user
  
    const user = await User.findOne({username})
    await user.updateOne({name, email, profilePhoto: `/images/${req.file.filename}`})
    res.redirect('/page/profile')
  })


  router.get('/posts', async (req, res) => {
    const user = await User.findOne({username: req.user.username})
    const entries = await PostEntry.find();
    res.render('posts.ejs', {user, entries})
  })
  router.post('/posts', async (req, res) => {
    const {username} = await User.findOne({username: req.user.username})
    console.log(username)
    const {post} = req.body;
    // const user = req.user;
    const entry = new PostEntry({post, username});
    await entry.save();
    res.redirect("/page/posts");
  })


  exports.router = router