import asyncHandler from "express-async-handler";
import Room from "../models/roomModel.js";

// @desc    Create new room
// @route   POST /api/rooms
// @access  Private
const createRoom = asyncHandler(async (req, res) => {
  const { roomTitle } = req.body;
  const user = req.user;

  const roomExists = await Room.findOne({ roomTitle });

  if (roomExists) {
    res.status(400);
    throw new Error("Room title already exists");
  }

  await Room.create({ roomTitle, namespace: user.username });

  res.status(201).json({ success: true });
});

export { createRoom };
