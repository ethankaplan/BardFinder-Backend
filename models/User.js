const mongoose = require('mongoose')
const Date = require('./Date')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    dates: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Date'
  }],
})

module.exports = mongoose.model('User', UserSchema)