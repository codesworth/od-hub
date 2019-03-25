
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const Post  = require('../../models/Post');
const Profile = require('../../models/Profile');

const validatePostInput = require('../../validation/post');

router.get('/test', (req,res) => res.json({message:"Post Works"}));

//@route   GET api/post
//@desc    Get post
//@acess   Public

router.get('/', (request, response) => {
    Post.find().sort({date: -1}).then(posts => {
        response.json(posts);
    }).catch(err =>{
        response.status(404).json({message:'No Post Founs with ID: '+request.params.id})
    })
});


//@route   GET api/posts/:id
//@desc    Get post by id
//@acess   Public

router.get('/:id', (request, response) => {
    Post.findById(request.params.id).then(post => {
        if (!post){
            return response.status(404).json({error:'No Post with ID'});
        }
        response.json(post);
    }).catch(err =>{
        response.status(404).json({message:'No Post Founs with ID: '+request.params.id})
    })
});



//@route   POST api/post
//@desc    Create Post
//@acess   Private


router.post('/',passport.authenticate('jwt',{session:false}), (request,response) => {

    const {errors,isValid} = validatePostInput(request.body);

    if (!isValid){
        return response.status(400).json(errors);
    }

    const {text,name,avatar} = request.body;
    const post  = new Post({
        text,name,avatar,user:request.user.id
    });

    post.save().then(post => {
        response.json(post);
    })

});


//@route   DELETE api/posts/:id
//@desc    Get post by id
//@acess   Private

router.delete('/:id', passport.authenticate('jwt',{session:false}), (request,response)=> {

    Profile .findOne({user: request.user.id}).then(profile => {
        Post.findById(request.params.id).then(post => {
            if (post.user.toString() !== request.user.id){
                return response.status(401).json({error:'Not Authorized'})
            }
            post.remove().then(() => {
                response.json({success:'true'});
            })
        }).catch(err => response.status(404).json({error:'Post not Found'}))
    })

})

module.exports = router;