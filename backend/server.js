import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import upload from 'express-fileupload';
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import categoryRouter from "./routes/categoriesRouter.js";
import orderRouter from "./routes/orderRouter.js";
import uploadRouter from "./routes/uploadRouter.js";

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use(upload());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri =
  "mongodb+srv://TheMasz:T7hTTCcJECDZAu1U@db.ca2ih.mongodb.net/E_Commerce?retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.use('/api/uploads', uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", orderRouter);



app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
  res.send("server ready");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`running on http://localhost:${port}`);
});
