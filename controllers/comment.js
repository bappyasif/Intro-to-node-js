const Comment = require("../models/comment");

const getAllComments = (req, res, next) => {
    Comment.find({})
        .then(results => {
            res.status(200).json({success: true, data: results})
        }).catch(err => next(err))
}

const getSoloComment = (req, res, next) => {
    Comment.find({_id: req.params.commentId})
        .then(result => {
            res.status(200).json({success: true, data: result})
        }).catch(err => next(err))
}

const deleteSoloComment = (req, res, next) => {
    Comment.findByIdAndDelete({_id: req.params.commentId})
        .then(() => {
            res.status(200).json({success: true, msg: "comment deleted"})
        }).catch(err=>next(err))
}

const updateSoloComment = (req, res, next) => {
    res.send("update comment")
}

const createNewComment = (req, res, next) => {
    res.send("create comment")
}

module.exports = {
    getAllComments, 
    getSoloComment,
    createNewComment,
    updateSoloComment,
    deleteSoloComment
}