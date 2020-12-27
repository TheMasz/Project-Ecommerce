import multer from "multer";
import express from "express";
import { isAuth } from "../utils.js";
import expressAsyncHandler from "express-async-handler";

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../../uploads/");
  },
  filename(req, file, cb) {
    cb(null, Date.now());
  },
});
const upload = multer({ storage });

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
    res.send(req.body);
  });
export default uploadRouter;
