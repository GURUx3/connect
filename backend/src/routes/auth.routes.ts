import { Router } from "express";

const router = Router();

const users: { username: string; email: string; password: string }[] = [];

console.log(users);

// POST /api/auth/signup
router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res
      .status(409)
      .json({ success: false, message: "User already exists" });
  }

  users.push({ username, email, password });
  console.log("User signed up:", username, email);

  res.status(201).json({
    success: true,
    message: "Signup successful",
    user: { username, email },
  });
});

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user || user.password !== password) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  res.json({
    success: true,
    message: "Login successful",
    user: { username: user.username, email },
  });
});

export default router;
