import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;

export { messageSchema };
