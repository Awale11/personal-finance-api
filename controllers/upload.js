// import {success} from 'zod';
import User from '../models/Users.js';
import cloudinary from '../utils/cloudinary.js';

export const uploadFile = (req, res, next)=> {
    if(!req.file) {
        return res.status(400).json({message: 'No file uploaded'})
    }

    const stream = cloudinary.uploader.upload_stream(
        {folder: 'profile_pictures', resource_type: 'image'},

       async (error, result)=> {
            if(error) { 
                return next(error)};
            try {
                const user = await User.findByIdAndUpdate(req.user._id,
                    {profilePicture: result.secure_url},
                );
                if(!user){
                    return res.status(404).json({
                        message: 'User not found'
                    })
                }
                return res.status(201).json({
                success: true,
                fileUrl: result.secure_url
            })
               
            } catch (error) {
                next(error)
            }
        }
    );
    stream.end(req.file.buffer)
}