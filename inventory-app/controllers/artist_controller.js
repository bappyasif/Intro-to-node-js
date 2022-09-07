let Artist = require("../models/music_artist");

let Album = require("../models/music_album");

let async = require("async");

let {body, validationResult} = require("express-validator");

let artists_list = (req, res, next) => {
    async.parallel(
        {
            artists(cb) {
                Artist.find({}).exec(cb)
            },

            async artist_albums(cb) {
                let artistAlbumsPromises = Album.find({})
                    .then(albums => {
                        // let promises = albums?.flatMap(album => album?.artist.map(id => Artist.findById(id)));
                        let promises = albums?.flatMap(album => Artist.findById(album?.artist._id));
                        return Promise.all(promises);
                    }).catch(err => next(err))

                return artistAlbumsPromises.then(artists => {
                    let countArtistAlbums = {}
                    artists?.forEach(artist => countArtistAlbums[artist.first_name + " " + artist.last_name] = countArtistAlbums[artist.first_name + " " + artist.last_name] != null ? countArtistAlbums[artist.first_name + " " + artist.last_name] + 1 : 1)
                    // console.log(countArtistAlbums, "?>?>")
                    return countArtistAlbums;
                }).catch(err => next(err))

                // return albumsPromises.then(albums => {
                //     console.log(albums, "?>?>")
                //     return albums
                // }).catch(err => next(err))
            }
        },
        (err, results) => {
            if (err) return next(err);

            // makinf sure when no album is found for any artist, we're giving it a value of 0 rather than undefined
            let albumsKeys  = Object.keys(results.artist_albums);
            results.artists?.forEach(artist => {
                if(!albumsKeys.includes(artist.full_name)) {
                    results.artist_albums[artist.full_name] = 0
                }
            })

            // console.log(results, "<<results>>")

            res.render("all-artists", {
                title: "List Of All Artists",
                artists: results.artists,
                artists_albums: results.artist_albums
            })
        }
    )
}

let artist_detail = (req, res, next) => {
    async.parallel(
        {
            artist(cb) {
                Artist.findById(req.params.id).exec(cb)
            },

            async artist_albums() {
                return Album.find().populate("artist")
                .then(albums => {
                    let found_albums = []
                    albums?.forEach(album => {
                        if(album.artist._id == req.params.id) {
                            found_albums.push({album: album.name, id: album._id, price: album.price})
                        }
                    })

                    return found_albums
                })
            }
        },

        (err, results) => {
            if(err) return next(err);

            res.render("artist_detail", {
                title: "Artist Detail",
                artist: results.artist,
                artist_albums: results.artist_albums
            })
        }
    )
}

let artist_create_get = (req, res) => {
    res.render("form_artist_detail", {title: "Create Artist", artist: null, errors: null})
}

let artist_create_post = [
    body("first_name", "First Name field never be left empty")
    .trim().isLength({min: 1}).escape(),
    body("last_name", "Last Name field never be left empty")
    .trim().isLength({min: 1}).escape(),
    body("d_o_b", "Date of Birth field never be left empty")
    .trim().isLength({min: 1}).escape(),

    (req, res, next) => {
        let errors = validationResult(req);

        let artist = new Artist({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            d_o_b: req.body.d_o_b,
            d_o_d: req.body.d_o_d
        })

        if(!errors.isEmpty()) {
            res.render("form_artist_detail", {
                title: "Create Artist", 
                artist: artist, 
                errors: errors.array()
            })
            return
        }

        // successful, so lets show artist detail for this entry
        artist.save(err => {
            if(err) return next(err)

            res.redirect(artist.url)
        })

    }
]

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