import express from "express";
import {
  addBook,
  deleteBook,
  getBooks,
  getOwnerBooks,
  updateBook,
} from "../controllers/book_controller.js";
import { upload } from "../middleware/multer_middleware.js";

const router = express.Router();

router.post("/add", upload.single("img"), addBook);

router.get("/getAll", getBooks);

router.get("/getOwner", getOwnerBooks);

router.delete("/delete/:id", deleteBook);

router.put("/update/:id", upload.single("img"), updateBook);

export default router;
