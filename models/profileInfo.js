const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

const profileInfoSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String, unique: true},
    profilePhoto: {type: String}
})

profileInfoSchema.plugin(passportLocalMongoose);

const ProfileInfo = mongoose.model('ProfileInfo', profileInfoSchema)


exports.ProfileInfo = ProfileInfo