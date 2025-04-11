import express from "express";
import { addBook } from "../controllers/book_controller.js";
import { upload } from "../middleware/multer_middleware.js";

const router = express.Router();

router.post("/add", upload.single("img"), addBook);

export default router;
