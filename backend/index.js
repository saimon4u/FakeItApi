import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.config.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
connectDB();

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
