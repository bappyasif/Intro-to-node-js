let async = require("async")
let Album = require("../models/music_album");
let Artist = require("../models/music_artist");
let Genre = require("../models/music_genre");
let {body, validationResult} = require("express-validator");
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

let album_create_get = (req, res, next) => {
    async.parallel(
        {
            artists(cb) {
                Artist.find(cb)
            },

            genres(cb) {
                Genre.find(cb)
            }
        },

        (err, results) => {
            if(err) {
                return next(err);
            }

            // console.log(results, "results!!")

            res.render("form_album_detail", {
                title: "Album Form", 
                album: null, 
                genres: results.genres, 
                artists: results.artists,
                errors: null
            })
        }
    )
}

// let album_create_get = (req, res) => {
//     res.render("form_album_detail", {title: "Album Form", album: null, genres: []})
// }

let album_create_post = [
    // console.log(req.body, "here here!!")
    // Convert the genre to an array
    (req, res, next) => {
        if(!Array.isArray(req.body.genre)) {
            req.body.genre = typeof req.body.genre === undefined ? [] : [req.body.genre]
        }
        next();
    },

    // validate and sanitize fields
    body("name", "Name field value must be present")
    .trim().isLength({min: 1}).escape(),
    body("artist", "Artist field value must be present")
    .trim().isLength({min: 1}).escape(),
    body("descr", "Decription field value must be present")
    .trim().isLength({min: 1}).escape(),
    body("price", "Price field value must be present")
    .trim().isLength({min: 1}).escape(),
    body("r_date", "Released Date field value must be present")
    .trim().isLength({min: 1}).escape(),
    body("genre.*").escape(), // using wildcard to sanitize every item below key genre

    // Process request after validation and sanitization
    (req, res, next) => {
        // Extract the validation errors from a request
        let errors = validationResult(req)

        // create an album object from user submitted data
        let album = new Album({
            name: req.body.name,
            artist: req.body.artist,
            genre: req.body.genre,
            released_date: req.body.r_date,
            description: req.body.descr,
            price: req.body.price
        })

        // Extract the validation errors from a request
        if(!errors.isEmpty()) {
            // There are errors
            // Render form again with sanitized values/error messages.
            // Get all artits and genres for form to render
            async.parallel(
                {
                    artists(cb) {
                        Artist.find(cb)
                    },

                    genres(cb) {
                        Genre.find(cb)
                    }
                },

                (err, results) => {
                    if(err) return next(err)

                    // Mark our selected genres as checked
                    for(let genre of results.genres) {
                        if(album.genre.includes(genre._id)) {
                            // Current genre is selected. Set "checked" flag
                            genre.checked = true
                        }
                    }

                    // Mark our selected artist as selected
                    for(let artist of results.artists) {
                        if(album.artist.toString() === artist._id.toString()) {
                            artist.selected = true;
                        }
                    }

                    // render form with previously form values
                    res.render("form_album_detail", {
                        title: "Album Form", 
                        album: album,
                        genres: results.genres, 
                        artists: results.artists,
                        errors: errors.array()
                    })
                }
            )
            return
        }

        // Data from form is valid. Save book
        album.save( err => {
            if(err) return next(err)

            // Successful: redirect to new album record
            res.redirect(album.url)
        })
    }
]

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