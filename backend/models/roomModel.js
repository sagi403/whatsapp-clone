import mongoose from "mongoose";
import { messageSchema } from "./messageModel.js";

const roomSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    lastMessage: {
      type: String,
    },
    lastSenderId: {
      type: String,
    },
    conversationHistory: [messageSchema],
    unreadConversationHistory: [messageSchema],
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;

export { roomSchema };
