import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    parentId: { type: String },
  },
  { timestamps: true }
);

const Categories = mongoose.model("Categories", categorySchema);
export default Categories;
