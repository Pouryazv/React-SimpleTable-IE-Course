import React from 'react';
import './SearchBar.css'; 

function SearchBar({ onNameSearch, onTitleSearch }) {
  return (
    <div className="search-bar-container">
      <input
        className="search-bar-input"
        type="text"
        placeholder="Search by name..."
        onChange={(e) => onNameSearch(e.target.value)}
      />
      <input
        className="search-bar-input"
        type="text"
        placeholder="Search by title..."
        onChange={(e) => onTitleSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
