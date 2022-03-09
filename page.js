// const express = require('express')
// const passport = require('passport')
// const { ensureLoggedIn } = require('connect-ensure-login')

// const router = express.Router()

// const {ProfileInfo} = require('./models/profileInfo')

// passport.use(ProfileInfo.createStrategy())


// passport.serializeUser(ProfileInfo.serializeUser())
// passport.deserializeUser(ProfileInfo.deserializeUser())

//     router.use(passport.authenticate('session'))


//   router.get('/page/posts', ensureLoggedIn("/auth/login"), async (req, res) => {
//     const infos = await ProfileInfo.find({email: req.body.email})
//     res.render('posts.ejs', {infos})
//   })
//   router.post('/page/posts', async (req,res) => {
//     const {name, email, profilePhoto} = req.body
//     const profileInfo = new ProfileInfo({name, email, profilePhoto})
//     await profileInfo.save()
//     res.redirect('/posts')
//   })

//   exports.router = router