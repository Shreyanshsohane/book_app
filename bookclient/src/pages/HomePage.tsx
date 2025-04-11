// BookSwapHome.tsx
import React, { useEffect, useState } from "react";
import "./HomePage.css";
import getAllBooks from "../services/api/books";

interface Book {
  _id: string;
  owner: string;
  title: string;
  author: string;
  genre: string;
  city: string;
  contact: string;
  isAvailable: boolean;
  bookCoverUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log(localStorage.getItem("token"));
  });
  const [books, setBooks] = useState<Book[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const openFilters = () => {
    // Filter functionality will be implemented here
    console.log("Open filters");
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getAllBooks();
        setBooks(response.books);
      } catch (error) {
        console.error("Error fetching books:", (error as Error).message);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="app-container">
      {/* App Bar */}
      <header className="app-bar">
        <div className="app-title">
          <div className="app-logo"></div>
          BookSwap
        </div>
        <div className="profile-icon">
          <div className="profile-icon-svg"></div>
        </div>
      </header>

      {/* Search Section */}
      <section className="search-section">
        <div className="search-container">
          <div className="search-input-container">
            <div className="search-icon"></div>
            <input
              type="text"
              className="search-input"
              placeholder="Search books by title, author, or genre..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <button className="filter-button" onClick={openFilters}>
            <div className="filter-icon"></div>
            Filter
          </button>
        </div>
      </section>

      {/* Books Grid */}
      <main className="books-container">
        {books.length > 0 ? (
          <div className="books-fixed-grid">
            {books.map((book) => (
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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-books">
            No books found. Try adjusting your search or filters.
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
