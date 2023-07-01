const { v4: uuidv4 } = require('uuid');
const session = require('../models/session');

const authenticateStudent = (req, res) => {
    const { id, password } = req.body
    console.log(req.body, id, password, uuidv4())
    const newSession = new session({
        token: uuidv4(),
        userId: id
    })

    saveDataIntoSessionAndReturnUserToken(newSession, res)
}

const authenticateDean = (req, res) => res.status(200).json({ msg: "authenticate dean" })

const authenticateUser = (req, res) => {
    const { id, password } = req.body
    console.log(req.body, id, password, uuidv4())
    const newSession = new session({
        token: uuidv4(),
        userId: id
    })

    saveDataIntoSessionAndReturnUserToken(newSession)
}

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

module.exports = {
    authenticateDean,
    authenticateStudent,
    authenticateUser
}