const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const loginDoctor = async (req, res) => {
    const { email, password } = req.body;

    const doctor = await User.findOne({ email, role: 'doctor' });
    if(!doctor) return res.status(404).json({ message: "Doctor not found" });

    const isMatch = await bcrypt.compare(password, doctor.password)
    if(!isMatch) return res.status(400).json({ message: "Invalid credentail/password" });


    const token = jwt.sign(
        { id: doctor._id, role: doctor.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.status(200).json({ token })
}

// Include practice number with admin role
const registerDoctor = async (req, res) => {
    console.log("Check")
    const { name, email, password, role, practiceNumber } = req.body;
    
    const doctor = await User.findOne({ email, role: 'doctor' });
    if(doctor) return res.status(400).json({ message: "Doctor already exsists" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const newDoctor = new User({
        name,
        email,
        password: hashedPassword,
        role,
        practiceNumber,
        active: false
    })

    await newDoctor.save()

    const token = jwt.sign(
        { id: newDoctor._id, role: newDoctor.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.status(201).json({
        message: "Doctor is created !!!",
        token
    })
}




// patient auth


const loginPatient = async (req, res) => {
    const { email, password } = req.body;

    const patient = await User.findOne({ email, role: 'patient' });
    if(!patient) return res.status(404).json({ message: "Patient not found" });

    const isMatch = await bcrypt.compare(password, patient.password)
    if(!isMatch) return res.status(400).json({ message: "Invalid credentail/password" });


    const token = jwt.sign(
        { id: patient._id, role: patient.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.status(200).json({ token })
}

// Include practice number with admin role
const registerPatient = async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log(name, email, password, role)
    const patient = await User.findOne({ email, role: 'patient' });
    if(patient) return res.status(400).json({ message: "Patient already exsists" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const newPatient = new User({
        name,
        email,
        password: hashedPassword,
        role
    })

    await newPatient.save()

    const token = jwt.sign(
        { id: newPatient._id, role: newPatient.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.status(201).json({
        message: "Patient is created !!!",
        token
    })
}




module.exports = { loginDoctor, registerDoctor, loginPatient, registerPatient }