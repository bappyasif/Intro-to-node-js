const express = require("express");

const { studentBookingAnAppointmentWithDean, deanCheckingSlotsBookedByStudents } = require("../controllers/appointments");
const { checkIfTokenValidForStudent, checkIfTokenValidForDean } = require("../middlewares");

const appointmentRoutes = express();

appointmentRoutes.put("/bookSlot", checkIfTokenValidForStudent, studentBookingAnAppointmentWithDean);

appointmentRoutes.get("/whoBooked", checkIfTokenValidForDean, deanCheckingSlotsBookedByStudents);

module.exports = appointmentRoutes