import express from "express";
const app = express();

import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT;

import authRoute from "./routes/auth_routes.js";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("ll");
    throw err;
  }
};

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.use("/api/auth", authRoute);

app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  const JWT_SECRET = process.env.JWT_SECRET;
  console.log(token);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
});

app.listen(PORT, () => {
  connect();
  console.log("Server is running", PORT);
});
