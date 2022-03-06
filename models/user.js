const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, requied: true}
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema)


exports.User = User