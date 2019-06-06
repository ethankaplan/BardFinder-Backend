const mongoose = require('mongoose')
const Campaign = require('./Campaign')

const UserSchema = new mongoose.Schema({
    username: {type:String,unique:true},
    password: String,
    campaigns:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign'}],
    joined:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign'
    }]
    
})

module.exports = mongoose.model('User', UserSchema)