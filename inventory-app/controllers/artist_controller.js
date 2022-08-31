// let Artist = require("../models/music_artist");

let artists_list = (req, res) => {
    res.send("To Do: artists list")
}

let artist_detail = (req, res) => {
    res.send("To Do: artist detail")
}

let artist_create_get = (req, res) => {
    res.send("To Do: artist create form GET")
}

let artist_create_post = (req, res) => {
    res.send("To Do: artist create form POST")
}

let artist_delete_get = (req, res) => {
    res.send("To Do: artist delete form GET")
}

let artist_delete_post = (req, res) => {
    res.send("To Do: artist delete form POST")
}

let artist_update_get = (req, res) => {
    res.send("To Do: artist update form GET")
}

let artist_update_post = (req, res) => {
    res.send("To Do: artist update form POST")
}

module.exports = {
    artists_list,
    artist_detail,
    artist_create_get,
    artist_create_post,
    artist_delete_get,
    artist_delete_post,
    artist_update_get,
    artist_update_post
}