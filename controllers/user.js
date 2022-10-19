const User = require("../models/user");

const getAllUsers = (req, res, next) => {
    User.find({})
        .then(results => {
            res.status(200).json({success: true, data: results})
        }).catch(err => next(err))
}

const getAnUser = (req, res, next) => {
    User.findById({_id: req.params.userId})
        .then(result => {
            res.status(200).json({success: true, data: result})
        }).catch(err => next(err))
}

const registerUser = (req, res, next) => {
    res.send("register user")
}

const loginUser = (req, res, next) => {
    res.send("login user")
}

const updateUser = (req, res, next) => {
    res.send("update user")
}

const deleteUser = (req, res, next) => {
    User.findByIdAndDelete({_id: req.params.userId})
        .then(err => {
            if(err) return next(err);
            res.status(200).json({success: true, msg: "user has been deleted"})
        }).catch(err => next(err))
}

module.exports = {
    getAllUsers,
    getAnUser, 
    registerUser,
    loginUser,
    updateUser,
    deleteUser
}