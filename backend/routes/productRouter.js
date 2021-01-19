import express from "express";
import expressAsyncHandler from "express-async-handler";
import fs from "fs";
import data from "../data.js";
import Product from "../models/productModel.js";
import { isAuth } from "../utils.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouter.get(
  "/product/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      return res.status(404).send({ message: "Product Not Found" });
    }
  })
);
productRouter.get(
  "/category/:category",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({ category: req.params.category });
    if (products) {
      res.send(products);
    } else {
      return res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.get(
  "/showList/:showList",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({ showList: req.params.showList });
    if (products) {
      res.send(products);
    } else {
      return res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.post(
  "/product/create",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const file = req.files;
    for(let test in file)

      if (file) {
        const product = new Product({
          name: req.body.name,
          seller: req.user._id,
          images: [
            file.img1 ? { url: file.img1.name } : { url: "" },
            file.img2 ? { url: file.img2.name } : { url: "" },
            file.img3 ? { url: file.img3.name } : { url: "" },
            file.img4 ? { url: file.img4.name } : { url: "" },
          ],

          brand: req.body.brand,
          category: req.body.category,
          description: req.body.description,
          price: req.body.price,
          countInStock: req.body.countInStock,
        });
        const createProduct = await product.save();

        fs.mkdir(
          `./frontend/public/uploads/products/${createProduct._id}`,
          { recursive: true },
          (err) => {}
        );
        for (var i in file) {
          // const fileName =
          //   createProduct._id +
          //   "-" +
          //   i +
          //   Date.now() +
          //   "." +
          //   file[i].mimetype.split("/")[1];
          await file[
            i
          ].mv(
            `./frontend/public/uploads/products/${createProduct._id}/${file[i].name}`,
            (err) => {}
          );
        }
      } else {
        res.status(400).send({ message: "Please select your file." });
      }
    return res.status(201).send({ message: "New Product Created" });
  })
);

productRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.find({ seller: req.user._id });
    res.send(product);
  })
);

productRouter.put(
  "/product/:id/edit",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const file = req.files;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.images = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      res.send({ message: "Product Updated", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default productRouter;
