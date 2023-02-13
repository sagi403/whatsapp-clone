import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addNamespaceRoom,
  createNamespace,
  getNamespaceRooms,
} from "../controllers/namespaceController.js";

const router = express.Router();

router.route("/").post(createNamespace).get(protect, getNamespaceRooms);
router.route("/room").post(protect, addNamespaceRoom);

export default router;
