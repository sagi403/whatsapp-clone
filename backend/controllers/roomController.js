import asyncHandler from "express-async-handler";
import Room from "../models/roomModel.js";
import User from "../models/userModel.js";
import compareDates from "../utils/compareDates.js";

// @desc    Add new room
// @route   POST /api/rooms
// @access  Private
const addRoom = asyncHandler(async (req, res) => {
  const { roomTitle } = req.body;
  const { username } = req.user;

  const receiverUser = await User.findOne({ username: roomTitle });

  if (!receiverUser) {
    res.status(400);
    throw new Error("User not found");
  }

  const roomExists = await Room.findOne({ roomTitle, namespace: username });

  if (roomExists) {
    res.status(400);
    throw new Error("Room already added");
  }

  await Room.create({
    roomTitle,
    namespace: username,
    user: receiverUser.id,
  });

  res.status(201).json({ message: "Room added successfully" });
});

// @desc    Fetch rooms details
// @route   GET /api/rooms
// @access  Private
const getRooms = asyncHandler(async (req, res) => {
  const { username } = req.user;

  const rooms = await Room.find({ namespace: username })
    .populate("user")
    .select("-conversationHistory");

  if (!rooms) {
    res.status(400);
    throw new Error("Room not found");
  }

  const contact = rooms.map(room => {
    const receivedAt = room.lastMessage && compareDates(room.updatedAt);

    return {
      name: room.roomTitle,
      lastMessage: room.lastMessage,
      receivedAt,
      avatar: room.user.avatarColors,
      id: room.id,
    };
  });

  res.json({ contact });
});

// @desc    Add message to room
// @route   POST /api/rooms/message
// @access  Private
const addMessage = asyncHandler(async (req, res) => {
  const { receiver, text } = req.body;
  const { username } = req.user;

  const room = await Room.findOne({ roomTitle: receiver, namespace: username });

  if (!room) {
    res.status(400);
    throw new Error("Room not found");
  }

  const message = { receiver, text };

  room.conversationHistory.push(message);
  room.lastMessage = text;
  await room.save();

  res.json({ message: "Message added successfully" });
});

export { addRoom, getRooms, addMessage };
