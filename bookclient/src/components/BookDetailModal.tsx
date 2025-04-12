import React from "react";
import "./BookDetailModal.css";
import { Book } from "../utils/models";

interface Props {
  book: Book | null;
  onClose: () => void;
}

const BookDetailsModal: React.FC<Props> = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div className="beautiful-modal-overlay" onClick={onClose}>
      <div className="beautiful-modal" onClick={(e) => e.stopPropagation()}>
        <button className="beautiful-close" onClick={onClose}>
          ×
        </button>
        <img
          src={book.bookCoverUrl}
          alt={book.title}
          className="beautiful-modal-image"
        />
        <div className="beautiful-modal-details">
          <div className="title-with-status">
            <h2>{book.title}</h2>
            <span
              className={`status-badge ${
                book.isAvailable ? "available" : "unavailable"
              }`}
            >
              {book.isAvailable ? "Available" : "Borrowed"}
            </span>
          </div>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Genre:</strong> {book.genre}
          </p>

          <div className="owner-details">
            <h3>Owner Details</h3>
            <p>
              <strong>City:</strong> {book.city}
            </p>
            <p>
              <strong>Contact:</strong> {book.contact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsModal;
