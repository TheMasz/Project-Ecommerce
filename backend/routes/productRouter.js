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
    const name = req.query.name || "";
    const category = req.query.category || "";
    const sortBy = req.query.sortBy || "";
    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
    const categoryFilter = category ? { category } : {};
    const sortByFilter =
      sortBy === "ctime"
        ? { createdAt: -1 }
        : sortBy === "relevancy"
        ? { createdAt: 1 }
        : sortBy === "lowest"
        ? { price: 1 }
        : sortBy === "highest"
        ? { price: -1 }
        : {};
  
    const products = await Product.find({
      ...nameFilter,
      ...categoryFilter,
    }).sort(sortByFilter);
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
  "/shop/seller/:id",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({ seller: req.params.id });
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
    const arr = [];
    for (let index in file) {
      arr.push(file[index].name);
    }
    if (file) {
      const product = new Product({
        name: req.body.name,
        seller: req.user._id,
        images: arr,
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
      for (let i in file) {
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
    const arr = [];
    const images = JSON.parse(req.body.images);
    for (let index in images) {
      if (images[index] != "" && images[index] != null) {
        arr.push(images[index]);
      }
    }

    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.images = arr;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      for (let i in file) {
        await file[
          i
        ].mv(
          `./frontend/public/uploads/products/${productId}/${file[i].name}`,
          (err) => {}
        );
      }
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
    return res.status(201).send({ message: "Product Updated" });
  })
);
productRouter.delete(
  "/product/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: "Product Deleted", product: deleteProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default productRouter;
