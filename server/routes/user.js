const express = require("express");
const { User } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const router = express.Router();

const signupSchema = zod.object({
  email: zod.string(),
  password: zod.string().min(5),
  name: zod.string(),
});

router.post("/signup", async (req, res) => {
  const userObject = req.body;
  const response = signupSchema.safeParse(userObject);

  if (!response.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    email: userObject.email,
  });

  if (existingUser)
    res.status(411).json({
      message: "Email already taken",
    });

  const user = await User.create({
    email: userObject.email,
    password: userObject.password,
    name: userObject.name,
  });

  const userId = user._id;

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.json({
    message: "User created successfully",
    token: token,
  });
});

const signinSchema = zod.object({
  email: zod.string(),
  password: zod.string().min(5),
});

router.post("/signin", async (req, res) => {
  const userObject = req.body;
  const response = signinSchema.safeParse(userObject);

  if (!response.success) {
    res.status(411).json({
      msg: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    email: userObject.email,
    password: userObject.password,
  });

  if (user) {
    const userId = user._id;

    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({
      token: token,
    });
  } else {
    res.status(411).json({
      message: "Error while logging in",
    });
  }
});

module.exports = router;
