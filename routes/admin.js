import express from "express";
import { protect } from "../middlewares/auth.js";
import { admin } from "../middlewares/admin.js";
import { getOverView } from "../controllers/admin.js";

const router = express.Router();

router.get('/overview', protect, admin, getOverView);

export default router;