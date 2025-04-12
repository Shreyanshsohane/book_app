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
// HomePage.tsx

// ... (imports remain the same)

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

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

  // Filter books based on title, author, or genre
  const filteredBooks = books.filter((book) => {
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query)
    );
  });

  return (
    <div className="app-container">
      <AppBar isHome={true} />
      <SearchBar
        isHome={true}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <main className="books-container">
        {filteredBooks.length > 0 ? (
          <div className="books-fixed-grid">
            {filteredBooks.map((book) => (
              <BookCard key={book._id} isHome={true} book={book} />
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
