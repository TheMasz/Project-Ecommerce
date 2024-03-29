import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        products: [
          {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
              required: true,
            },
          },
        ],
        deliveredNumber: {type: String},
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: String },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      tel: { type: String, required: true },
      address: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      update_time: { type: String },
      fourCode: { type: String },
    },
    paymentImg: {
      name: { type: String },
      contentType: { type: String },
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
 
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
