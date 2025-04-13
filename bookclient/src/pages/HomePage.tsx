// BookSwapHome.tsx
import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";
import SearchBar from "../components/SearchBar";
import { Book } from "../utils/models";
import BookCard from "../components/BookCard";
import Footer from "../components/Footer";
import { getAllBooks } from "../services/api/books.ts";

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [filterState, setFilterState] = useState<"available" | "rented" | null>(null);
  const [filterGenres, setFilterGenres] = useState<string[]>([]);
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

  const filteredBooks = books.filter((book) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query);

    const matchesState =
      filterState === null ||
      (filterState === "available" && book.isAvailable) ||
      (filterState === "rented" && !book.isAvailable);

    const matchesGenre =
      filterGenres.length === 0 ||
      filterGenres.includes(book.genre.toLowerCase());

    return matchesSearch && matchesState && matchesGenre;
  });

  return (
    <div className="app-container">
      <AppBar isHome={true} />
      <SearchBar
        isHome={true}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        filterState={filterState}
        setFilterState={setFilterState}
        filterGenres={filterGenres}
        setFilterGenres={setFilterGenres}
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
