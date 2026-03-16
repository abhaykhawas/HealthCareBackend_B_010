const router = require('express').Router();
const { loginDoctor, registerDoctor, loginPatient, registerPatient } = require('../controllers/authController');

router.post('/doctor/login', loginDoctor)
router.post('/doctor/singup', registerDoctor)
router.post('/patient/login', loginPatient)
router.post('/patient/signup', registerPatient)

module.exports = router;