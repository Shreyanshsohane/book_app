import express from "express";
import { addBook } from "../controllers/book_controller.js";

const router = express.Router();

router.post("/add", addBook);

export default router;
