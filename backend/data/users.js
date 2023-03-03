import bcrypt from "bcryptjs";
import generateAvatar from "../utils/generateAvatar.js";

const users = [
  {
    username: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
    avatarColors: generateAvatar(),
  },
  {
    username: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    avatarColors: generateAvatar(),
  },
  {
    username: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
    avatarColors: generateAvatar(),
  },
  {
    username: "John Wick",
    email: "wick@example.com",
    password: bcrypt.hashSync("123456", 10),
    avatarColors: generateAvatar(),
  },
];

export default users;
