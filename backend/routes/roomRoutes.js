import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addMessage,
  addRoom,
  getRooms,
} from "../controllers/roomController.js";

const router = express.Router();

router.route("/").post(protect, addRoom).get(protect, getRooms);
router.route("/message").post(protect, addMessage);

export default router;
