import asyncHandler from "express-async-handler";
import Namespace from "../models/namespaceModel.js";

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

  await Namespace.create({ nsTitle, endpoint: `/${userId}` });

  res.status(201).json({ success: true });
});

// @desc    Get all namespace rooms
// @route   GET /api/namespaces/rooms
// @access  Private
const getNamespaceRooms = asyncHandler(async (req, res) => {
  const user = req.user;
  console.log(user);
  // const userExists = await Namespace.findOne({ email });

  // if (userExists) {
  //   res.status(400);
  //   throw new Error("User already exists");
  // }

  // const user = await User.create({
  //   username,
  //   email,
  //   password,
  // });

  // req.session = { jwt: generateToken({ id: user.id, isAdmin: user.isAdmin }) };

  // res.status(201).json({ success: true });
});

export { createNamespace, getNamespaceRooms };
