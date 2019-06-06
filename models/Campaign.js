const mongoose = require('mongoose')
const User = require('./User')

const CampaignSchema = new mongoose.Schema({
    name:String,
    story:String,
    characters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        idea:String
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

})

module.exports=mongoose.model('Campaign',CampaignSchema)