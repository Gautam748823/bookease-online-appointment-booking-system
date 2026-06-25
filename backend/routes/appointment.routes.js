const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAvailableSlots
} = require('../controllers/appointment.controller');

router.post('/', createAppointment);
router.get('/', getAllAppointments);
router.get('/available-slots', getAvailableSlots);
router.get('/:id', getAppointmentById);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

module.exports = router;
