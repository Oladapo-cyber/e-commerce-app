import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      rewuired: true,
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: {
        org: { type: Number, default: 0.0 },
        mrp: { type: Number, default: 0.0 },
        off: { type: Number, default: 0 },
      },
      default: { org: 0.0, mrp: 0.0, off: 0 },
    },
    sizes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);
//Export a model called Products with the schema UserSchema
export default mongoose.model("Products", ProductsSchema);
