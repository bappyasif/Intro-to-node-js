const { v4: uuidv4 } = require('uuid');
const student = require('../models/student');
const dean = require('../models/dean');

const authenticateStudent = (req, res) => {
    const { id, password } = req.body

    const newStudent = new student({
        id: id,
        password: password
    })

    extractOrCreateUser(id, password, false, newStudent, res)
}

const extractOrCreateUser = (id, password, isDean, data, res) => {
    const collection = isDean ? dean : student
    
    collection
        .findOne({ id: id, password: password })
        .then(foundUser => {
            if (foundUser?._id) {
                console.log("returning user!!", id, foundUser.token);
                getTokenAndReturn(foundUser.token, res)
            } else {
                data.token = uuidv4();

                saveDataAndReturnUserToken(data, res)
            }
        }).catch(err => console.log("something's wrong!!", err.message))
}

const getTokenAndReturn = (token, res) => {
    if (token) {
        return res.status(200).json({ msg: "user is authenticated successfully", token: token })
    } else {
        return res.status(402).json({ msg: "token is not found!!" })
    }
}

const authenticateDean = (req, res) => {
    const { id, password } = req.body;

    const newDean = new dean({
        id: id,
        password: password,
        slots: [{ free: true, day: "thursday", slot: "10am - 11am" }, { free: true, day: "friday", slot: "10am - 11am" }]
    })

    extractOrCreateUser(id, password, true, newDean, res)
}

const saveDataAndReturnUserToken = (newUser, res) => {
    newUser
        .save()
        .then((data) => {
            console.log("new user is saved in db")
            return res.status(200).json({ msg: "user is authenticated successfully", token: data.token })
        }).catch(err => {
            console.log("error occured while saving", err?.message)
            return res.status(501).json({ msg: "internal error" })
        })
}

module.exports = {
    authenticateDean,
    authenticateStudent,
}