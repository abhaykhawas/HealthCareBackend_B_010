const mongoose = require('mongoose')

const prescriptionSchema = new mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    diagnosis: String,
    medications: [
        {
            name: String,
            dosage: String,
            timing: String,
            duration: String,
            storageTemp: String
        }
    ],
    aiReports: {
        medicationSchedule: [
            {
                medicine: String,
                dosage: String,
                timesPerDay: Number,
                durationDays: Number,
                currentDay: Number,
                times: [String],
                session: {
                    type: 'String',
                    enum: ["Active", "Completed", "Stopped"],
                    default: "Active"
                }
            }

        ],

        dietRecomendation: {
            eat: [String],
            avoid: [String]
        }
    } 
}, { timestamps: true })

module.exports = mongoose.model('Prescription', prescriptionSchema)