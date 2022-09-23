let isAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        next()
    } else {
        res.status(401).json({msg: "not authorized to access this resource"})
    }
}

let isAdmin = (req, res, next) => {
    if(req.user.admin) {
        next();
    } else {
        res.status(401).json({msg: "you are not an admin to access this resource"})
    }
}

module.exports = {
    isAuth,
    isAdmin
}