const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String},
    email: {type: String, unique: true},
    profilePhoto: {type: String}
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema)


exports.User = User