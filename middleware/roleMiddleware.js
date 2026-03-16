const User = require('../models/User')

exports.authorizeRole = (role) => {
    return async (req, res, next) => {
        if(req.user.role !== role){
            return res.status(403).json({ message: "Access denied" })
        }
        if(req.user.role === 'doctor'){
            const doctor = await User.findById(req.user.id);
            if (!doctor.active) return res.status(403).json({message: "Sorry the doctor is not active and cannot practice at the moment"})
        }
        next()
    }
}