const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//  User model included
const User = require('../../models/User');
const keys = require('../../config/keys');



// @route:  /api/users/test 
// Desc:   Test users get
// Access: Public  

router.get('/test', (req, res) => {
    res.json({
        Router: 'users'
    });
});


// @route: /api/users/register
// Desc:   Registered new user 
// Access: Public  

router.post('/register', (req, res) => {

    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                res.status(404).json({
                    Email: 'Email Already Exist'
                })
            } else {

                const avatar = gravatar.url(req.body.email, {
                    s: 200,
                    r: 'pg',
                    d: 'mm'
                })

                const NewUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: avatar,

                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) {
                            console.log(err)
                        }
                        NewUser.password = hash;
                        NewUser.save().then(user => {
                            res.json(user);
                        }).catch(err => {
                            console.log(err)
                        });

                    })


                })




            }
        })

});

// @route: /api/users/login
// Desc:   Login user 
// Access: Public  

router.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        email
    }).then(user => {

        //check the user available or not
        if (!user) {
            return res.status(404).json({
                email: "User Not Found"
            });
        }

        // compare given password with password in database using bcrypt

        bcrypt.compare(password, user.password).then(isMatch => {

            // checking password is match 
            if (isMatch) {

                // Password is match user login success and generate token 

                const payload = {
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar
                }

                jwt.sign(payload,
                    keys.secretOrkey, {
                        expiresIn: 3600
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    });



            } else {
                return res.status(400).json({
                    password: "Invalid Password"
                });
            }
        });
    });


});

module.exports = router;