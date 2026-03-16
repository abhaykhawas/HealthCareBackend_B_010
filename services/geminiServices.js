const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const generateAIReport = async (diagnosis, medications) => {
    console.log("Inside 1")
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const medText = medications.map((med) => (
        `Medicine: ${med.name}, Dosage: ${med.dosage}, Timings: ${med.timings}, Duration : ${med.duration}`
    )).join("/n");

    const prompt = `
    You are a medical Assitant AI.

    Diagonosis : ${diagnosis}

    Medication : ${medText}

    Generate:
    1. Clear Medication Schedule for Patient
    2. Simple dietary guidelines (What to eat and avoid)

    Return response in JSON format:
    {
        "medicationSchedule" : [
            {
                medicine: String,
                dosage: String("500 mg"),
                timePerDay : number,
                durationDays: number,
                currentDay: number
                times: Array (["08:00", "16:00", "22:00"]),
                session: "Active"
            }
        ],
        "dietRecomendation": [
            "eat": [],
            "avoid": []
        ]
    }

    Rules : 
    - timePerDay must match number of times in "times"
    - session must be "Active"
    - currentDay should start at 1
    `

    const result = await model.generateContent(prompt);
    console.log(result)
    const response = await result.response;
    let text = response.text()

    try{
        text = text.replace(/```json|```/g, "").trim();
        console.log('----------------------------')
        console.log(text)
        return JSON.parse(text)
    }
    catch(err){
        return {
            medicationSchedule: text,
            dietRecomendation: {
                eat: [],
                avoid : []
            }
        }
    }
}


module.exports = generateAIReport