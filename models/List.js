import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
  {
    list: {
      type: String,
      required: true,
      maxlength: 60,
    },
  },
  { timestamps: true }
);

export default mongoose.models.List ||
  mongoose.model("List", ListSchema);
