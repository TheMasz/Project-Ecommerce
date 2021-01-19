
import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod.payment,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.paymentMethod.shippingPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: createdOrder });
    }
  })
);
orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);
orderRouter.get(
  "/mine/order",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);
orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orderId = req.params.id;
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
        file.mv(`./frontend/public/uploads/pays/${fileName}`, (err) => {});
        order.paymentImg = {
          name: fileName,
          contentType: file.mimetype,
        };
        order.paidAt = Date.now();
        order.paymentResult = {
          update_time: req.body.date,
          fourCode: req.body.fourCode,
        };
        const updatedOrder = order.save();
      
      } else {
        res.status(400).send({ message: "File is not supported." });
      }
    }else{
      res.status(400).send({ message: "Order not found." });
    }
    res.status(201).send({ message: "Order Paid"  });
    
  })
);
export default orderRouter;
