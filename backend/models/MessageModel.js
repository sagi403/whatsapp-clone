import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    receiver: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
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

const Message = mongoose.model("Message", messageSchema);

export default Message;

export { messageSchema };
