import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Categories from "../models/categoriesModel.js";
import Catgories from "../models/categoriesModel.js";

const categoryRouter = express.Router();

categoryRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const categories = await Categories.find({});
    res.send(categories);
  })
);

categoryRouter.get("/seed", async (req, res) => {
  // await Catgories.remove({});
  const createdCategories = await Catgories.insertMany(data.categories);
  res.send({ createdCategories });
});

export default categoryRouter;
