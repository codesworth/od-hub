const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load validation

const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education');

//Load Profile model
const Profile = require('../../models/Profile');

//LoaD USER 

const User = require('../../models/User');

//@route   GET api/profile/test
//@desc    Tests Profile routes
//@acess   Public
router.get('/test', (request, response) => {
    response.json({
        msg: "Profile Test passed"
    });
});


//@route   GET api/profile
//@desc    Get current user ID
//@acess   Private

router.get('/', passport.authenticate('jwt', {
    session: false
}), (request, response) => {
    const errors = {}
    Profile.findOne({
        user: request.user.id
    }).then(profile => {
        if (!profile) {
            errors.noprofile = "There is no profile for this user"
            return response.status(404).send(errors)
        }

        response.status(200).json(profile);
    }).catch(x => {
        response.status(x);
    })
});

//@route   POST api/profile/all
//@desc    Get All Profile
//@acess   Public

router.get('/all', (request,response) => {
    const errors = {};
    Profile.find().populate('user',['name','avatar'])
    .then(profiles => {
        if (!profiles){
            errors.noprofile = "There are no profiles"
            return response.status(404).json(errors);
        }
        response.json(profiles);
    }).catch(err => response.json({profile:'No profiles Found'}));
});




//@route   POST api/profile/handle/:handle
//@desc    Get Profile By handle
//@acess   Public

router.get('/handle/:handle', (request,response) => {

    const errors = {};
    Profile.findOne({handle:request.params.handle}).populate('user',['name','avatar'])
    .then(profile => {
        if (!profile){
            errors.noprofile = "There is no profile for this user";
            return response.status(400).json(errors);
        }
        response.json(profile);
    }).catch(err => response.status(404).json(err));
});


//@route   POST api/profile/user/:user_id
//@desc    Get Profile By UserID
//@acess   Public

router.get('/user/:user_id', (request,response) => {

    const errors = {};
    Profile.findOne({user:request.params.user_id}).populate('user',['name','avatar'])
    .then(profile => {
        if (!profile){
            errors.noprofile = "There is no profile for this user";
            return response.status(400).json(errors);
        }
        response.json(profile);
    }).catch(err => response.status(404).json({profile:'There is no profile for this user'}));
});


//@route   GET api/profile
//@desc    Get current user ID
//@acess   Private

router.post('/', passport.authenticate('jwt', {
    session: false
}), (request, response) => {
    const {errors,isvalid} = validateProfileInput(request.body);

    if (!isvalid){
        //Return any errors with status 400
        return response.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = request.user.id;
    if (request.body.handle) profileFields.handle = request.body.handle;
    if (request.body.company) profileFields.company = request.body.company;
    if (request.body.website) profileFields.website = request.body.website;
    if (request.body.location) profileFields.location = request.body.location;
    if (request.body.bio) profileFields.bio = request.body.bio;
    if (request.body.status) profileFields.status = request.body.status;
    if (request.body.githubusername) profileFields.githubusername = request.body.githubusername;

    //SPLIT INTO ARRAYS
    if (typeof request.body.skills !== 'undefined') {
        profileFields.skills = request.body.skills.split(',');
    }

    profileFields.social = {};

    if (request.body.youtube) profileFields.social.youtube = request.body.youtube;
    if (request.body.twitter) profileFields.social.twitter = request.body.twitter;
    if (request.body.linkedin) profileFields.social.linkedin = request.body.linkedin;
    if (request.body.facebook) profileFields.social.facebook = request.body.facebook;
    if (request.body.instagram) profileFields.social.instagram = request.body.instagram;

    Profile.findOne({
        user: request.user.id
    }).then(profile => {
        if (profile) {
            //Update
            Profile.findOneAndUpdate({
                user: request.user.id
            }, {
                $set: profileFields
            }, {
                new: true
            }).then(profile => {
                response.json(profile);
            })
        } else {
            //Create
            //Check if handle exists
            Profile.findOne({
                handle: profileFields.handle
            }).populate('user',['name','avatar']).then(profile => {
                if (profile) {
                    errors.handle = "Handle Already exists"
                    response.status(400).json(errors)
                }

                //Save Profirl
                new Profile(profileFields).save().then(profile => {
                    response.status(200).json(profile);
                })
            })
        }
    })
});


//@route   POSt api/profile/experience
//@desc    Add an Experience
//@acess   Private

router.post('/experience',passport.authenticate('jwt',{session:false}), (request,response) =>{

    const {errors,isValid} = validateExperienceInput(request.body);

    if (!isValid){
        
        //Return any errors with status 400
        return response.status(400).json({error:"Unrecoverable",errors});
    }
    Profile.findOne({user:request.user.id})
    .then( profile => {
        if (!profile){
            response.json({Error:"No Profile"})
        }
        const newExp = {
            title: request.body.title,
            company:request.body.company,
            location:request.body.location,
            from: request.body.from,
            to: request.body.to,
            current: request.body.current,
            description:request.body.description
        }

        //Add to experiemce Array
        profile.experience.push(newExp);

        profile.save()
        .then(newprofile => {
            response.json(newprofile);
        }).catch(err => response.json(err))
    }).catch(err => response.json({Error:"Error occurred" + err}));
});

//@route   POSt api/profile/experience
//@desc    Add an Experience
//@acess   Private

router.post('/education',passport.authenticate('jwt',{session:false}), (request,response) =>{

    const {errors,isValid} = validateEducationInput(request.body);

    if (!isValid){
        
        //Return any errors with status 400
        return response.status(400).json({error:"Unrecoverable",errors});
    }
    Profile.findOne({user:request.user.id})
    .then( profile => {
        if (!profile){
            response.json({Error:"No Profile"})
        }
        const newEdu = {
            school: request.body.school,
            degree:request.body.degree,
            fieldofstudy:request.body.fieldofstudy,
            from: request.body.from,
            to: request.body.to,
            current: request.body.current,
            description:request.body.description
        }

        //Add to experiemce Array
        profile.education.push(newEdu);

        profile.save()
        .then(newprofile => {
            response.json(newprofile);
        }).catch(err => response.json(err))
    }).catch(err => response.json({Error:"Error occurred" + err}));
});



//@route   DELETE api/profile/experience/:exp_id
//@desc    Delete an Experience
//@acess   Private

router.delete('/experience/:exp_id',passport.authenticate('jwt',{session:false}), (request,response) =>{

    
    Profile.findOne({user:request.user.id})
    .then( profile => {
        if (!profile){
            response.json({Error:"No Profile"})
        }
        //Get Remove Index
        const removeIndex = profile.experience
        .map( item => item.id)
        .indexOf(request.params.exp_id)

        //Splice out of Array
        profile.experience.splice(removeIndex,1);

        //Svae
        profile.save().then(profile => {
            response.json(profile);
        })
    }).catch(err => response.json({Error:"Error occurred" + err}));
});


//@route   DELETE api/profile/education/:edu_id
//@desc    Delete an An education
//@acess   Private

router.delete('/education/:edu_id',passport.authenticate('jwt',{session:false}), (request,response) =>{

    
    Profile.findOne({user:request.user.id})
    .then( profile => {
        if (!profile){
            response.json({Error:"No Profile"})
        }
        //Get Remove Index
        const removeIndex = profile.education
        .map( item => item.id)
        .indexOf(request.params.edu_id)

        //Splice out of Array
        profile.education.splice(removeIndex,1);

        //Svae
        profile.save().then(profile => {
            response.json(profile);
        })
    }).catch(err => response.json({Error:"Error occurred" + err}));
});


//@route   DELETE api/profile/
//@desc    Delete an A User and Profile
//@acess   Private


router.delete('/',passport.authenticate('jwt',{session:false}), (request,response) =>{

    Profile.findOneAndRemove({user:request.user.id})
    .then(profile => {
        User.findOneAndRemove({ _id: request.user.id}).then( () => response.json({sucess:true}));
    })
});

module.exports = router;