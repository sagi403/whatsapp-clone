import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addMessage,
  addRoom,
  getMessages,
  getRooms,
} from "../controllers/roomController.js";

const router = express.Router();

router.route("/").post(protect, addRoom).get(protect, getRooms);
router.route("/message").post(protect, addMessage);
router.route("/messages").get(protect, getMessages);

export default router;
