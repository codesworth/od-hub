
const express = require('express');

const router = express.Router();

//Load UserModel
const User = require('../../models/User');


//@route   GET api/posts/test
//@desc    Tests posts routes
//@acess   Public



router.get('/test', (req,res) => res.json({message:"User Works"}));


//@route   GET api/users/register
//@desc    Register Users
//@acess   Public

router.get('/register',(request,response) = {
    User
});

module.exports = router;