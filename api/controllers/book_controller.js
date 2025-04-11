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

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getOwnerBooks = async (req, res) => {
  try {
    const ownerId = req.user?.userId;
    const books = await Book.find({owner : ownerId});
    res.status(200).json({ books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, city, contact } = req.body;
    const ownerId = req.user?.userId;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.owner.toString() !== ownerId) {
      return res.status(403).json({ message: "Forbidden: Not your book" });
    }

    let bookCoverUrl = book.bookCoverUrl;
    if (req.file) {
      const upload = await uploadOnCloudinary(req.file.path);
      bookCoverUrl = upload.url;
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        title,
        author,
        genre,
        city,
        contact,
        bookCoverUrl,
      },
      { new: true }
    );

    res.status(200).json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const ownerId = req.user?.userId;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.owner.toString() !== ownerId) {
      return res.status(403).json({ message: "Forbidden: Not your book" });
    }

    await Book.findByIdAndDelete(id);

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
