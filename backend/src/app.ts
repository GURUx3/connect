import express from "express";
import cors from "cors"
import { Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use(cors())

// this is an middleware used to parse (extract) the html form data from the post request
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`App is Running on PORT :  http://localhost:${PORT}`);
});
