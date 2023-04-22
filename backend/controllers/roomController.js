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
      lastSenderId: room.lastSenderId,
      unreadMessagesNumber: room.unreadConversationHistory.length,
      receivedAt,
      avatar: user.avatarColors,
      roomId: room.id,
      etherAddress: user.etherAddress,
    };
  });

  res.json({ contacts });
});

export { addRoom, getRooms };
