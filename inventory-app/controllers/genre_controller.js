let genres_list = (req, res) => {
    res.send("To Do: genres list")
}

let genre_detail = (req, res) => {
    res.send("To Do: genre detail")
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