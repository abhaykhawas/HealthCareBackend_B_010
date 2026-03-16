const router = require('express').Router()
const { verifyToken } = require('../middleware/authMiddleware');
const { authorizeRole } = require('../middleware/roleMiddleware');
const { createPrescription } = require('../controllers/prescriptionController');


router.post('/prescription', verifyToken, authorizeRole('doctor') ,createPrescription);

module.exports = router