// SearchBar.tsx

import React from "react";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  isHome: boolean;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  isHome,
  searchQuery,
  onSearchChange,
}) => {
  const navigate = useNavigate();

  return (
    <section className="search-section">
      <div className="search-container">
        <div className="search-input-container">
          <div className="search-icon"></div>
          <input
            type="text"
            className="search-input"
            placeholder="Search books by title, author, or genre..."
            value={searchQuery}
            onChange={onSearchChange}
          />
        </div>
        <button className="filter-button">
          <div className="filter-icon"></div>
          Filter
        </button>
        {!isHome && <button className="filter-button">+ New Book</button>}
      </div>
    </section>
  );
};

export default SearchBar;
