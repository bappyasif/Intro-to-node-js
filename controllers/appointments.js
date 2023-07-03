const dean = require("../models/dean")
const schedule = require("../models/schedule")
const session = require("../models/session")
const { checkIfTokenExistsInSessions, extractToken } = require("./schedules")

const studentBookingAnAppointmentWithDean = (req, res) => {
    const { deanId, day, userId } = req.body

    // do we use type in here fro clarity, to see if its from student or dean
    checkIfTokenExistsInSessions(req)
        .then(found => {
            if (found) {
                schedule.findOne({ deanId, studentId: userId })
                    .then(foundAppointment => {
                        // already booked
                        if (foundAppointment?._id) {
                            return res.status(200).json({ msg: "booked appointnent", studentId: userId, deanId, slot: foundAppointment.slot })
                        } else {
                            // new appointment
                            getStudentIdFromSession(req, res).then(userId => {
                                console.log(userId);

                                const slot = [{ day: day, time: "10am - 11am" }]

                                createScedule(userId, deanId, slot)

                                updateDeanFreeSlots(deanId, day)

                                return res.status(200).json({ msg: "booked appointnent", studentId: userId, deanId, slot })
                            })
                        }
                    }).catch(err => console.log("schedule fetching has failed....", err.message))
            } else {
                return res.status(400).json({ msg: "Invalid Token" })
            }
        })
        .catch(err => console.log("something went terribly wrong....", err.message))
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

    checkIfTokenExistsInSessions(req).then(found => {
        if (found) {
            schedule.find({ deanId: userId })
                .then(data => {
                    console.log(data, userId, "!!")
                    if (data?.length) {
                        const appointments = data.map(item => ({ studentId: item.studentId, slot: item.slot }))
                        return res.status(200).json({ msg: "Detail About Booked Slots", appointments: appointments })
                    } else {
                        return res.status(400).json({ msg: "Schedule Data Not Found!!" })
                    }
                })
        } else {
            return res.status(400).json({ msg: "Invalid Token" })
        }
    })
        .catch(err => console.log("something went terribly wrong....", err.message))
}

// const deanCheckingSlotsBookedByStudents = (req, res) => {
//     const { id } = req.body;

//     checkIfTokenExistsInSessions(req).then(found => {
//         if (found) {
//             schedule.findOne({ deanId: id })
//                 .then(data => {
//                     console.log(data, id, "!!")
//                     if (data) {
//                         return res.status(200).json({ msg: "Detail About Booked Slot", appointment: { studentId: data.studentId, slot: data.slot } })
//                     } else {
//                         return res.status(400).json({ msg: "No Schedule Is Found!!" })
//                     }
//                 })
//         } else {
//             return res.status(400).json({ msg: "Invalid Token" })
//         }
//     })
//         .catch(err => console.log("something went terribly wrong....", err.message))
// }

module.exports = {
    studentBookingAnAppointmentWithDean,
    deanCheckingSlotsBookedByStudents
}