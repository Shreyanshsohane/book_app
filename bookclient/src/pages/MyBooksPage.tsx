// StoreScreen.tsx
import React, { useEffect, useState } from "react";
import "./MyBooksPage.css";
import AppBar from "../components/AppBar";
import SearchBar from "../components/SearchBar";
import getAllBooks from "../services/api/books";
import { Book } from "../utils/models";
import BookCard from "../components/BookCard";
// import "./"

const MyBooksPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [books, setBooks] = useState<Book[]>([]);

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const openFilters = () => {
    console.log("Filter clicked");
  };

  const addNewBook = () => {
    console.log("Add New Book");
  };

  return (
    <div className="app-container">
      <AppBar isHome={false} />
      <SearchBar
        isHome={true}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <main className="books-container">
        {books.length > 0 ? (
          <div className="books-fixed-grid">
            {books.map((book) => (
              <BookCard isHome={false} book={book} />
            ))}
          </div>
        ) : (
          <div className="no-books">No books in your store yet.</div>
        )}
      </main>
    </div>
  );
};

export default MyBooksPage;
