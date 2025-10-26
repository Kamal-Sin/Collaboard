import Admin from '../models/admin.model.js'
import bcrypt from 'bcrypt'
import generateToken, { invalidateSession } from '../utils/generateTokens.js';


export const signup = async (req, res)=>{
    try {
        const { fullname, password, confirmPassword, email, employee_id } = req.body;

        // console.log(req.body);

        if(password !== confirmPassword){
            return res.status(400).json({error: 'Passwords do not match'})
        }

        const existingAdmin = await Admin.findOne({employee_id});
        if(existingAdmin){
            return res.status(400).json({error: 'Admin already exists'})
        }

        const existingEmail = await Admin.findOne({email})
         if(existingEmail){
            return res.status(400).json({error: 'Email already exists'})
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({ fullname, password: hashedPassword, email, employee_id });
        await generateToken(newAdmin._id, 'admin', res);
        await newAdmin.save();
        res.status(201).json({ newAdmin });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


export const login = async (req,res)=>{
    try {
        
        const { employee_id, password } = req.body;

        const admin = await Admin.findOne({ employee_id });
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        await generateToken(admin._id, 'admin', res);
        res.status(200).json({fullname: admin.fullname, email: admin.email, employee_id: admin.employee_id });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}


export const logout = async (req, res) => {
    try{
        // Invalidate the session if user info is available
        if (req.user && req.user.sessionId) {
            await invalidateSession(req.user.sessionId);
        }
        
        res.cookie('jwt', '', { maxAge: 0 });
        return res.status(200).json({ message: "User logged out successfully" });
    }
    catch(error){
        console.log('error in logout controller ', error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Validate session endpoint
export const validateAuth = (req, res) => {
    try {
        // If we reach here, the session is valid (middleware already validated)
        res.status(200).json({ 
            valid: true, 
            userType: req.user.userType,
            userId: req.user.userId 
        });
    } catch (error) {
        res.status(401).json({ valid: false, error: "Invalid session" });
    }
};