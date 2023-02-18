import express from "express";
import {
  createNamespace,
  getAllNamespaces,
} from "../controllers/namespaceController.js";

const router = express.Router();

router.route("/").post(createNamespace).get(getAllNamespaces);

export default router;
