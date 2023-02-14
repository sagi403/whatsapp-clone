import mongoose from "mongoose";

const namespaceSchema = new mongoose.Schema(
  {
    nsTitle: {
      type: String,
      required: true,
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
