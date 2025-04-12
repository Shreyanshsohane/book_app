// BookSwapHome.tsx
import React, { useEffect, useState } from "react";
import "./HomePage.css";
import getAllBooks from "../services/api/books";
import { useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";
import SearchBar from "../components/SearchBar";
import { Book } from "../utils/models";
import BookCard from "../components/BookCard";
import Footer from "../components/Footer";

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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
      <AppBar isHome={true} />

      <SearchBar isHome={true} />

      <main className="books-container">
        {books.length > 0 ? (
          <div className="books-fixed-grid">
            {books.map((book) => (
              <BookCard isHome={true} book={book} />
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
