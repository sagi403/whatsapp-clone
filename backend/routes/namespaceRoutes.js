import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addMessage,
  addNamespaceRoom,
  createNamespace,
  getNamespace,
} from "../controllers/namespaceController.js";

const router = express.Router();

router.route("/").post(createNamespace).get(protect, getNamespace);
router.route("/room").post(protect, addNamespaceRoom);
router.route("/message").post(protect, addMessage);

export default router;
