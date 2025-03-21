import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.config.js';
import authRoutes from './routes/auth.route.js';
import apiRoutes from './routes/api.route.js';
import client from 'prom-client';
import logger from './logger/logger.js';
import responseTime from 'response-time';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: "*",
}));

connectDB();

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({
    register: client.register,
})

const resTime = new client.Histogram({
    name: "http_request_response_time",
    help: "Duration of HTTP requests in",
    labelNames: ["method", "route", "statusCode"],
    buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000],
});

app.use(responseTime((req, res, time) => {
    if (req.url !== "/metrics") {
        resTime.labels({
            method: req.method,
            route: req.url,
            statusCode: res.statusCode
        }).observe(time);
    }
}))


app.get("/metrics", async (req, res) => {
    res.setHeader("Content-Type", client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);
});

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
