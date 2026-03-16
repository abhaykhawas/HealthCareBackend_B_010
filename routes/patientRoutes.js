const router = require('express').Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { authorizeRole } = require('../middleware/roleMiddleware');

const { viewPrescription, viewMedicationSchedule, viewDietRecomendation } = require('../controllers/patientController');


router.get('/prescription/:id', verifyToken, authorizeRole('patient'), viewPrescription);

router.get('/prescription/:id/schedule', verifyToken, authorizeRole('patient'), viewMedicationSchedule);

router.get('/prescription/:id/diet', verifyToken, authorizeRole('patient'), viewDietRecomendation)

module.exports = router;