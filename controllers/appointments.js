const schedule = require("../models/schedule")
const user = require("../models/user")

const studentBookingAnAppointmentWithDean = (req, res) => {
    const { deanId, day, userId } = req.body

    schedule.find()

    schedule.findOne({ deanId, studentId: userId, day: day })
        .then(foundAppointment => {            
            if (foundAppointment?._id) {
                return res.status(200).json({ msg: "booked appointnent", studentId: userId, deanId, slot: foundAppointment.slot })
            } else {
                // new appointment
                const slot = [{ day: day, time: "10am - 11am" }]

                // checking if this slot is already booked by other student or not
                user.findOne({ id: deanId, isDean: true }).then(data => {
                    const checkIfSlotFree = data?.slots.find(item => item.day === day).free
                    if (checkIfSlotFree) {
                        createScedule(userId, deanId, slot, day)

                        updateDeanFreeSlots(deanId, day)

                        return res.status(200).json({ msg: "booked appointnent", studentId: userId, deanId, slot })
                    } else {
                        return res.status(503).json({ msg: "slot is booked already, try other slot, thanks :)" })
                    }
                })
            }
        }).catch(err => console.log("schedule fetching has failed....", err.message))
}

const updateDeanFreeSlots = (deanId, day) => {
    user.findOne({ id: deanId, isDean: true })
        .then(data => {
            const updatedSlots = data.slots.map(item => item.day === day ? { ...item, free: false } : item)
            // console.log(updatedSlots);
            data.slots = updatedSlots;

            user.findByIdAndUpdate(data._id, data, {}).then(() => console.log("update completed....")).catch(err => console.log("update operation has failed", err.message))
        }).catch(err => console.log("error occured in update", err.message))
}

const createScedule = (studentId, deanId, slot, day) => {
    const newSchedule = new schedule({
        deanId,
        studentId,
        slot,
        day
    })

    newSchedule.save().then(data => {
        console.log("schedule saved", data._id)
    }).catch(err => console.log("schedule saved has failed", err.message))
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
                return res.status(400).json({ msg: "Schedule Data Not Found!! No appointments has been booked yet" })
            }
        })
}

module.exports = {
    studentBookingAnAppointmentWithDean,
    deanCheckingSlotsBookedByStudents
}