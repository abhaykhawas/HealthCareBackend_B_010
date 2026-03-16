const express = require('express')
require('dotenv').config()
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes')
const doctorRoutes = require('./routes/doctorRoutes')
const patientRoutes = require('./routes/patientRoutes')

connectDB()

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.json({"message": "Server is fine"})
})

app.use('/api/auth', authRoutes)
app.use('/api/doctor', doctorRoutes)
app.use('/api/patient', patientRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT: ${process.env.PORT}`)
})