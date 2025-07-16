import { Router } from "express";

const router = Router();

const users: { username: string; email: string; password: string }[] = [];

// GET /login → show login form
router.get("/login", (_req, res) => {
  
  res.send();
});

// GET /signup → show signup form
router.get("/signup", (_req, res) => {
  res.send(`
    <html>
      <head><title>Signup</title></head>
      <body>
        <form action="/api/auth/signup" method="post" class="form-example">
          <div class="form-example">
            <label for="username">Username:</label>
            <input type="text" name="username" id="username" required />
          </div>
          <div class="form-example">
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" required />
          </div>
          <div class="form-example">
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" required />
          </div>
          <div class="form-example">
            <input type="submit" value="Sign Up" />
          </div>
        </form>
      </body>
    </html>
  `);
});

// POST /signup → store user data
router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  console.log("Signup Data", username, email, password);
  users.push({ username, email, password });

  res.send(`<h1>Signup Successful. Welcome, ${username}!</h1>`);
});

// POST /login → validate credentials
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (user && user.password === password) {
    res.send(`<h1>Welcome back, ${user.username}</h1>`);
  } else {
    res.send(`<h1>Invalid email or password</h1>`);
  }
});

export default router;
