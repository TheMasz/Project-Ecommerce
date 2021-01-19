import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Categories from "../models/categoriesModel.js";

const categoryRouter = express.Router();

const slugify = (str) => {
  return str
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace("%", "เปอร์เซนต์") // Translate some charactor
    .replace(/[^\u0E00-\u0E7F\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "");
};

const createCategories = (categories, parentId) => {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat)=>{
      return cat.parentId == undefined;
    })
  } else {
    category = categories.filter((cat)=>{
      return cat.parentId == parentId;
    })
    
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
};

categoryRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const categories = await Categories.find({});
    if (categories) {
      const categoryList = createCategories(categories);
      res.send( categoryList );
    }
  })
);

// categoryRouter.get("/seed", async (req, res) => {
//   await Catgories.remove({});
//   const createdCategories = await Catgories.insertMany(data.categories);
//   res.send({ createdCategories });
// });

categoryRouter.post("/category/create", (req, res) => {
  const category = new Categories({
    name: req.body.name,
    slug: slugify(req.body.name),
  });
  if (req.body.parentId) {
    category.parentId = req.body.parentId;
  }
  category.save((error, category) => {
    if (error) return res.status(400).send({ error });
    if (category) return res.status(201).send({ category });
  });
});

export default categoryRouter;
