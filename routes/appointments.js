const express = require("express");

const { studentBookingAnAppointmentWithDean, deanCheckingSlotsBookedByStudents } = require("../controllers/appointments");
const { checkToken } = require("../middlewares");

const appointmentRoutes = express();

appointmentRoutes.put("/bookSlot", checkToken, studentBookingAnAppointmentWithDean);

appointmentRoutes.get("/whoBooked", checkToken, deanCheckingSlotsBookedByStudents);

module.exports = appointmentRoutes