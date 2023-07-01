const dean = require("../models/dean")

const getAllDeansFreeSlots = (req, res) => {
    dean.find({}).then((data) => {
        if(data.length) {
            return res.status(200).json({msg: "all free slots from every dean"})
        } else {
            return res.status(200).json({msg: "No free slots found"})
        }
    })
    // res.status(200).json({msg: "free slots from dean"})
}

const getSpecificDeanFreeSlots = (req, res) => {
    checkIfDeanExists(res, "bees")
    // res.status(200).json({msg: "free slots from dean"})
}

const checkIfDeanExists = (res) => {
    dean.find({}).then((data) => {
        if(data.length) {
            return res.status(200).json({msg: "all free slots from every dean"})
        } else {
            return res.status(200).json({msg: "No free slots found"})
        }
    })
}

module.exports = {
    getAllDeansFreeSlots,
    getSpecificDeanFreeSlots
}