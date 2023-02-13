import asyncHandler from "express-async-handler";
import Namespace from "../models/namespaceModel.js";
import User from "../models/userModel.js";

// @desc    Create new namespace
// @route   POST /api/namespaces
// @access  Public
const createNamespace = asyncHandler(async (req, res) => {
  const { nsTitle, userId } = req.body;

  const nsExists = await Namespace.findOne({ nsTitle });

  if (nsExists) {
    res.status(400);
    throw new Error("Namespace title already exists");
  }

  const userExists = await User.findById(userId);

  if (!userExists) {
    res.status(400);
    throw new Error("User not exists");
  }

  await Namespace.create({ nsTitle, endpoint: `/${userId}` });

  res.status(201).json({ success: true });
});

// @desc    Add room to namespace
// @route   POST /api/namespaces/room
// @access  Private
const addNamespaceRoom = asyncHandler(async (req, res) => {
  const { roomTitle } = req.body;
  const { username } = req.user;

  const ns = await Namespace.findOne({ nsTitle: username });

  if (!ns) {
    res.status(400);
    throw new Error("Namespace not found");
  }

  const roomAlreadyAdded = ns.rooms.find(r => r.roomTitle === roomTitle);

  if (roomAlreadyAdded) {
    res.status(400);
    throw new Error("Room already added");
  }

  const room = {
    roomTitle,
    namespace: username,
  };

  ns.rooms.push(room);
  await ns.save();

  res.status(201).json({ message: "Room added successfully" });
});

// @desc    Fetch namespace details
// @route   GET /api/namespaces
// @access  Private
const getNamespaceRooms = asyncHandler(async (req, res) => {
  const { username } = req.user;

  const ns = await Namespace.find({ nsTitle: username });

  if (!ns) {
    res.status(400);
    throw new Error("Namespace not found");
  }
  res.json({ ns });
});

export { createNamespace, addNamespaceRoom, getNamespaceRooms };
