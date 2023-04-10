import mongoose from "mongoose";
const { ObjectId  } = mongoose.Schema.Types;

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
      image: {
        type: String,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Product", productsSchema)

