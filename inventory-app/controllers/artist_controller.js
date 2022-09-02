let Artist = require("../models/music_artist");

let Album = require("../models/music_album");

let async = require("async");

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

            console.log(results, "<<results>>")

            res.render("all-artists", {
                title: "List Of All Artists",
                artists: results.artists,
                artists_albums: results.artist_albums
            })
        }
    )
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