let Track = require("../models/music_track");

let Genre = require("../models/music_genre");

let Album = require("../models/music_album");

let async =  require("async");

let {body, validationResult} = require("express-validator");

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

let track_detail = (req, res, next) => {
    async.parallel(
        {
            track(cb) {
                Track.findById(req.params.id)
                .populate("genre")
                .populate("album").exec(cb)
            }
        },

        (err, results) => {
            if(err) return next(err);

            // console.log(results, "<<results>>")

            res.render("track_detail", {
                title: "Track Detail",
                track: results.track
            })
        }
    )
}

let track_create_get = (req, res, next) => {
    async.parallel(
        {
            genres(cb) {
                Genre.find(cb)
            },

            albums(cb) {
                Album.find(cb)
            }
        },

        (err, results) => {
            if(err) return next(err);

            // console.log(results, "<RESUTLS>")

            res.render("form_track_detail", {
                title: "Create Track",
                albums: results.albums,
                genres: results.genres,
                errors: null,
                track: null
            })
        }
    )
}

let track_create_post = [
    // making sure genre is an array no matter what, so that it doesnt violate schema
    (req, res, next) => {
        if(!Array.isArray(req.body.genre)) {
            req.body.genre = typeof req.body.genre === undefined ? [] : [req.body.genre]
        }

        next()
    },

    // sanitizing and validating data
    body("name", "Track Name must not be empty")
    .trim().isLength({min: 1}).escape(),
    body("album", "Album Name must not be empty")
    .trim().isLength({min: 1}).escape(),
    body("status", "Track Status must not be empty")
    .trim().isLength({min: 1}).escape(),
    body("genre.*").escape(),


    (req, res, next) => {
        let errors = validationResult(req);

        let track = new Track({
            name: req.body.name,
            album: req.body.album,
            genre: req.body.genre,
            status: req.body.status
        })

        if(!errors.isEmpty()) {
            // has found error, now we'll rerender form with already filled fields and log errors on page
            async.parallel(
                {
                    genres(cb) {
                        Genre.find(cb)
                    },
                    
                    albums(cb) {
                        Album.find(cb)
                    }
                },
    
                (err, results) => {
                    if(err) return next(err);
    
                    // Mark our selected genres as checked
                    // console.log(results.genres, "!!results.genres!!")
                    // for(let genre of results.genres) {
                    //     if(track.genre.includes(genre._id)) {
                    //         // Current genre is selected. Set "checked" flag
                    //         genre.checked = true
                    //     }
                    // }  
                    results.genres.forEach(genre => {
                        if(track?.genre?.includes(genre._id)) {
                            genre.checked = true
                        }
                    })

                    results.albums.forEach(album => {
                        console.log(track.album, track.album.toString() === album._id.toString(), album._id)
                        if(track.album.toString() === album._id.toString()) {
                            album.selected = true
                        }
                    })

                    // render form with previously form values
                    res.render("form_track_detail", {
                        title: "Track Form",
                        track: track,
                        albums: results.albums,
                        genres: results.genres,
                        errors: errors.array()
                    })
                }
            )

            return
        }

        track.save(err => {
            if(err) return next(err);

            // succesfull so lets render track detail view
            res.redirect(track.url)
        })
    }
]

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