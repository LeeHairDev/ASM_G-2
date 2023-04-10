import mongoose from "mongoose";
const { ObjectId  } = mongoose.Types;
// console.log(ObjectId);

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    products: [
      {
        type: ObjectId,
        ref: "Product",
      }
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Category", categorySchema);

