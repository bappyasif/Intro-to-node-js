const getAllPosts = (req, res, next) => {
    res.send("all posts")
}

const getSoloPost = (req, res, next) => {
    res.send("solo post")
}

const createNewPost = (req, res, next) => {
    res.send("create post")
}

const updateSoloPost = (req, res, next) => {
    res.send("update post")
}

const deleteSoloPost = (req, res, next) => {
    res.send("delete post")
}

module.exports = {
    getAllPosts,
    getSoloPost,
    createNewPost,
    updateSoloPost,
    deleteSoloPost
}