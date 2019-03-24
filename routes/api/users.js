
const express = require('express');

const router = express.Router();


//@route   GET api/posts/test
//@desc    Tests posts routes
//@acess   Public



router.get('/test', (req,res) => res.json({message:"User Works"}));

module.exports = router;