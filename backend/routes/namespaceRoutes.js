import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addMessage,
  addNamespaceRoom,
  createNamespace,
  getNamespaceRooms,
} from "../controllers/namespaceController.js";

const router = express.Router();

router.route("/").post(createNamespace);
router.route("/room").post(protect, addNamespaceRoom);
router.get("/rooms", protect, getNamespaceRooms);
router.route("/message").post(protect, addMessage);

export default router;
