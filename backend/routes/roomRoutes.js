import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addRoom, getRooms } from "../controllers/roomController.js";

const router = express.Router();

router.route("/").post(protect, addRoom).get(protect, getRooms);

export default router;
