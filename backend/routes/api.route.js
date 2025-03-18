import express from "express";
import { createApi, getMockData, testApi, getAPIs, deleteApi } from "../controllers/api.controller.js";

const router = express.Router();

router.post("/create", createApi);
router.post("/test", testApi);
router.get("/apis", getAPIs);
router.delete("/delete", deleteApi);
router.get("/:apiName", getMockData);
router.post("/:apiName", getMockData);

export default router;
