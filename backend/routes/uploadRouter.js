import multer from "multer";
import express from "express";
import { isAuth } from "../utils.js";
import expressAsyncHandler from "express-async-handler";
import fs from "fs";

const uploadRouter = express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb){
//     cb(null, '../../uploads/')
//   },
//   filename(req, file, cb){
//     cb(null, Date.now())
//   }
// })

const upload = multer();

uploadRouter.post(
  "/",
  isAuth,
  upload.single("file"),
   (req, res, next) => {
    const img = req.file;
    const orderId = req.body.orderId;
    const encode_image = img.toString('base64')
    console.log(orderId);
    // const {
    //   file,
    //   body: { name },
    // } = req;
    // const fileName = Date.now() + "." + file.mimetype.split("/")[1];
    // await file.stream, fs.createWriteStream(`./uploads/${fileName}`);

    // res.send("file uploaded as" + fileName);
  }
);

export default uploadRouter;
