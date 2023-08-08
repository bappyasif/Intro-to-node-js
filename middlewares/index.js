const { check, validationResult } = require('express-validator');
const student = require('../models/student');
const dean = require('../models/dean');

// validation rules
const authValidation = [
    check("id", "user name must be of 2 characters long")
    .isLength({ min: 2 }).trim().escape(),
    check("password", "user password must be of 2 characters long")
    .isLength({ min: 2 }).trim().escape(),
]

const throwErrorWhenValidationHasFailed = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: "validation errors", errors: errors.array() })
    } else {
        next()
    }
}

const extractToken = (req) => {
    const bearerToken = req.headers["authorization"];
    const token = bearerToken.split(" ")[1]
    return token
}

const checkIfTokenValidForStudent = (req, res, next) => {
    happensForBothStudentAndUser("student", req, res, next)
}

const checkIfTokenValidForDean = (req, res, next) => {
    happensForBothStudentAndUser("dean", req, res, next)
}

const happensForBothStudentAndUser = (userType, req, res, next) => {
    const { userId } = req.body;

    token = extractToken(req)

    const collection = userType === "student" ? student : dean

    collection.findOne({ token: token, id: userId })
        .then(foundUser => {
            if (foundUser) {
                console.log("found user, valid token")
                next()
            } else {
                return res.status(400).json({ msg: "Invalid Token" })
            }
        }).catch((err => {
            console.log("error occured", err.message)
            return res.status(501).json({ msg: "Invalid Token", error: err.message })
        }))
}

module.exports = {
    authValidation,
    throwErrorWhenValidationHasFailed,
    extractToken,
    checkIfTokenValidForStudent,
    checkIfTokenValidForDean
}

