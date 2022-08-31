let albums_list = (req, res) => {
    res.send("To Do: albums list")
}

let album_detail = (req, res) => {
    res.send("To Do: album detail")
}

let album_create_get = (req, res) => {
    res.send("To Do: album create form GET")
}

let album_create_post = (req, res) => {
    res.send("To Do: album create form POST")
}

let album_delete_get = (req, res) => {
    res.send("To Do: album delete form GET")
}

let album_delete_post = (req, res) => {
    res.send("To Do: album delete form POST")
}

let album_update_get = (req, res) => {
    res.send("To Do: album update form GET")
}

let album_update_post = (req, res) => {
    res.send("To Do: album update form POST")
}

module.exports = {
    albums_list,
    album_detail,
    album_create_get,
    album_create_post,
    album_delete_get,
    album_delete_post,
    album_update_get,
    album_update_post
}