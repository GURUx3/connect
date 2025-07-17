import express from "express";
import cors from "cors";
import authRouter from "../src/routes/auth.routes"; // adjust path as needed
import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/auth-db")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // needed to parse JSON body

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
