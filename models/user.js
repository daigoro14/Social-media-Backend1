const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String},
    name: {type: String},
    email: {type: String, unique: true},
    profilePhoto: {type: String},
    // post: {type: String},
    // date: {type: Date, deafult: Date.now}
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema)


exports.User = User