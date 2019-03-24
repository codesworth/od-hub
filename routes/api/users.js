
const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

//Load UserModel
const User = require('../../models/User');


//@route   GET api/posts/test
//@desc    Tests posts routes
//@acess   Public



router.get('/test', (req,res) => res.json({message:"User Works"}));


//@route   GET api/users/register
//@desc    Register Users
//@acess   Public

router.post('/register',(request,response) => {
    const {email,name,password} = request.body;
    User.findOne({email:email}).then(user =>{
        if (user){
            return response.status(400).json({email:'Email Already Exists'});
        }else{
            const avatar = gravatar.url(email,{
                s: '200', //size
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name:name,
                email:email,
                password:password,
                avatar
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if (err)throw err
                    newUser.password = hash
                    newUser.save()
                    .then(user => {response.json(user)})
                    .catch(err => console.log(err));
                    
                })
            })
        }
    });
});


//@route   GET api/users/login
//@desc    Login Users
//@acess   Public

router.post('/login', (request,response) => {
    const {email, password} = request.body;

    //FInd user

    User.findOne({email}).then(user => {
        if (!user){
            return response.status(404).json({email:"User Not Found"})
        }
        //Checsk Password
        bcrypt.compare(password,user.password).then(isMatch => {
            if (isMatch){
                //User Matched
                const payload = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar
                } // Create JWT Paylod
                //Sign Token
                jwt.sign(payload,
                     keys.secretOrKey, 
                     {expiresIn: 7200},
                      (error, token) => {
                        response.json({
                            success: true,
                            token: 'Bearer ' + token
                        })
                });
            }else{
                return response.status(400).json({password:'Password Incorrect'});
            }
        })
    })
});

module.exports = router;