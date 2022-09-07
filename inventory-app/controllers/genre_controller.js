let Genre = require("../models/music_genre");

let Album = require("../models/music_album");

let async = require("async");

let {body, validationResult} = require("express-validator")

let genres_list = (req, res, next) => {
    async.parallel(
        {
            genres(cb) {
                // passing in empty object means match everything
                Genre.find({}).exec(cb)
            },

            async genres_albums(cb) {
                let genresPromises = Album.find({})
                .then(albums => {
                    let promises = albums?.flatMap(album => album?.genre.map(id => Genre.findById(id)))
                    return Promise.all(promises)
                }).catch(err => next(err))

                return genresPromises.then(genres => {
                    let albumsGenreCount = {"R&B": 0, "Rock": 0}
                    genres?.forEach(genre => albumsGenreCount[genre.name] = albumsGenreCount[genre.name] == null ? 0 : albumsGenreCount[genre.name] != null ? albumsGenreCount[genre.name] + 1 : 1)
                    // console.log(albumsGenreCount, "<<albums>>")
                    return albumsGenreCount
                })
            }
        },

        (err, results) => {
            if(err) return next(err)

            // if there is no album found in any of thes genres then simply add a "0" to them for smoother view in ejs
            let keys = Object.keys(results.genres_albums)
            results.genres?.forEach(genre => {
                if(!keys.includes(genre.name)) {
                    results.genres_albums[genre.name] = 0;
                }
            })

            // console.log(results, "<<?>?><><>")

            res.render("all-genres", {
                title: "List Of All Genres",
                genres: results.genres,
                genres_albums: results.genres_albums
            })
        }
    )
}


let genre_detail = (req, res, next) => {
    async.parallel(
        {
            genre(cb) {
                Genre.findById(req.params.id).exec(cb)
            },

            async albums(cb) {
                // return Album.find().populate("name").populate("artist")
                return Album.find()
                .then((albms) => {
                    let count = 0;
                    let g_albums = []
                    
                    albms?.forEach(item => {
                        item?.genre.forEach(id => {
                            count = id == req.params.id ? count + 1 : count
                            id == req.params.id ? g_albums.push({name: item.name, id: item._id, artist: item.artist._id}) : null
                        })
                    })

                    return {count, g_albums}
                }).catch(err => next(err))
            }
        },

        (err, results) => {
            if(err) return next(err);

            // console.log(results, "<<results>>");
            // res.send("test test")
            res.render("genre_detail", {
                title: results.genre.name,
                genre: results.genre,
                genre_albums: results.albums.g_albums
            })
        }
    )
}

let genre_create_get = (req, res) => {
    res.render("form_genre_detail", {title: "Cerate Genre", genre: null, errors: null})
}

let genre_create_post = [
    body("name", "Name field must not be empty")
    .trim().isLength({min: 1}).escape(),
    body("name", "Name filed value must be more than or equal to three characters")
    .trim().isLength({min: 3}).escape(),

    (req, res, next) => {
        let errors = validationResult(req)

        let genre = new Genre({name: req.body.name})

        if(!errors.isEmpty()) {
            res.render("form_genre_detail", {
                title: "Cerate Genre", 
                genre: genre, 
                errors: errors.array()
            })
            return
        }

        // successful, so lets show genre detail for this entry
        genre.save(err => {
            if(err) return next(err);

            res.redirect(genre.url)
        })
    }
]

let genre_delete_get = (req, res) => {
    res.send("To Do: genre delete form GET")
}

let genre_delete_post = (req, res) => {
    res.send("To Do: genre delete form POST")
}

let genre_update_get = (req, res) => {
    res.send("To Do: genre update form GET")
}

let genre_update_post = (req, res) => {
    res.send("To Do: genre update form POST")
}

module.exports = {
    genres_list,
    genre_detail,
    genre_create_get,
    genre_create_post,
    genre_delete_get,
    genre_delete_post,
    genre_update_get,
    genre_update_post
}