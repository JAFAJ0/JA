import React from "react";
function SearchBar({ keyword, setKeyword, placeholder }) {
  return (
    <div className="input">
      <input
        value={keyword}
        placeholder={placeholder}
        onChange={(e) => setKeyword(e.target.value)}
        type="text"
      />
    </div>
  );
}

export default SearchBar;
