import express from "express";
import { createApi, getMockData } from "../controllers/api.controller.js";

const router = express.Router();

router.post("/create", createApi);
router.get("/:apiName", getMockData);

export default router;
