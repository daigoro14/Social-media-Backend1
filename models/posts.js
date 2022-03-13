const mongoose = require("mongoose");

const postEntrySchema = new mongoose.Schema({
  user: {type: mongoose.Schema.ObjectId, ref: "User"},
  username: {type: String},
  profilePhoto: {type: String},
  post: {type: String, required: true},
  date: {type: Date, default: Date.now}
})

const PostEntry = mongoose.model("PostEntry", postEntrySchema);

exports.PostEntry = PostEntry;