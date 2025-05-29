import React, { useState } from "react";
import loadCategories from "../hooks/TableHooks";

interface SearchProps {
  onSearch: (
    searchTerm: string,
    category: string,
    availability: string
  ) => void;
  searchTerm: string;
}

export default function Search({ onSearch, searchTerm }: SearchProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const tableHooks = loadCategories();
  const categories = tableHooks.products
    ? Array.from(
        new Set(tableHooks.products.map((product: any) => product.category))
      )
    : [];

  const handleSearch = () => {
    onSearch(localSearchTerm, selectedCategory, selectedAvailability);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setLocalSearchTerm("");
    setSelectedCategory("");
    setSelectedAvailability("");
    onSearch("", "", "");
  };

  return (
    <div className="p-4 rounded-lg flex grid gap-4 bg-white shadow-md">
      <input
        type="text"
        placeholder="Search by name or category..."
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        className="border border-gray-300 rounded-lg py-2 px-4 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label htmlFor="Category">
        <select
          id="Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-4 w-1/3 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category: string) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <div>
        <label htmlFor="Availability">
          <select
            id="Availability"
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 px-4 w-1/3 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Availability</option>
            <option value="available">Available </option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </label>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2 transition-colors"
        >
          Search
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-500 text-white font-medium py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 ml-2 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
