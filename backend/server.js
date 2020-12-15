import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = 'mongodb+srv://TheMasz:T7hTTCcJECDZAu1U@db.ca2ih.mongodb.net/E_Commerce?retryWrites=true&w=majority';
mongoose
     .connect( uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));



app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.get("/", (req, res) => {
  res.send("server ready");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`running on http://localhost:${port}`);
});
