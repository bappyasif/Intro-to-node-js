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

const createNewPost = (req, res, next) => {
    res.send("create post")
}

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