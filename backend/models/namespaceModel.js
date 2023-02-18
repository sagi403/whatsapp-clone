import mongoose from "mongoose";

const namespaceSchema = new mongoose.Schema(
  {
    userNs: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    endpoint: {
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

const Namespace = mongoose.model("Namespace", namespaceSchema);

export default Namespace;
