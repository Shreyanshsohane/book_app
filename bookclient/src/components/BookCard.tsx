import React, { useState } from "react";
import "./BookCard.css";
import { Book } from "../utils/models";
import BookDetailsModal from "./BookDetailModal";

const BookCard: React.FC<{ isHome: boolean; book: Book }> = ({
  isHome,
  book,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="book-card" onClick={handleCardClick}>
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

      {isModalOpen && (
        <BookDetailsModal book={book} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default BookCard;
