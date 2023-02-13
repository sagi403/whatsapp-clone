import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createRoom } from "../controllers/roomController.js";

const router = express.Router();

router.route("/").post(protect, createRoom);

export default router;
