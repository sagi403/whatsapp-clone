import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { keys } from "../keys.js";

const protect = asyncHandler(async (req, res, next) => {
  if (!req.session?.jwt) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(req.session.jwt, keys.jwtSecret);

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

export { protect };
