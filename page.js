const express = require('express')
const passport = require('passport')
const { ensureLoggedIn } = require('connect-ensure-login')
const multer = require('multer')
const path = require('path')
const fs = require('fs')



const router = express.Router()

const {User} = require('./models/user')

const upload = multer({dest: 'uploads'})

// passport.use(ProfileInfo.createStrategy())


// passport.serializeUser(ProfileInfo.serializeUser())
// passport.deserializeUser(ProfileInfo.deserializeUser())

    router.use(passport.authenticate('session'))

    router.use(ensureLoggedIn("/auth/login"))
  
  router.get('/profile', async (req, res) => {
    const user = await User.findOne({username: req.user.username})
    console.log(user)
    if (user.profilePhoto) {
        console.log('True', user.profilePhoto)
        var img = fs.readFileSync(user.profilePhoto, 'utf-8', (err, data) => {
            console.log(err)
        })
        var encode_img = img.toString('base64')
        // console.log(encode_img)
        res.render('profile.ejs', {user, img: encode_img})
    } else {
        console.log('False', user.profilePhoto)
        res.render('profile.ejs', {user})
    }

  })
  router.post('/profile', upload.single('profilePhoto'), async (req,res) => {
    console.log('body', req.body)
    const {name, email} = req.body
    const profilePhoto = req.file
    console.log(profilePhoto)
    const {username} = req.user
  
    const user = await User.findOne({username})
    await user.updateOne({name, email, profilePhoto: profilePhoto.path})
    res.redirect('/page/profile')
  })


  router.get('/posts', async (req, res) => {
    res.render('posts.ejs')
  })


  exports.router = router