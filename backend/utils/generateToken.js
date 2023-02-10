import jwt from "jsonwebtoken";
import { keys } from "../keys.js";

const generateToken = (payload, secret = keys.jwtSecret, expiresIn = "10d") => {
  return jwt.sign(payload, secret, { expiresIn });
};

export default generateToken;
