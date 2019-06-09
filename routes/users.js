const express = require('express');
const router = express.Router();

const User = require('../models/User')
const Campaign = require('../models/Campaign')





router.post('/', async (req, res) => {
  console.log("hit 1")
  try {
    console.log("hit 2")
    const user = await User.create(req.body)
    console.log("hit 3")
    res.json({user})
  } catch(err) {
    res.json({err})
  }
});

router.put('/', (req, res) => {
  return res.json({data: 'Received a PUT HTTP method user'});
});


router.delete('/', (req, res) => {
  return res.json({data: 'Received a DELETE HTTP method user'});
});


router.delete('/delete/:id/:camp', async(req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.campaigns.splice(req.params.camp, 1);
    user.save();
    Campaign.findById(req.params.camp)
    console.log(user);
    res.json({ user, success: true });
  } catch (err) {
    console.log(err);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.json({err});
    } else {
      res.json({
        success: true,
        message: "logged out!"
      });
    }
  })
 })

router.post('/login', async (req, res) => {
  console.log('hit')
  try {
    const foundUser = await User.findOne({username: req.body.username})
    console.log(foundUser)
    res.json({
      user: foundUser,
      success: foundUser? true : false
    })
  } catch(err) {
    res.json({err})
  }
})
router.get('/view/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    
    res.json({
      user
    })
  } catch(err) {
    res.json({err})
  }
});
router.get('/:id/getCamps', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const campaigns = await user.campaigns.find({})
    res.json({
      campaigns
    })
  } catch(err) {
    res.json({err})
  }
});

router.get('/:id/getJoined', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const campaigns = await user.joined.find({})
    res.json({
      campaigns
    })
  } catch(err) {
    res.json({err})
  }
});

router.get('/',async(req,res)=>{
  try{
  const users = await User.find({})
  res.json({
    users
  })
} catch(err) {
  res.json({err})
}
});



module.exports = router;
