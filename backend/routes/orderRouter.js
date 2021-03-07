import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAdmin, isAuth } from "../utils.js";

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
  "/admin/order",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const pickerPrev = req.query.pickerPrev;
    const pickerNext = req.query.pickerNext;

    const orders = await Order.find();
    if (orders) {
      if (pickerPrev && pickerNext) {
        const date = orders.filter(
          (order) =>
            order.createdAt >= new Date(pickerPrev) &&
            order.createdAt <= new Date(pickerNext)
        );
        res.send(date);
      } else {
        const orderDESC = orders.sort((a, b) => b.createdAt - a.createdAt);
        res.send(orderDESC);
      }
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);
orderRouter.get(
  "/mine/order",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({createdAt:-1});
    res.send(orders);
  })
);
orderRouter.get(
  "/sell/order",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const pickerPrev = req.query.pickerPrev;
    const pickerNext = req.query.pickerNext;
    const orders = await Order.find();
    const seller = req.user._id;
    const arr = [];
    const convertArrayToObject = (array) => {
      const initialValue = {};
      return array.reduce((obj, item) => {
        return {
          ...obj,
          item,
        };
      }, initialValue);
    };
    const order = orders.map((order) => {
      const orderId = order._id;
      const isPaid = order.isPaid;
      const address = order.shippingAddress;
      const orderItems = order.orderItems;
      const createdAt = order.createdAt;
      arr.push({
        orderId: orderId,
        isPaid: isPaid,
        shippingAddress: address,
        orderItems: orderItems,
        createdAt: createdAt,
      });
    });
    const resultArr = [];
    const orderFilter = arr.map((item) => {
      const a = item.orderItems.filter((result) => result.seller == seller);
      const b = convertArrayToObject(a);
      const obj = {
        orderId: item.orderId,
        ...b,
        isPaid: item.isPaid,
        ...item.shippingAddress,
        createdAt: item.createdAt,
      };
      resultArr.push(obj);
    });
    if (pickerPrev && pickerNext) {
      const c = resultArr.filter((result) => result.item);
      const date = c.filter(
        (a) =>
          a.createdAt >= new Date(pickerPrev) &&
          a.createdAt <= new Date(pickerNext)
      );
      return res.send(date);
    } else {
      const c = resultArr
        .filter((result) => result.item)
        .sort((a, b) => b.createdAt - a.createdAt);

      return res.send(c);
    }
  })
);
orderRouter.get(
  "/sell/order/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    const seller = req.user._id;
    const arr = [];
    const convertArrayToObject = (array) => {
      const initialValue = {};
      return array.reduce((obj, item) => {
        return {
          ...obj,
          item,
        };
      }, initialValue);
    };
    const a = order.orderItems.filter((result) => result.seller == seller);
    const b = convertArrayToObject(a);
    const obj = {
      ...b,
      isPaid: order.isPaid,
      paymentMethod: order.paymentMethod,
      ...order.shippingAddress,
      orderId: order._id,
    };

    res.send(obj);
  })
);
orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    const file = req.files.file;
    const fileName = orderId + "." + file.mimetype.split("/")[1];
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
        const updatedOrder = await order.save();
      } else {
        res.status(400).send({ message: "File is not supported." });
      }
    } else {
      res.status(400).send({ message: "Order not found." });
    }
    res.status(201).send({ message: "Order Paid" });
  })
);

orderRouter.put(
  "/delivered/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const seller = req.user._id;
    const order = await Order.findById(orderId);
    if (order) {
      const orderFilter = await order.orderItems.find(
        (a) => a.seller == seller
      );
      const orderFilter2 = await order.orderItems.map((a) => a);
      orderFilter.isDelivered = true;
      orderFilter.deliveredNumber = req.body.deliveredNumber;
      orderFilter.deliveredAt = req.body.date;
      order.orderItems =  orderFilter2;
      console.log("orderFilter1 :", orderFilter);
      console.log("orderFilter2 :", orderFilter2);
      const updatedOrder = await order.save();
      res.status(201).send({ message: "Order Delivered" });
    } else {
      res.status(400).send({ message: "Order not found." });
    }
  })
);

orderRouter.put(
  "/ispaid/:id",
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      const updatedOrder = await order.save();
    } else {
      res.status(400).send({ message: "Order not found." });
    }
    res.status(201).send({ message: "Order Paid" });
  })
);

export default orderRouter;
