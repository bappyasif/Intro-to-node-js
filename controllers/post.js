const { body, validationResult, check } = require("express-validator");
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
    body("body", "post can not be left empty")
    .trim().isLength({min: 1}),
    body("body", "post needs to be at least 4 characters long")
    .trim().isLength({min: 4}),
    body("Image", "image url needs to be a proper url")
    .isURL().optional(),
    // .trim().escape(),
    body("Video", "video url needs to be a proper url")
    .isURL().optional(),
    // .trim().escape(),
    body("Gif", "gif needs to be an array of gif object")
    .isObject().optional(),
    check("Poll", "poll needs to be an array of object")
    .isObject().optional(),
    body("Privacy", "Privacy needs to be a string")
    .trim().isString().escape(),

    (req, res, next) => {
        console.log(req.body, "req.body!!", req.params.userId)

        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(402).json({success: false, errors: errors.array()})
        }
        
        // data is sanitized and validated for to be saved in databse
        let newPost = new Post({
            body: req.body.body,
            userId: req.body.userId,
            created: new Date().toISOString(),
            privacy: req.body.Privacy,
            imageUrl: req.body.Image,
            videoUrl: req.body.Video,
            poll: req.body.Poll,
            gif: req.body.Gif
        })

        newPost.save((err, post) => {
            if(err) return next(err)

            // save successfull, so lets response bvack to user about this
            console.log("post saved!!")
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