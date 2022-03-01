const express = require("express")
const mongoose = require('mongoose')
const {User} = require('./models/user')

const app = express()
const PORT = 3000;

app.use(express.urlencoded())


app.post('/signup', async (req, res) => {
  const users = new User(req.body)
  try {
    await users.save()
    res.redirect('/login')
  } catch(error) {
  res.send(error)
  }

})
app.get("/signup", (req, res) => {
    res.render("signup.ejs")
  });

app.post('/login', async (req,res) => {
  console.log('Hej')
  const username = req.body.username
  const password = req.body.password
  const user = await User.findOne({username: username, password: password})
  console.log(user)
  res.redirect('/posts')
  res.end()
  
})
app.get("/login", (req, res) => {
  res.render("login.ejs")
});

app.get('/posts', (req, res) => {
  res.render('posts.ejs')
})
mongoose.connect('mongodb://localhost/backend1-uppgift')
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`)
});