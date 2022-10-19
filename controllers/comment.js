const getAllComments = (req, res, next) => {
    res.send("all comments")
}

const getSoloComment = (req, res, next) => {
    res.send("solo comment")
}

const deleteSoloComment = (req, res, next) => {
    res.send("delete comment")
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