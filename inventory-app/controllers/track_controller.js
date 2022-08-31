let tracks_list = (req, res) => {
    res.send("To Do: tracks list")
}

let track_detail = (req, res) => {
    res.send("To Do: track detail")
}

let track_create_get = (req, res) => {
    res.send("To Do: track create form GET")
}

let track_create_post = (req, res) => {
    res.send("To Do: track create form POST")
}

let track_delete_get = (req, res) => {
    res.send("To Do: track delete form GET")
}

let track_delete_post = (req, res) => {
    res.send("To Do: track delete form POST")
}

let track_update_get = (req, res) => {
    res.send("To Do: track update form GET")
}

let track_update_post = (req, res) => {
    res.send("To Do: track update form POST")
}

module.exports = {
    tracks_list,
    track_detail,
    track_create_get,
    track_create_post,
    track_delete_get,
    track_delete_post,
    track_update_get,
    track_update_post
}