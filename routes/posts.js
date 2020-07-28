const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const passport = require("passport");
const { update } = require("../models/Post");

router.get("/all",(req,res) => {
    Post.find().sort({date: -1}).populate("user").then(posts => {
        res.json({contacts: posts});
    }).catch(err => {
        res.status(400).json({err});
    });
});

router.get("/phone/:phoneNo", passport.authenticate("jwt", {session: false}), (req,res) => {
    Post.findOne({phoneNo: req.params.phoneNo}).populate("user").then(phone => {
        if(!phone) {
            res.status(404).json({phoneNumber: "Phone User not found"});
        }
        res.json(phone);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.get("/",passport.authenticate("jwt", {session: false}) ,(req,res) => {
    Post.find({user: req.user.id}).sort({date: -1}).populate("user").then(post => {
        res.json({contact: post});
    }).catch(error => {
        res.status(400).json({error});
    });
});

router.get("/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
    Post.findOne({_id: req.params.id}).then(post => {
        res.json(post);
    }).catch(() => {
        res.status(404).json({post: "Post doesn't exists"});
    });
});


router.post("/",  passport.authenticate("jwt", {session: false}) ,(req,res) => {

    if(req.body.title.length === 0)
    {
        res.status(400).json({title: "title is required"});
    }

    if(req.body.body.length === 0)
    {
        res.status(400).json({body: "body is required"});
    }

    const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        phoneNo: req.body.phoneNo,
        phoneType: req.body.phoneType,
        user: req.user.id
    });

    newPost.save().then(post => {
        res.json(post)
    }).catch(() => {
        res.status(400).json({post: "Post not created"})
    });
    
});

router.delete("/:id", passport.authenticate("jwt", {session: false}), (req,res) => {
    Post.findOne({user: req.user.id}).then(loggedIn => {
        if(!loggedIn) 
        {
            res.status(401).json({user: "Not authorized"})
        }
        Post.findByIdAndRemove(req.params.id).then((contactDel) => {
            res.json({contact: contactDel});
        }).catch(err => {
            res.status(401).json({err})
        });
    }).catch(err => {
        res.status(401).json(err)
    });
});

router.delete("/", passport.authenticate("jwt", {session: false}),(req,res) => {
    Post.findOneAndRemove({user: req.user.id}).then(() => {
        User.findOneAndRemove({_id: req.user.id}).then(() => {
            res.json({success : "Success in Deleting the contact and user account."});
        });
    });
});

module.exports = router;