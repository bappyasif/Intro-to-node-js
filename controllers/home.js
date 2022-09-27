let async = require("async");
let User = require("../model/user");

let homePageGetReq = (req, res, next) => {
    console.log(req.session, "req.session", req.sessionID)
    async.parallel(
        {
            users(cb) {
                User.find(cb)
            },

            currentlyLoggedInUser(cb) {
                User.findById(req.session.passport.user).exec(cb)
            }
        },

        (err, results) => {
            if(err) return next(err);

            // console.log(results.currentlyLoggedInUser, "results.currentlyLoggedInUser")

            res.render("home-page", {
                title: "Home Page",
                users: results.users,
                loggedIn: results.currentlyLoggedInUser?.member,
            })
        }
    )
}


// let homePageGetReq = (req, res, next) => {
//     console.log(req.session, "req.session", req.sessionID)
//     User.find()
//     .then(users => {
//         res.render("home-page", {
//             title: "Home Page",
//             users: users,
//             loggedIn: req.session.passport.user, 
//         })
//     }).catch(err => console.log(err))
// }

module.exports = {
    homePageGetReq
}