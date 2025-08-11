import React, { useState } from "react";

const SearchBar = ({ listrestro, setlist }) => {
  const [searchText, setSearchText] = useState("");
  
  return (
    <div>
      <div className="flex items-center gap-2 mx-3">
        <input
          className="w-64 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400"
          type="search"
          value={searchText}
          placeholder="Search restaurants..."
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          onClick={() => {
            setlist(
              listrestro.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              )
            );
            console.log("filter", setlist);
          }}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow hover:brightness-110 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Search
        </button>
      </div>
    </div>
  );
};
export default SearchBar;
