import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import data from "../data.js";
import User from "../models/userModel.js";
import { generateToken, isAdmin, isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.get("/seed", async (req, res) => {
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers });
});

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar:user.avatar,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

userRouter.get(
  "/info/:id",
  expressAsyncHandler(async (req, res) => {
    const userInfo = await User.findById(req.params.id);
    if (userInfo) {
      res.send({
        _id: userInfo._id,
        name: userInfo.name,
        email: userInfo.email,
        avatar: userInfo.avatar,
        createdAt: userInfo.createdAt,
      });
    } else {
      return res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.put(
  "/profile/:id/edit",

  expressAsyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      user.avatar = req.body.fileName;
      const updatedUser = await user.save();
      res.status(201).send(updatedUser);
      if(req.files.file){
        req.files.file.mv(`./frontend/public/uploads/users/${req.files.file.name}`);
      }
    } else {
      res.status(404).send({ message: "User Not Found" });
    }

  })
);

userRouter.get(
  "/list",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find();
    if (users) {
      res.send(users);
    } else {
      res.status(404).send({ message: "Users Not Found" });
    }
  })
);

export default userRouter;
