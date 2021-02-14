import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    icon: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Categories = mongoose.model("Categories", categorySchema);
export default Categories;
