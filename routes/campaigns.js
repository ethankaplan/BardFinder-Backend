const express = require('express');
const router = express.Router();

const User = require('../models/User')
const Campaign = require('../models/Campaign')


router.get('/view/:id', async (req, res) => {
    try {
      const campaign = await Campaign.findById(req.params.id).populate("campaigns")
      .populate("owner")
      
      res.json({
        campaign
      })
    } catch(err) {
      res.json({err})
    }
  });

  router.post('/createCamp/:userid', async (req, res) => {
    try {
      console.log("Camp post route")
      const foundUser=await User.findById(req.params.userid)
      console.log(req.body)
      const newCamp=await Campaign.create(req.body)
      console.log(foundUser)
      foundUser.campaigns.push(newCamp).save()
      res.json({
        message:"done!",
        status:200
      })
    } catch(err) {
      res.json({err})
    }
  });

  router.get('/', async (req,res)=>{
    try{
        
        const campaigns = await Campaign.find({}).populate("owner")
        res.json({
            campaigns
        })
    }catch(err){
        res.json({err})
    }})

    router.get('/:id', async (req,res)=>{
        try{
            const campaign = await Campaign.findById(req.params.id).populate("owner")
            .populate("character")
            res.json({
                campaign
            })
        }catch(err){
            res.json({err})
        }})
  

  router.post('/', async (req, res) => {
    
    try {
        console.log("Camp post route")
        console.log(req.body)
        
        const foundUser=await User.findById(req.body.owner)
        const newCamp=await Campaign.create(req.body)
        console.log(foundUser)
        foundUser.campaigns.push(newCamp)
        foundUser.save()
        res.json({
            theid:newCamp._id,
            message:"done!",
          status:200,
          
        })
      } catch(err) {
        res.json({err})
      }
    });

  router.post('/:id/newChar/', async (req, res) => {
    
    try {
        console.log(req.body)
        const campaign = await Campaign.findById(req.params.id)
        const user= await User.findById(req.body.User._id)

        campaign.characters.push({
            User:user,
            idea:req.body.idea
        }).save()
    
        res.json({
            message:"done!",
            status:200
          })
    } catch(err) {
      res.json({err})
    }
  });

module.exports = router;