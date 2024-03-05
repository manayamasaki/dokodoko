import React from 'react';
import './Search.css';

class Search extends React.Component{
  render(){
  return (
    <div>
      <div className="SearchBar">
      <input type="text" id="search_books" placeholder="本を検索" />
      </div>
    </div>
  );
}
}

export default Search;