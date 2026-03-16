const Prescription = require('../models/Prescriptions');
const geminiService = require('../services/geminiServices');


const createPrescription = async (req, res) => {
    try{
        const { patientId, diagnosis, medications } = req.body;

        const aiReports = await geminiService(diagnosis, medications)

        console.log(req.user.id)

        const prescription = await Prescription.create({
            doctor: req.user.id,
            patient: patientId,
            diagnosis,
            medications,
            aiReports
        })

        res.status(200).json(prescription)
    }
    catch(err) {
        console.log(err.message)
        res.status(500).json({ message: "Error while creating the prescription" })
    }
}


module.exports = { createPrescription }