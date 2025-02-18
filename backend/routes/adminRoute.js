import express from 'express';
import Doctor from '../models/doctorModel.js';
import User from '../models/userModel.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to get all doctors
router.get('/get-all-doctors', authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).send({ success: true, doctors });
  } catch (error) {
    console.error('Error in /get-all-doctors route:', error.message);
    res.status(500).send({ success: false, message: 'Error fetching doctors', error });
  }
});

// Route to approve a doctor
router.post('/approve-doctor', authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.body.doctorId);
    if (!doctor) {
      return res.status(404).send({ success: false, message: 'Doctor not found' });
    }
    doctor.status = 'approved';
    await doctor.save();
    res.status(200).send({ success: true, message: 'Doctor approved successfully' });
  } catch (error) {
    console.error('Error in /approve-doctor route:', error.message);
    res.status(500).send({ success: false, message: 'Error approving doctor', error });
  }
});

// Route to reject a doctor
router.post('/reject-doctor', authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.body.doctorId);
    if (!doctor) {
      return res.status(404).send({ success: false, message: 'Doctor not found' });
    }
    doctor.status = 'rejected';
    await doctor.save();
    res.status(200).send({ success: true, message: 'Doctor rejected successfully' });
  } catch (error) {
    console.error('Error in /reject-doctor route:', error.message);
    res.status(500).send({ success: false, message: 'Error rejecting doctor', error });
  }
});

// Route to get all users
router.get('/get-all-users', authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({ success: true, users });
  } catch (error) {
    console.error('Error in /get-all-users route:', error.message);
    res.status(500).send({ success: false, message: 'Error fetching users', error });
  }
});

// Get all appointments
router.get("/get-all-appointments", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({}).populate('appointments.assignedDoctor');
    const allAppointments = users.flatMap(user => 
      user.appointments.map(appointment => ({
        ...appointment.toObject(),
        userId: user._id
      }))
    );
    
    res.status(200).send({ 
      success: true, 
      appointments: allAppointments 
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).send({ 
      message: "Error fetching appointments", 
      success: false,
      error: error.message 
    });
  }
});

// Assign doctor to appointment
router.post("/assign-doctor", authMiddleware, async (req, res) => {
  try {
    const { userId, appointmentId, doctorId } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found", success: false });
    }
    
    const appointment = user.appointments.id(appointmentId);
    if (!appointment) {
      return res.status(404).send({ message: "Appointment not found", success: false });
    }
    
    appointment.assignedDoctor = doctorId;
    appointment.status = 'assigned';
    await user.save();
    
    res.status(200).send({ 
      message: "Doctor assigned successfully", 
      success: true,
      appointment 
    });
  } catch (error) {
    console.error("Error assigning doctor:", error);
    res.status(500).send({ 
      message: "Error assigning doctor", 
      success: false,
      error: error.message 
    });
  }
});

export default router;
