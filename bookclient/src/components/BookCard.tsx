import React, { useState } from "react";
import "./BookCard.css";
import { Book } from "../utils/models";
import BookDetailsModal from "./BookDetailModal";
import DeleteModal from "./deleteModal";
import AddEditBookModal from "./AddEditBookModal";

const BookCard: React.FC<{
  isHome: boolean;
  book: Book;
  refresh?: () => void;
}> = ({ isHome, book, refresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDeletedModalOpen, setIsDeletedModalOpen] = useState<boolean>(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const [isEditAddModalOpen, setIsEditAddModalOpen] = useState<boolean>(false);
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
              <button
                className="Edit-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditAddModalOpen!(true);
                }}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeletedModalOpen(true);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <BookDetailsModal book={book} onClose={() => setIsModalOpen(false)} />
      )}
      {isDeletedModalOpen && (
        <DeleteModal
          itemName={book.title}
          onClose={() => setIsDeletedModalOpen(false)}
          id={book._id}
          refresh={refresh!}
        />
      )}
      {isEditAddModalOpen && (
        <AddEditBookModal
          onClose={() => {
            setIsEditAddModalOpen(false);
          }}
          isAdding={false}
          book={book}
          refresh={refresh!}
        />
      )}
    </>
  );
};

export default BookCard;
