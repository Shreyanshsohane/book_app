import Book from "../models/book_model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, genre, city, contact } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Book cover image is required" });
    }

    const upload = await uploadOnCloudinary(req.file.path);
    const bookCoverUrl = upload.url;

    const ownerId = req.user?.userId;
    if (!ownerId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user ID found" });
    }

    if (!title || !author || !city || !contact) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBook = new Book({
      owner: ownerId,
      title,
      author,
      genre,
      city,
      contact,
      bookCoverUrl,
    });

    await newBook.save();

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
