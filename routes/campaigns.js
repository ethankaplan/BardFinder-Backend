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

router.delete('/:id/:owner', async(req,res)=>{
    try{
        //find user to remove from, will add later
        const foundUser = await User.findById(req.params.owner)
        const deletedCamp = await Campaign.findByIdAndRemove(req.params.id)
        //foundUser.campaigns.splice
        res.json({
            message:"campaign has been deleted"
        })

    }catch(err){
        res.json({err})
    }
})

router.put('/e/:id', async(req,res)=>{
                             
        try {

            const updateCamp = await Campaign.findByIdAndUpdate(req.params.id, req.body, {new:true})
            
            updateCamp.story = req.body
                updateCamp.save();
             
            res.json({
                campaign: updateCamp,
                status: 200
            })
        } catch (error) {
            res.json({
                error: error
            })
        }


    })



  router.post('/createCamp/:userid', async (req, res) => {
    try {
      
      const foundUser=await User.findById(req.params.userid)
      
      const newCamp=await Campaign.create(req.body)
      
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
            .populate("characters.user")
            console.log(campaign)
            
            res.json({
                campaign
            })
        }catch(err){
            res.json({err})
        }})

        router.get('/:id/chars', async (req,res)=>{
            try{
                const campaign = await Campaign.findById(req.params.id)
                const chars = campaign.characters
                
                
                
                
                res.json({
                    chars
                })
            }catch(err){
                res.json({err})
            }})
  

  router.post('/', async (req, res) => {
    
    try {
        
        
        const foundUser=await User.findById(req.body.owner)
        const newCamp=await Campaign.create(req.body)
        
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
        
        const campaign = await Campaign.findById(req.params.id)
        const user= await User.findById(req.body.user)
        
        campaign.characters.push({
            user,
            idea:req.body.idea
        })
        campaign.save()
        user.joined.push(campaign)
        user.save()
    
        res.json({
            message:"done!",
            status:200
          })
    } catch(err) {
      res.json({err})
    }
  });

module.exports = router;