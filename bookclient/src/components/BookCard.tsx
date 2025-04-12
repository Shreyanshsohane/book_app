import React from "react";
import "./BookCard.css";
import { Book } from "../utils/models";

const BookCard: React.FC<{ isHome: boolean; book: Book }> = ({
  isHome,
  book,
}) => {
  return (
    <div className="book-card" key={book._id}>
      <div className="book-thumbnail-container">
        <img
          src={book.bookCoverUrl}
          alt={book.title}
          className="book-thumbnail"
        />
        <div
          className={`availability-badge ${
            book.isAvailable ? "available" : "unavailable"
          }`}
        >
          {book.isAvailable ? "Available" : "Borrowed"}
        </div>
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <div className="book-genre">{book.genre}</div>

        {!isHome && (
          <div className="book-actions">
            <button className="edit-button">Edit</button>
            <button className="delete-button">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
