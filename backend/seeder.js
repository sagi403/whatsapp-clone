import dotenv from "dotenv";
import users from "./data/users.js";
import messages from "./data/messages.js";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import Room from "./models/roomModel.js";
import generateRandomNumber from "./utils/generateRandomNumber.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Room.deleteMany();

    const createdUsers = await User.insertMany(users);
    const rooms = [];

    for (let i = 0; i < createdUsers.length - 1; i++) {
      const conversationHistory = [];

      for (let j = 0; j < 5; j++) {
        conversationHistory.push({
          receiverId: createdUsers[generateRandomNumber(i, i + 1)],
          text: messages[generateRandomNumber(0, messages.length - 1)],
          time: new Date().toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      }

      const room = {
        participants: [createdUsers[i].id, createdUsers[i + 1].id],
        lastMessage: conversationHistory[conversationHistory.length - 1].text,
        conversationHistory,
      };
      rooms.push(room);
    }

    await Room.insertMany(rooms);

    console.log("Data Imported!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Room.deleteMany();

    console.log("Data Destroyed!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
