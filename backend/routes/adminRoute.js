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

export default router;