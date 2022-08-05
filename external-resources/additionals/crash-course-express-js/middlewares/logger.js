let moment = require("moment")

let logger = (req, res, next) => {
    console.log('logging middleware', `${req.protocol}://${req.get("host")}${req.originalUrl} : ${moment().format()}`)
    next()
}

module.exports = logger