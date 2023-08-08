const dean = require("../models/dean")

const studentBookingAnAppointmentWithDean = (req, res) => {
    const { deanId, day, userId } = req.body

    dean.findOne({ id: deanId })
        .then(foundDean => {
            const slots = foundDean.slots;

            // when requesting student already booked this slot
            const thisStudentAlreadyBookedThisSlot = slots.findIndex(item => item?.studentId === userId && item.day === day)

            if (thisStudentAlreadyBookedThisSlot !== -1) {
                return res.status(200).json({ msg: "your booked appointnent info", deanId, slot: slots[thisStudentAlreadyBookedThisSlot] })
            }

            // when another student trying to book a slot which is already booked by another student
            const isSlotBooked = slots.findIndex(item => item.day === day && !item.free)
            if (isSlotBooked !== -1) {
                return res.status(503).json({ msg: "slot is booked already, try other slot, thanks :)" })
            }

            // student booking a new appontment slot which is available

            // updating dean slots information for student appointment
            const updatedSlots = slots.map(item => {
                if (item.day === day && item.free) {
                    item.free = false
                    item.studentId = userId
                }
                return item
            })

            // now we will be updating dean data with updated slots information
            foundDean.slots = updatedSlots

            dean.findByIdAndUpdate(foundDean._id, foundDean, {})
                .then(() => {
                    console.log("dean data is updated, new appointment is booked")
                    return res.status(200).json({ msg: "booked appointnent", studentId: userId, deanId, slot: foundDean.slots.find(item => item?.studentId === userId ? item : null) })
                })
        })
        .catch(err => console.log("schedule fetching has failed....", err.message))
}

const deanCheckingSlotsBookedByStudents = (req, res) => {
    const { userId } = req.body;

    dean.findOne({ id: userId })
        .then(data => {
            // console.log(data, userId, "!!")
            // if there is no booked slots
            const isFreeSlotsAvailable = data.slots.filter(item => !item.free)

            if (isFreeSlotsAvailable?.length === 0) {
                return res.status(400).json({ msg: "Schedule Data Not Found!! No appointments has been booked yet", bookedSlots: isFreeSlotsAvailable.length })
            } else {
                // there are slots been booked by students, and we will be sending those slots back to requested dean
                const appointments = data.slots.filter(item => !item.free && ({ studentId: item.studentId, slots: item.slots }))
                
                return res.status(200).json({ msg: "Detail About Booked Slots", appointments: appointments })
            }
        })
}

module.exports = {
    studentBookingAnAppointmentWithDean,
    deanCheckingSlotsBookedByStudents
}