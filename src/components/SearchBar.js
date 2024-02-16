// SearchBar.js
import React from 'react';
import './SearchBar.css';

function SearchBar() {
  return (
    <div>
      <div className="SearchBar">
      <input type="text" id="search_books" placeholder="本を検索" />
      </div>
      <div className="AddBooks">
        <button>+</button>
      </div>
    </div>
  );
}

export default SearchBar;
