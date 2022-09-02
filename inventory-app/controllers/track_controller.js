let Track = require("../models/music_track");

let async =  require("async");

let tracks_list = (req, res, next) => {
    async.parallel(
        {
            tracks(cb) {
                Track.find({})
                // when you have reference in model and yu need to acces them we'll have to use populate to generates those info as well
                .populate("album")
                .exec(cb)
            }
        },

        (err, results) => {
            if(err) return next(err);
            // console.log(results, "<<results>>");
            res.render("all-tracks", {
                title: "List Of All Tracks",
                tracks: results.tracks
            })
        }
    )
}

// let tracks_list = (req, res, next) => {
//     Track.find()
//     .then(results => {
//         console.log(results, "<<results>>");
//         res.render("all-tracks", {
//             title: "List Of All Tracks",
//             tracks: results
//         })
//     }).catch(err => next(err))
// }

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