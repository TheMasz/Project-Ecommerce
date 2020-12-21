import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  nodes: { type: Array },
});

const Categories = mongoose.model("Categories", categorySchema);
export default Categories;
