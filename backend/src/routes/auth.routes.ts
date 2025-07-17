import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

const router = Router();

// const users: { username: string; email: string; password: string }[] = [];

// console.log(users);

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // here findOne is an mongoo db method use to retrival a single document form the collection that match the email in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send("User Already Exist");
    }

    // hashing password with 10 salt rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    // this is the new user object that contains {username, email, and hashed password}
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    // async operation saving the object user into the database using .save() method
    await user.save();
    res.status(201).json({
      success: true,
      message: "Signup Successful",
      user: { username, email },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // using findone method provided by mongoodb check if mail availble in the document
    const user = await User.findOne({ email });

    // if not avalible then reponse with user not found message
    if (!user) {
      return res.status(400).send("User Not Found");
    }

    // if yes  then compare the hashed password  with the current parse from the req.body
    const isMatch = await bcrypt.compare(password, user.password);
    // if not match then responce with the invalid credientials message
    if (!isMatch) {
      return res.status(400).send("Invalid Credentials");
    }

    // if match then responce with the Sucessfull Login message
    res.send({ message: "Login SucessFull" });
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});

export default router;
