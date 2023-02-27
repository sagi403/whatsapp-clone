import jwt from "jsonwebtoken";
import { keys } from "../keys.js";

const generateToken = (payload, secret = keys.jwtSecret, expiresIn = "1d") => {
  return jwt.sign(payload, secret, { expiresIn });
};

export default generateToken;
