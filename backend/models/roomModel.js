import mongoose from "mongoose";
import { messageSchema } from "./messageModel.js";

const roomSchema = new mongoose.Schema(
  {
    roomTitle: {
      type: String,
      required: true,
    },
    namespace: {
      type: String,
      required: true,
    },
    lastMessage: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    conversationHistory: [messageSchema],
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
