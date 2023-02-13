import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createNamespace,
  getNamespaceRooms,
} from "../controllers/namespaceController.js";

const router = express.Router();

router.get("/rooms", protect, getNamespaceRooms);
router.route("/").post(createNamespace);

export default router;
