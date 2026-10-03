import express from "express";
import { protect } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";
import { uploadFile } from "../controllers/upload.js";

const router = express.Router();

router.post('/profile-picture', protect, upload.single('profilePicture'), uploadFile);

export default router;