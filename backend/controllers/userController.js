import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  req.session = { jwt: generateToken({ id: user.id, isAdmin: user.isAdmin }) };

  res.status(201).json({ success: true });
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

    res.json({ success: true });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

export { registerUser, loginUser };
