// SearchBar.tsx

import React, { useState } from "react";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  isHome: boolean;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsEditAddModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  filterState?: "available" | "rented" | null;
  setFilterState?: React.Dispatch<React.SetStateAction<"available" | "rented" | null>>;
  filterGenres?: string[];
  setFilterGenres?: React.Dispatch<React.SetStateAction<string[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  isHome,
  searchQuery,
  onSearchChange,
  setIsEditAddModalOpen,
  filterState,
  setFilterState,
  filterGenres,
  setFilterGenres,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const toggleGenre = (genre: string) => {
    if (!setFilterGenres || !filterGenres) return;
    if (filterGenres.includes(genre)) {
      setFilterGenres(filterGenres.filter((g) => g !== genre));
    } else {
      setFilterGenres([...filterGenres, genre]);
    }
  };

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
        <div className="filter-wrapper">
          <button
            className="filter-button"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <div className="filter-icon"></div>
            Filter
          </button>
          {showFilters && (
            <div className="filter-dropdown">
              <div className="filter-section">
                <strong>State</strong>
                <ul>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name="state"
                        value="available"
                        checked={filterState === "available"}
                        onChange={() => setFilterState?.("available")}
                      />
                      Available
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name="state"
                        value="rented"
                        checked={filterState === "rented"}
                        onChange={() => setFilterState?.("rented")}
                      />
                      Rented
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name="state"
                        value="none"
                        checked={filterState === null}
                        onChange={() => setFilterState?.(null)}
                      />
                      All
                    </label>
                  </li>
                </ul>
              </div>
              <div className="filter-section">
                <strong>Genre</strong>
                <ul>
                  {["romance", "thriller", "fiction"].map((genre) => (
                    <li key={genre}>
                      <label>
                        <input
                          type="checkbox"
                          value={genre}
                          checked={filterGenres?.includes(genre)}
                          onChange={() => toggleGenre(genre)}
                        />
                        {genre[0].toUpperCase() + genre.slice(1)}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        {!isHome && (
          <button
            className="new-button"
            onClick={() => {
              setIsEditAddModalOpen!((val) => !val);
            }}
          >
            + New Book
          </button>
        )}
      </div>
    </section>
  );
};

export default SearchBar;
