import { useState } from "react";
//import type { SearchContent } from "../type";
//import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // stop page refresh
    console.log("Searching for:", query);
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
  };

  return (
      <form
        className="d-flex justify-content-start search-form"
        role="search"
        onSubmit={handleSearch}
      >
        <input
          className="form-control me-2"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          aria-label="Search"
        />
      </form>
  );
}
