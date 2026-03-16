const Prescription = require('../models/Prescriptions');

const viewPrescription = async (req, res) => {
    const prescription = await Prescription.findById(req.params.id);
    res.json(prescription)
}


const viewMedicationSchedule = async (req, res) => {
    const prescription = await Prescription.findById(req.params.id)
    res.json({
        medicationSchedule: prescription.aiReports.medicationSchedule
    })
}

const viewDietRecomendation = async (req, res) => {
    const prescription = await Prescription.findById(req.params.id)
    res.json({
        dietRecomendation: prescription.aiReports.dietRecomendation
    })
}

module.exports = { viewPrescription, viewMedicationSchedule, viewDietRecomendation }