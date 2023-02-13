import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });

  if (userExists || usernameExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  req.session = { jwt: generateToken({ id: user.id, isAdmin: user.isAdmin }) };

  res.status(201).json({ id: user.id });
});

// @desc    Login user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    req.session = {
      jwt: generateToken({ id: user.id, isAdmin: user.isAdmin }),
    };
    const { id, username, isAdmin } = user;

    res.json({ id, username, email, isAdmin });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const { id, username, email, isAdmin } = req.user;

  res.json({ id, username, email, isAdmin });
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  req.session = null;

  res.send({ success: true });
});

export { registerUser, loginUser, getUserProfile, logoutUser };
