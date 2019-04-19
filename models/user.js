const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  phone: String,
  right: String,
  company: String,
  password: String,
  uuid: String,
  isAuth: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('User', userSchema)

