import asyncHandler from "express-async-handler";
import Room from "../models/roomModel.js";
import User from "../models/userModel.js";
import compareDates from "../utils/compareDates.js";

// @desc    Add new room
// @route   POST /api/rooms
// @access  Private
const addRoom = asyncHandler(async (req, res) => {
  const { receiverId } = req.body;
  const { id } = req.user;

  if (receiverId === id) {
    res.status(400);
    throw new Error("Invalid information provided");
  }

  const receiverUser = await User.findById(receiverId);
  const loginUser = await User.findById(id);

  if (!loginUser || !receiverUser) {
    res.status(400);
    throw new Error("User not found");
  }

  const participants = [receiverId, id];

  const roomExists = await Room.findOne({
    participants: { $all: participants },
  });

  if (roomExists) {
    res.status(400);
    throw new Error("Room already added");
  }

  await Room.create({ participants });

  res.status(201).json({ message: "Room added successfully" });
});

// @desc    Fetch rooms details
// @route   GET /api/rooms
// @access  Private
const getRooms = asyncHandler(async (req, res) => {
  const { id } = req.user;

  const rooms = await Room.find({ participants: { $in: id } })
    .populate("participants")
    .select("-conversationHistory");

  if (!rooms) {
    res.status(400);
    throw new Error("Room not found");
  }

  const contacts = rooms.map(room => {
    const receivedAt = room.lastMessage && compareDates(room.updatedAt);
    const user = room.participants.find(p => p.id !== id);

    return {
      name: user.username,
      userId: user.id,
      lastMessage: room.lastMessage,
      receivedAt,
      avatar: user.avatarColors,
      roomId: room.id,
    };
  });

  res.json({ contacts });
});

// @desc    Add message to room
// @route   POST /api/rooms/message
// @access  Private
const addMessage = asyncHandler(async (req, res) => {
  const { receiverId, text } = req.body;
  const { id } = req.user;

  if (receiverId === id) {
    res.status(400);
    throw new Error("Invalid information provided");
  }

  const room = await Room.findOne({ participants: { $all: [id, receiverId] } });

  if (!room) {
    res.status(400);
    throw new Error("Room not found");
  }

  const time = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  room.conversationHistory.push({ receiverId, text, time });
  room.lastMessage = text;
  await room.save();

  res.json({ message: "Message added successfully" });
});

// @desc    Add unread message to room
// @route   POST /api/rooms/message/unread
// @access  Private
const addUnreadMessage = asyncHandler(async (req, res) => {
  const { receiverId, text } = req.body;
  const { id } = req.user;

  if (receiverId === id) {
    res.status(400);
    throw new Error("Invalid information provided");
  }

  const room = await Room.findOne({ participants: { $all: [id, receiverId] } });

  if (!room) {
    res.status(400);
    throw new Error("Room not found");
  }

  const time = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  room.unreadConversationHistory.push({ receiverId, text, time });
  await room.save();

  res.json({ message: "Unread message added successfully" });
});

// @desc    Fetch all messages from room
// @route   POST /api/rooms/messages
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const { receiverId } = req.body;
  const { id } = req.user;

  if (receiverId === id) {
    res.status(400);
    throw new Error("Invalid information provided");
  }

  const room = await Room.findOne({ participants: { $all: [id, receiverId] } });

  if (!room) {
    res.status(400);
    throw new Error("Room not found");
  }

  const messages = {
    read: room.conversationHistory,
    unread: room.unreadConversationHistory,
  };

  res.json({ messages });
});

export { addRoom, getRooms, addMessage, addUnreadMessage, getMessages };
