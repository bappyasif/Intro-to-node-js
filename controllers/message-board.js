let async = require("async");

let User = require("../model/user");

const { body } = require("express-validator");

let messageBoardGetReq = (req, res, next) => {
    // console.log("here!!", req)
    res.render("msg-board", {
        title: "Message Board",
        // createMsg: req.user.member
        createMsg: true
    });
}

let messageBoardCreateNewGetReq = (req, res, next) => {
    res.render("new-msg", {
        title: "Create A New Message"
    })
}

let messageBoardCreateNewPostReq = [
    body("msg-title", "Title can not be left empty")
    .trim().isLength({min: 1}).escape(),
    body("msg-body", "Body can not be left empty")
    .trim().isLength({min: 1}).escape(),
    (req, res, next) => {
        // console.log(req, "<><>");
        
        async.parallel(
            {
                user(cb) {
                    User.findById(req.user._id).exec(cb)
                }
            },

            (err, result) => {
                if(err) return next(err);

                let message = {
                    title: req.body["msg-title"],
                    body: req.body["msg-body"]
                }

                result.user.messages.push(message)

                console.log(result, "<<>>", message, result.user.messages);

                User.findByIdAndUpdate(result.user._id, result.user, {}, err => {
                    if(err) return next(err);

                    // successfull update
                    res.send("update successfull")
                } )
            }
        )
        
        // User.findByIdAndUpdate(req.user._id)
        // res.send("test test")
    }
]

// let messageBoardGetReqForCreatingNewMessage = (req, res, next) => {
//     // console.log("here!!")
//     res.render("msg-board", {
//         title: "Message Board",
//         createMsg: true
//     });
// }

let logOutGetReq = (req, res, next) => {
    req.logout()
    res.redirect("/")
}

module.exports = {
    messageBoardGetReq,
    logOutGetReq,
    // messageBoardGetReqForCreatingNewMessage
    messageBoardCreateNewGetReq,
    messageBoardCreateNewPostReq
}