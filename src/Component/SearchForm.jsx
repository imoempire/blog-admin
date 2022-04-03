import React, { useState } from "react";
import { useSearch } from "../context/searchProvider";
import { AiOutlineClose } from "react-icons/ai";
export default function SearchForm() {
  const [query, setQuery] = useState('');
  const { handleSearch, resetSearch, searchResult } = useSearch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) return;
    handleSearch(query);
  };

  const handleReset = (e) => {
    resetSearch();
    setQuery("");
  };

  const handleKey = (e) => {
    if (e.key === "Escape") resetSearch();
  };

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <input
        value={query}
        onKeyDown={handleKey}
        onChange={({ target }) => setQuery(target.value)}
        placeholder="Search Post..."
        className="border border-gray-500 outline-none rounded p-1 focus:ring-1 ring-blue-500 w-56"
      />
      {searchResult.length ? (
        <button onClick={handleReset} className="absolute top-1/2 -translate-y-1/2 text-gray-700 right-3">
          <AiOutlineClose />
        </button>
      ) : null}
    </form>
  );
}