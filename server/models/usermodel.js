const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String
})

const UserModel = mongoose.model("satya",UserSchema)
module.exports = UserModel