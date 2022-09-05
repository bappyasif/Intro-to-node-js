let Genre = require("../models/music_genre");

let Album = require("../models/music_album");

let async = require("async");

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
                    genres?.forEach(genre => albumsGenreCount[genre.name] = albumsGenreCount[genre.name] != null ? albumsGenreCount[genre.name] + 1 : 1)
                    // console.log(albumsGenreCount, "<<albums>>")
                    return albumsGenreCount
                })
            }
        },

        (err, results) => {
            if(err) return next(err)



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
                genre_albums: results.albums.g_albums
            })
        }
    )
}

let genre_create_get = (req, res) => {
    res.send("To Do: genre create form GET")
}

let genre_create_post = (req, res) => {
    res.send("To Do: genre create form POST")
}

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