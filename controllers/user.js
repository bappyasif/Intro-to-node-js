const { body, validationResult } = require("express-validator");
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

const updateUser = (req, res, next) => {
    User.findOne({_id: req.params.userId})
        .then(currentUser => {
            if(currentUser) {
                currentUser.topics = req.body.topics;
                // now updating with new user data
                User.findByIdAndUpdate(currentUser._id, currentUser, {})
                .then(() => res.status(200).json({success: true, user: currentUser}))
                .catch(err => next(err));
            }
        }).catch(err => next(err));
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
    updateUser,
    deleteUser
}