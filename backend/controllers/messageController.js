import asyncHandler from "express-async-handler";
import Room from "../models/roomModel.js";
import addDateCompareToCreate from "../utils/addDateCompareToCreate.js";

// @desc    Add message to room
// @route   POST /api/messages
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
  const date = new Date();

  room.conversationHistory.push({ receiverId, text, time, date });
  room.lastMessage = text;
  room.lastSenderId = id;
  await room.save();

  res.json({ message: "Message added successfully" });
});

// @desc    Add unread message to room
// @route   POST /api/messages/unread
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
  const date = new Date();

  room.unreadConversationHistory.push({ receiverId, text, time, date });
  room.lastMessage = text;
  room.lastSenderId = id;
  await room.save();

  res.json({ message: "Unread message added successfully" });
});

// @desc    Add unread messages to read messages
// @route   POST /api/messages/combine
// @access  Private
const addUnreadToRead = asyncHandler(async (req, res) => {
  const { roomId } = req.body;

  const room = await Room.findById(roomId);

  if (!room) {
    res.status(400);
    throw new Error("Room not found");
  }

  const messages = room.unreadConversationHistory;

  if (messages.length === 0) {
    res.status(400);
    throw new Error("Unread message didn't found");
  }

  for (let message of messages) {
    room.conversationHistory.push(message);
  }

  room.unreadConversationHistory = [];
  await room.save();

  res.json({ message: "Updated messages successfully" });
});

// @desc    Fetch all messages from room
// @route   GET /api/messages/:receiverId
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const { receiverId } = req.params;
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

  const read = addDateCompareToCreate(room.conversationHistory.slice(-10));
  const unread = addDateCompareToCreate(room.unreadConversationHistory);

  const messages = { read, unread };

  res.json({ messages });
});

export { addMessage, addUnreadMessage, addUnreadToRead, getMessages };
