const dean = require("../models/dean")
const session = require("../models/session")

// do we use "type for token exits check?"
const getAllDeansFreeSlots = (req, res) => {
    checkIfTokenExistsInSessions(req)
        .then(found => {
            if (found) {
                dean.find({}).then((data) => {
                    const freeSlotsFound = data.map(dean => {
                        const slots = dean.slots.filter(item => item.free);
                        return { id: dean.id, slots: [...slots] }
                    })

                    // console.log(freeSlotsFound)
                    sendingResponseAfterChecks(freeSlotsFound, res)
                })
            } else {
                return res.status(400).json({ msg: "Invalid Token" })
            }
        })
        .catch(err => console.log("somethign went terribly wrong....", err.message))

    // res.status(200).json({msg: "free slots from dean"})
}

const getSpecificDeanFreeSlots = (req, res) => {
    // checkIfDeanExists(res, "bees")
    // res.status(200).json({msg: "free slots from dean"})
    const { deanId } = req.params;
    console.log(deanId, "deanID")

    checkIfTokenExistsInSessions(req)
        .then(found => {
            if (found) {
                dean.findOne({ id: deanId }).then((data) => {
                    if (data?.length) {
                        const freeSlotsFound = data.map(dean => dean.slots.filter(item => item.free))[0]

                        // console.log(freeSlotsFound)
                        sendingResponseAfterChecks(freeSlotsFound, res)
                    } else {
                        return res.status(400).json({ msg: "invalid slots" })
                    }
                })
            } else {
                return res.status(400).json({ msg: "Invalid Token" })
            }
        })
        .catch(err => console.log("somethign went terribly wrong....", err.message))
}

// const checkIfDeanExists = (res) => {
//     dean.find({}).then((data) => {
//         if (data.length) {
//             return res.status(200).json({ msg: "all free slots from every dean" })
//         } else {
//             return res.status(200).json({ msg: "No free slots found" })
//         }
//     })
// }

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
    // const bearerToken = req.headers["authorization"];
    // const token = bearerToken.split(" ")[1]
    const { userId } = req.body;

    token = extractToken(req)
    // console.log(token, "token!!")

    // error while s2 dean and s2 student is found in session model

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