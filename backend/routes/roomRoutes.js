import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addMessage,
  addRoom,
  addUnreadMessage,
  addUnreadToRead,
  getMessages,
  getRooms,
} from "../controllers/roomController.js";

const router = express.Router();

router.route("/").post(protect, addRoom).get(protect, getRooms);
router.route("/message").post(protect, addMessage);
router.route("/message/unread").post(protect, addUnreadMessage);
router.route("/message/combine").post(protect, addUnreadToRead);
router.route("/messages/:receiverId").get(protect, getMessages);

export default router;
