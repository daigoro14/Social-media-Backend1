const express = require('express')
const passport = require('passport')

const router = express.Router()

const {User} = require('./models/user')

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

router.post('/signup', async (req, res) => {
    try {
      const user = new User({username: req.body.username});
      await user.setPassword(req.body.password)
      await user.save()
      res.redirect('/auth/login')
    } catch(error) {
    res.send(error)
    }
  
  })
  router.get("/signup", (req, res) => {
      res.render("signup.ejs")
    });
  

    router.post('/login', passport.authenticate('local', {
        successRedirect: "/posts"
    }))
  router.get("/login", (_req, res) => {
    res.render("login.ejs")
  })
  
  router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('./login')
  })

  exports.router = router