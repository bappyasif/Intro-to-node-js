const { extractToken } = require("../middlewares")
const dean = require("../models/dean")
const schedule = require("../models/schedule")
const session = require("../models/session")

const studentBookingAnAppointmentWithDean = (req, res) => {
    const { deanId, day, userId } = req.body

    schedule.findOne({ deanId, studentId: userId })
        .then(foundAppointment => {
            // already booked
            if (foundAppointment?._id) {
                return res.status(200).json({ msg: "booked appointnent", studentId: userId, deanId, slot: foundAppointment.slot })
            } else {
                // new appointment
                getStudentIdFromSession(req, res).then(userId => {
                    // console.log(userId);

                    const slot = [{ day: day, time: "10am - 11am" }]

                    // checking if this slot is already booked by other student or not
                    dean.findOne({ id: deanId }).then(data => {
                        const checkIfSlotFree = data?.slots.find(item => item.day === day).free
                        if (checkIfSlotFree) {
                            createScedule(userId, deanId, slot)

                            updateDeanFreeSlots(deanId, day)

                            return res.status(200).json({ msg: "booked appointnent", studentId: userId, deanId, slot })
                        } else {
                            return res.status(503).json({msg: "slot is booked already, try other slot, thanks :)"})
                        }
                    })
                })
            }
        }).catch(err => console.log("schedule fetching has failed....", err.message))
}

const updateDeanFreeSlots = (deanId, day) => {
    dean.findOne({ id: deanId })
        .then(data => {
            const updatedSlots = data.slots.map(item => item.day === day ? { ...item, free: false } : item)
            // console.log(updatedSlots);
            data.slots = updatedSlots;

            dean.findByIdAndUpdate(data._id, data, {}).then(() => console.log("update completed....")).catch(err => console.log("update operation has failed", err.message))
        }).catch(err => console.log("error occured in update", err.message))
}

const createScedule = (studentId, deanId, slot) => {
    const newSchedule = new schedule({
        deanId,
        studentId,
        slot
    })

    newSchedule.save().then(data => {
        console.log("schedule saved", data._id)
    }).catch(err => console.log("schedule saved has failed", err.message))
}

const getStudentIdFromSession = (req, res) => {
    const token = extractToken(req);
    return session.findOne({ token: token })
        .then(data => {
            if (data.userId) {
                return data.userId
            } else {
                return res.status(400).json({ msg: "unser is not found!!" })
            }
        }).catch(err => {
            console.log("session fetch has failed", err.message)
            return res.status(501).json({ msg: "unser is not found!!", error: err.message })
        })
}

const deanCheckingSlotsBookedByStudents = (req, res) => {
    const { userId } = req.body;

    schedule.find({ deanId: userId })
        .then(data => {
            // console.log(data, userId, "!!")
            if (data?.length) {
                const appointments = data.map(item => ({ studentId: item.studentId, slot: item.slot }))
                return res.status(200).json({ msg: "Detail About Booked Slots", appointments: appointments })
            } else {
                return res.status(400).json({ msg: "Schedule Data Not Found!!" })
            }
        })
}

module.exports = {
    studentBookingAnAppointmentWithDean,
    deanCheckingSlotsBookedByStudents
}