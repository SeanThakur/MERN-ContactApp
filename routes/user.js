const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.get("/", (req,res) => {
    User.find().sort({date: -1}).then(user => {
        res.json(user);
    });
});

router.post("/register", (req,res) => {
    // if(req.body.name.length === 0)
    // {
    //     res.status(400).json({name: "Name field is required."});
    // }
    // if(req.body.email.length === 0)
    // {
    //     res.status(400).json({email: "email field is required."});
    // }
    // if(req.body.password.length === 0)
    // {
    //     res.status(400).json({password: "password field is required."});
    // }
    if(req.body.password !== req.body.password2)
    {
        res.status(400).json({password: "Password is not Correct"});
    }

    User.findOne({email: req.body.email}).then(user => {
        if(user) {
            res.status(400).json({email: "Email is already taken."})
        }

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        //Hashing and salting the password using bcryptjs
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) {
            return err;
          }
          newUser.password = hash;
          newUser.save().then((user) => {
            res.json(user);
          }).catch((err) => {
            console.log(err);
          });
        });
    });

    });
});

router.post("/login",(req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    // if(email.length === 0)
    // {
    //     res.status(400).json({email: "email field is required."});
    // }
    // if(password.length === 0)
    // {
    //     res.status(400).json({password: "password field is required."});
    // }

    User.findOne({email: email}).then(user => {

        if(!user) {
            res.status(400).json({user: "No user found."});
        }

        bcrypt.compare(password, user.password).then(ismatched => {
            if(ismatched)
            {

                const payload = {
                    id : user.id,
                    name : user.name,
                    email : user.email,
                }

                jwt.sign(payload, "secret", {
                    expiresIn: 3600
                }, (err,token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                });

            } else {
                res.status(400).json({password: "Password not found."})
            }
        })

    });
});

router.get("/current", passport.authenticate('jwt', {session: false}) , (req,res) => {
    res.json(req.user);
});

module.exports = router;