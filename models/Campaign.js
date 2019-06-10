const mongoose = require('mongoose')
const User = require('./User')

const CampaignSchema = new mongoose.Schema({
    name:{type:String,required:true},
    story:String,
    characters: [
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            idea:String
        }
],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

})

module.exports=mongoose.model('Campaign',CampaignSchema)