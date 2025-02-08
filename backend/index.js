import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.config.js';
import authRoutes from './routes/auth.route.js';
import apiRoutes from './routes/api.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


connectDB();

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
