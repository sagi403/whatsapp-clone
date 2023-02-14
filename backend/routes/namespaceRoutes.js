import express from "express";
import { createNamespace } from "../controllers/namespaceController.js";

const router = express.Router();

router.route("/").post(createNamespace);

export default router;
