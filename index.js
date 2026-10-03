import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./utils/swagger.js";

// import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import transactionRoutes from './routes/transaction.js';
import categoryRoutes from './routes/category.js';
import uploadRoutes from './routes/upload.js';
import adminRoutes from './routes/admin.js'
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(morgan('dev'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/transaction', transactionRoutes);
app.use('/categories', categoryRoutes);
app.use('/upload', uploadRoutes);
app.use('/admin', adminRoutes);

app.use(errorHandler)

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected");

        app.listen(PORT, ()=> {
            console.log(`Server running on port ${PORT}`)
        });
        // app.listen(process.env.PORT, () => {
        //     console.log(`Server running on port ${process.env.PORT}`);
        // });
    })
    .catch((error) => {
        console.error("❌ MongoDB connection error:", error);
    });
