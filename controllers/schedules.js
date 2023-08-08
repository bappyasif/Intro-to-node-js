const dean = require("../models/dean");

const getAllDeansFreeSlots = (req, res) => {
    dean.find().then((data) => {
        const freeSlotsFound = data.map(dean => {
            const slots = dean.slots.filter(item => item.free);
            return { id: dean.id, slots: [...slots] }
        })

        sendingResponseAfterChecks(freeSlotsFound, res)
    })
}

const getSpecificDeanFreeSlots = (req, res) => {
    const { deanId } = req.params;
    // console.log(deanId, "deanID")

    dean.findOne({ id: deanId })
    .then((data) => {
        if (data.slots?.length) {
            const freeSlotsFound = data.slots.map((item => item.free ? item : null)).filter(item => item)

            sendingResponseAfterChecks(freeSlotsFound, res)
        } else {
            return res.status(400).json({ msg: "invalid slots data type" })
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

module.exports = {
    getAllDeansFreeSlots,
    getSpecificDeanFreeSlots,
}