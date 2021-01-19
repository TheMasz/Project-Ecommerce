import express from "express";
import { isAuth } from "../utils.js";


import Order from "../models/orderModel.js";


const uploadRouter = express.Router();

uploadRouter.post("/pay", isAuth, async (req, res, next) => {
  const orderId = req.body.orderId;
  const order = await Order.findById(orderId);
  const file = req.files.file;
  const fileName =
    orderId + "-" + Date.now() + "." + file.mimetype.split("/")[1];
  if (order) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/tiff" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif"
    ) {
      file.mv(`./uploads/pays/${fileName}`, (err) => {
        if (err) {
          res.status(400).send({ message: err });
        } else {
          order.paymentImg = {
            name: fileName,
            contentType: file.mimetype,
          }
          const updatedOrder = order.save();
          res.send({ message: "Order Paid"});
        }
      });
    } else {
      res.status(404).send({ message: "File is not support" });
    }
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

export default uploadRouter;
