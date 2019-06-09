const express = require('express');
const router = express.Router();

const User = require('../models/User')
const Campaign = require('../models/Campaign')


router.get('/view/:id', async (req, res) => {
    try {
      const campaign = await Campaign.findById(req.params.id).populate("campaigns")
      
      res.json({
        campaign
      })
    } catch(err) {
      res.json({err})
    }
  });

  router.post('/createCamp/:id', async (req, res) => {
    try {
      console.log("Camp post route")
      console.log(req.body)
      console.log(req.params.id)
      const foundUser=await User.findById(req.params.id)
      const newCamp=await Campaign.create(req.body)
      foundUser.campaigns.push(newCamp)
      foundUser.save()
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
            res.json({
                campaign
            })
        }catch(err){
            res.json({err})
        }})
  

  router.post('/', async (req, res) => {
    
    try {
    
      const camp = await Campaign.create(req.body)
    
      res.json({camp})
    } catch(err) {
      res.json({err})
    }
  });

module.exports = router;