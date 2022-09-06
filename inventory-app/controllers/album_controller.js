let async = require("async")
let Album = require("../models/music_album");
let Artist = require("../models/music_artist");
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 * 
 */
let albums_list = (req, res, next) => {
    async.series(
        {
            albums(cb) {
                Album.find({}).populate("name").populate("artist").exec(cb)
            },
        },

        (err, results) => {
            if (err) return next(err);

            res.render("all-albums", {
                title: "All Albums",
                results: results.albums
            })
        }
    )
}

let album_detail = (req, res, next) => {
    async.parallel(
        {
            album(cb) {
                Album.findById(req.params.id)
                .populate("genre")
                .populate("artist")
                .exec(cb)
            }
        },

        (err, results) => {
            if(err) return next(err)

            // console.log(results, "<<results>>")

            res.render("album-detail", {
                title: "Album Detail",
                album: results.album
            })
        }
    )
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

let album_update_get = (req, res, next) => {
    console.log(req.params.id, "here here!!")
    async.parallel(
        {
            album(cb) {
                Album.findById(req.params.id)
                .populate("genre")
                .populate("artist")
                .exec(cb)
            }
        },

        (err, results) => {
            if(err) return next(err);

            // console.log(results, "results!!");

            let genres = [];

            results.album.genre?.forEach(item => genres.push(item.name))

            console.log(genres, "results!!");

            res.render("form_album_detail", {
                title: "Album Detail Form",
                album: results.album,
                genres: genres
            })
        }
    )
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