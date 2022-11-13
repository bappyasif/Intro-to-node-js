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
                let dynamicKey = Object.keys(req.body)[0]
                let dynamicValue = Object.values(req.body)[0]

                // checking if friends related values are already exists or not
                // if so then we'll remove it, representing Undo action from client "connect" routes

                let chkExists = currentUser[dynamicKey].includes(dynamicValue)

                if(Object.keys(req.body)[0] !== "topics") {
                    if(chkExists) {
                        let filtered = currentUser[dynamicKey].filter(val => val !== dynamicValue)
                        currentUser[dynamicKey] = filtered;
                        // console.log(filtered, "filtered!!")
                    } else {
                        currentUser[dynamicKey].push(dynamicValue)
                    }
                    // currentUser[dynamicKey].push(dynamicValue)
                } else {
                    currentUser.topics = req.body.topics; 
                }

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