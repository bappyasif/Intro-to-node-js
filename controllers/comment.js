const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment");

const getAllComments = (req, res, next) => {
    Comment.find({})
        .then(results => {
            res.status(200).json({ success: true, data: results })
        }).catch(err => next(err))
}

const getSoloComment = (req, res, next) => {
    Comment.find({ _id: req.params.commentId })
        .then(result => {
            res.status(200).json({ success: true, data: result })
        }).catch(err => next(err))
}

const getAllCommentsFromSinglePost = (req, res, next) => {
    console.log(req.params.postId, "req.params.postId")
    Comment.find({ postId: req.params.postId })
        .then(result => {
            res.status(200).json({ success: true, data: result })
        }).catch(err => next(err))
}

const deleteSoloComment = (req, res, next) => {
    Comment.findByIdAndDelete({ _id: req.params.commentId })
        .then(() => {
            res.status(200).json({ success: true, msg: "comment deleted" })
        }).catch(err => next(err))
}

const updateSoloComment = (req, res, next) => {
    let data = req.body;
    let commentId = req.params.commentId;

    Comment.findOne({_id: commentId})
        .then(currentComment => {
            console.log(currentComment, "!!", data, commentId)
            let setCounts = (countType) => currentComment[countType] = currentComment[countType] ? currentComment[countType] : 1
            
            if(data.Like !== undefined) {
                setCounts("likesCount")
            } 
            if(data.Dislike !== undefined) {
                setCounts("dislikesCount")
            } 
            if(data.Love !== undefined) {
                setCounts("loveCount")
            }

            let findIdx = currentComment?.engaggedUsers.findIndex(item => data.userId === Object.keys(item)[0])

            if(findIdx !== -1) {
                currentComment.engaggedUsers[findIdx] = {[data.userId]: data.userCounts}
            } else {
                currentComment?.engaggedUsers.push({[data.userId]: data.userCounts})
            }

            console.log(currentComment, "currentComment!!")

            Comment.findByIdAndUpdate(currentComment._id, currentComment, {})
                .then((updatedComment) => {
                    console.log("comment updated!!");
                    res.status(200).json({success: true, result: updatedComment})
                })
                .catch(err => next(err))

        }).catch(err=>next(err))
}

const createNewComment = [
    body("text", "comment body can not be left empty")
        .trim().isLength({ min: 1 }),

    (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(402).json({ success: false, errors: errors.array() })
        }

        // ready to be saved into database
        if (req.body.userId) {
            let newComment = new Comment({
                body: req.body.text,
                userId: req.body.userId,
                postId: req.body.postId,
                created: new Date().toISOString()
            })

            newComment.save((err, comment) => {
                if (err) return next(err)
                // successfully added this comment
                console.log("comment saved!!")
                res.status(200).json({ success: true, comment: comment })
            })
        } else {
            return res.status(402).json({ success: false, msg: "user is not authorized" })
        }
    }
]

module.exports = {
    getAllComments,
    getAllCommentsFromSinglePost,
    getSoloComment,
    createNewComment,
    updateSoloComment,
    deleteSoloComment
}