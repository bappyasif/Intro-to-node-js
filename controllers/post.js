const { body, validationResult } = require("express-validator");
const Post = require("../models/post");

const getAllPosts = (req, res, next) => {
    Post.find({})
        .then(results => {
            res.status(200).json({success: true, data: results})
        }).catch(err => next(err))
}

const getSoloPost = (req, res, next) => {
    Post.findById({_id: req.params.postId})
        .then(result => {
            res.status(200).json({success: true, data: result})
        }).catch(err => next(err))
}

const createNewPost = [
    body("post", "post can not be left empty")
    .trim().isLength({min: 1}),
    body("post", "post needs to be at least 4 characters long")
    .trim().isLength({min: 4}),

    (req, res, next) => {
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(402).json({success: false, errors: errors.array()})
        }
        
        // data is sanitized and validated for to be saved in databse
        let newPost = new Post({
            body: req.body.post,
            userId: req.body.userId,
            created: new Date().toISOString()
        })

        newPost.save((err, post) => {
            if(err) return next(err)

            // save successfull, so lets response bvack to user about this
            res.status(200).json({success: true, post: post})
        })
    }
]

const updateSoloPost = (req, res, next) => {
    res.send("update post")
}

const deleteSoloPost = (req, res, next) => {
    Post.findByIdAndDelete({_id: req.params.postId})
        .then(() => {
            console.log("post is now delted");
            res.status(200).json({success: true, msg: "post is now deleted"})
        })
        .catch(err => next(err))
}

module.exports = {
    getAllPosts,
    getSoloPost,
    createNewPost,
    updateSoloPost,
    deleteSoloPost
}