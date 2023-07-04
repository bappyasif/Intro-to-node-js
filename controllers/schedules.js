const dean = require("../models/dean")
const session = require("../models/session")

const getAllDeansFreeSlots = (req, res) => {
    dean.find({}).then((data) => {
        const freeSlotsFound = data.map(dean => {
            const slots = dean.slots.filter(item => item.free);
            return { id: dean.id, slots: [...slots] }
        })

        // console.log(freeSlotsFound)
        sendingResponseAfterChecks(freeSlotsFound, res)
    })
}

const getSpecificDeanFreeSlots = (req, res) => {
    const { deanId } = req.params;
    console.log(deanId, "deanID")

    dean.find({ id: deanId }).then((data) => {
        if (data?.length) {
            const freeSlotsFound = data.map(dean => dean.slots.filter(item => item.free))[0]

            // console.log(freeSlotsFound)
            sendingResponseAfterChecks(freeSlotsFound, res)
        } else {
            return res.status(400).json({ msg: "invalid slots" })
        }
    })
}

const sendingResponseAfterChecks = (freeSlotsFound, res) => {

    if (freeSlotsFound.length) {
        return res.status(200).json({ msg: "all found free slots", freeSlots: freeSlotsFound })
    } else {
        return res.status(200).json({ msg: "No free slots found", freeSlots: [] })
    }
}

const extractToken = (req) => {
    const bearerToken = req.headers["authorization"];
    const token = bearerToken.split(" ")[1]
    return token
}

const checkIfTokenExistsInSessions = (req) => {
    const { userId } = req.body;

    token = extractToken(req)

    return session.findOne({ token: token, userId: userId })
        .then(foundSession => {
            if (foundSession) {
                console.log("found")
                return true
            } else {
                console.log("not found")
                return false
            }
        }).catch((err => {
            console.log("error occured", err.message)
        }))
}

module.exports = {
    getAllDeansFreeSlots,
    getSpecificDeanFreeSlots,
    checkIfTokenExistsInSessions,
    extractToken
}