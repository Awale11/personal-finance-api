import express from "express";
import { protect } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";
import { uploadFile } from "../controllers/upload.js";

const router = express.Router();

/**
 * @swagger
 * /upload/profile-picture:
 *   post:
 *     summary: Upload profile picture
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - profilePicture
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully
 *       401:
 *         description: Unauthorized
 */

router.post('/profile-picture', protect, upload.single('profilePicture'), uploadFile);

export default router;