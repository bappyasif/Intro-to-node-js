const { body, check, validationResult } = require("express-validator")

let User = require("../model/user");

let isAdminGetReq = (req, res, next) => {
    res.render("is-admin", {
        title: "Making User An Admin",
        errors: null
    })
}

let isAdminPostReq = [
    body("passcode", "passcode can not be left empty"),
    check("passcode", "passcode needs to be matched with what is expected").exists()
    .custom(val => val.toLowerCase() === "admin"),
    (req, res, next) => {
        // console.log(req.session.passport.user, "<<>>", req.session)
        let errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            res.render("is-admin", {
                title: "Making User An Admin",
                errors: errors.array()
            })
            return
        }

        User.findByIdAndUpdate(req.session.passport.user, {admin: true}, {}, (err, _) => {
            if(err) return next(err);

            // successfully updated
            res.send("test test");
        })
    }
]

module.exports = {
    isAdminGetReq,
    isAdminPostReq
}