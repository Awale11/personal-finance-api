import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

export const protect = async (req, res, next)=> {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) return res.status(401).json({message: 'No Token Provided'});

    try {
        // token controller
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // user bulma
        const user = await User.findById(decode.id).select('-password');

        if(!user) {
            return res.status(401).json({
                message: 'User not found'
            })
        }
        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({message: 'Invalid or Expired Token'})
    }
}

