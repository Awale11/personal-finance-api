import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./utils/swagger.js";

import path from 'path'
import { fileURLToPath } from "url";

import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import transactionRoutes from './routes/transaction.js';
import categoryRoutes from './routes/category.js';
import uploadRoutes from './routes/upload.js';
import adminRoutes from './routes/admin.js'
import { errorHandler } from "./middlewares/errorHandler.js";
  
const app = express();
const PORT = process.env.PORT || 5000

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res)=> {
    res.json('Server is working now')
})

// Server frontend in Production

if(process.env.NODE_ENV === 'production') {

    const _dirname = path.dirname(fileURLToPath(import.meta.url))

    app.use(express.static(path.join(_dirname, '../frontend/dist')))

    // Serve the frontend app

    app.get(/.*/, (req, res) => {
        res.send(path.join(_dirname, '..', 'frontend', 'dist', 'index.html'))
    })
}

app.use(errorHandler)

mongoose
    .connect(process.env.NODE_ENV == "development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PRO)
    .then(() => {
        console.log("✅ MongoDB connected");

        app.listen(PORT, ()=> {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ MongoDB connection error:", error);
    });
