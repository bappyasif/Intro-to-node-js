const express = require("express");

const { studentBookingAnAppointmentWithDean, deanCheckingSlotsBookedByStudents } = require("../controllers/appointments");

const appointmentRoutes = express();

appointmentRoutes.post("/bookSlot", studentBookingAnAppointmentWithDean);

appointmentRoutes.get("/whoBooked", deanCheckingSlotsBookedByStudents);

module.exports = appointmentRoutes