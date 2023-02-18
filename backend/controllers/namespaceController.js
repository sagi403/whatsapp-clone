import asyncHandler from "express-async-handler";
import Namespace from "../models/namespaceModel.js";
import User from "../models/userModel.js";

// @desc    Create new namespace
// @route   POST /api/namespaces
// @access  Public
const createNamespace = asyncHandler(async (req, res) => {
  const { nsTitle, userId } = req.body;

  const userExists = await User.findById(userId);

  if (!userExists) {
    res.status(400);
    throw new Error("User not exists");
  }

  if (nsTitle !== userExists.username) {
    res.status(400);
    throw new Error("Namespace title must match the username");
  }

  const nsExists1 = await Namespace.findOne({ nsTitle });

  if (nsExists1) {
    res.status(400);
    throw new Error("Namespace title already exists");
  }

  const nsExists2 = await Namespace.findOne({ endpoint: `/${userId}` });

  if (nsExists2 && nsExists2.endpoint === `/${userId}`) {
    res.status(400);
    throw new Error("Namespace endpoint already exists");
  }

  await Namespace.create({ nsTitle, endpoint: `/${userId}` });

  res.status(201).json({ success: true });
});

// @desc    Fetch all namespaces
// @route   GET /api/namespaces
// @access  Public
const getAllNamespaces = asyncHandler(async (req, res) => {
  const namespaces = await Namespace.find({});

  res.json(namespaces);
});

export { createNamespace, getAllNamespaces };
