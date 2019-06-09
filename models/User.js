const mongoose = require('mongoose')
const Campaign = require('./Campaign')

const UserSchema = new mongoose.Schema({
    username: {type:String,unique:true,require:true},
    password: {type:String,required:true},
    email:{type:String,unique:true,require:true},
    campaigns:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign'}],
    joined:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign'
    }]
    
})

module.exports = mongoose.model('User', UserSchema)