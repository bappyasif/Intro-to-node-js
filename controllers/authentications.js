const { v4: uuidv4 } = require('uuid');
const session = require('../models/session');
const student = require('../models/student');
const dean = require('../models/dean');

const authenticateStudent = (req, res) => {
    const { id, password } = req.body

    const newStudent = new student({
        id: id,
        password: password
    })

    session.findOne({ userId: id, type: "student" })
        .then(foundStudent => {
            if (foundStudent?._id) {
                console.log("returning student", id);
                getTokenAndReturn(foundStudent.token, res)
            } else {
                newStudent.save().then(() => {
                    console.log("new student is saved")
                    commonAuthFunctionality(req, res, "student")
                }).catch(err => console.log("student save encountered error", err.message))
            }
        })
}

const getTokenAndReturn = (token, res) => {
    if (token) {
        return res.status(200).json({ msg: "user is authenticated successfully", token: token })
    } else {
        return res.status(402).json({ msg: "token is not found!!" })
    }
}

const authenticateDean = (req, res) => {
    // res.status(200).json({ msg: "authenticate dean" })
    const { id, password } = req.body;

    const newDean = new dean({
        id: id,
        password: password,
        slots: [{ free: true, day: "thursday", slot: "10am - 11am" }, { free: true, day: "friday", slot: "10am - 11am" }]
    })

    session.findOne({ userId: id, type: "dean" }).then(foundDean => {
        if (foundDean?._id) {
            console.log("returning dean", id);
            getTokenAndReturn(foundDean.token, res)
        } else {
            newDean.save().then(() => {
                console.log("new dean is saved")
                commonAuthFunctionality(req, res, "dean")
            }).catch(err => {
                console.log("dean save encountered error", err.message)
                res.status(400).json({ msg: "save failed", error: err.message })
            })
        }
    })
}

// const authenticateUser = (req, res) => {
//     const { id, password } = req.body
//     console.log(req.body, id, password, uuidv4())

//     const newSession = new session({
//         token: uuidv4(),
//         userId: id
//     })

//     saveDataIntoSessionAndReturnUserToken(newSession)
// }

const saveDataIntoSessionAndReturnUserToken = (newSession, res) => {
    newSession
        .save()
        .then((data) => {
            console.log("session saved in db")
            return res.status(200).json({ msg: "user is authenticated successfully", token: data.token })
        }).catch(err => {
            console.log("error occured while saving", err?.message)
            return res.status(501).json({ msg: "internal error" })
        })
}

const commonAuthFunctionality = (req, res, type) => {
    const { id } = req.body
    console.log(req.body, id, uuidv4())

    const newSession = new session({
        token: uuidv4(),
        userId: id,
        type: type
    })

    saveDataIntoSessionAndReturnUserToken(newSession, res)
}

module.exports = {
    authenticateDean,
    authenticateStudent,
    // authenticateUser
}