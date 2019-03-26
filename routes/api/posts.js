
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


//@route   POST api/posts/like/:id
//@desc    Like A post
//@acess   Private

router.post('/like/:id', passport.authenticate('jwt',{session:false}), (request,response)=> {

    Profile .findOne({user: request.user.id}).then(profile => {
        Post.findById(request.params.id).then(post => {
    
            if (post.likes.filter(like => like.user.toString() === request.user.id).length > 0){
                return response.status(400).json({alreadyliked:'User Already liked thos Post'})
            }
            post.likes.push({user:request.user.id})
            post.save().then(post => {
                response.json(post);
            })
        }).catch(err => response.status(404).json({error:'Post not Found'}))
    })

});


//@route   POST api/posts/unlike/:id
//@desc    Like A post
//@acess   Private

router.post('/unlike/:id', passport.authenticate('jwt',{session:false}), (request,response)=> {

    Profile .findOne({user: request.user.id}).then(profile => {
        Post.findById(request.params.id).then(post => {
    
            if (post.likes.filter(like => like.user.toString() === request.user.id).length === 0){
                return response.status(400).json({notliked:'You have not liked Post yet'})
            }
            const removeIndex = post.likes.map(item => item.user.toString()).indexOf(request.user.id);
            post.likes.splice(removeIndex,1);
            post.save().then(post => response.json(post));
        }).catch(err => response.status(404).json({error:'Post not Found'}))
    })

});


//@route   POST api/posts/comment/:id
//@desc    Post A comment
//@acess   Private

router.post('/comment/:id', passport.authenticate('jwt',{session:false}), (request,response) => {

    const {errors,isValid} = validatePostInput(request.body);

    if (!isValid){
        return response.status(400).json(errors);
    }

    Post.findById(request.params.id).then(post => {
        const {text,name,avatar,} = request.body;
        const newComment = {
            text,name,avatar,user:request.user.id
        }

        post.comments.unshift(newComment);
        post.save().then(post => response.json(post));
    }).catch(err => response.status(404).json({error:'Post not Found'}));
});


//@route   DLETE api/posts/comment/:id/:comment_id
//@desc    Delete A comment
//@acess   Private

router.delete('/comment/:id/:comment_id', passport.authenticate('jwt',{session:false}), (request,response) => {


    Post.findById(request.params.id).then(post => {
        if (post.comments.filter(comment => comment._id.toString() === request.params.comment_id).length === 0){
            return response.status(404).json({error:'Comment does not exist'});
        }

        const removeIndex = post.comments.map(comment => comment._id.toString()).indexOf(request.params.comment_id);

        post.comments.splice(removeIndex,1);
        post.save().then(post => response.json(post))
        
    }).catch(err => response.status(404).json({error:'Post not Found'}));
});



module.exports = router;