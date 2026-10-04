import express from "express";
import { protect } from "../middlewares/auth.js";
import { admin } from "../middlewares/admin.js";
import { getOverView } from "../controllers/admin.js";

const router = express.Router();

/**
 * @swagger
 * /admin/overview:
 *   get:
 *     summary: Get admin overview
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin overview retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */

router.get('/overview', protect, admin, getOverView);

export default router;