import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addMessage,
  addUnreadMessage,
  addUnreadToRead,
  getMessages,
} from "../controllers/messageController.js";

const router = express.Router();

router.route("/").post(protect, addMessage);
router.route("/unread").post(protect, addUnreadMessage);
router.route("/combine").post(protect, addUnreadToRead);
router.route("/:receiverId").get(protect, getMessages);

export default router;
