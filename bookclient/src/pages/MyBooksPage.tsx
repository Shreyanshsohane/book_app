// StoreScreen.tsx
import React, { use, useEffect, useState } from "react";
import "./MyBooksPage.css";
import AppBar from "../components/AppBar";
import SearchBar from "../components/SearchBar";
import { getOwnerBooks } from "../services/api/books";
import { Book } from "../utils/models";
import BookCard from "../components/BookCard";
import AddEditBookModal from "../components/AddEditBookModal";
// import "./"

const MyBooksPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [books, setBooks] = useState<Book[]>([]);

  const [isEditAddModalOpen, setIsEditAddModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getOwnerBooks();
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

  const closeAddEditModal = () => {
    setIsEditAddModalOpen(false);
  };
  return (
    <div className="app-container">
      <AppBar isHome={false} />
      <SearchBar
        isHome={false}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        setIsEditAddModalOpen={setIsEditAddModalOpen}
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
      {isEditAddModalOpen && (
        <AddEditBookModal onClose={closeAddEditModal} isAdding={true} />
      )}
    </div>
  );
};

export default MyBooksPage;
