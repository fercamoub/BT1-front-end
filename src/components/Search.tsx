//This component is a search component that allows to filter the product list by name, description, and category.

export default function Search() {
  return (
    <div className="p-4  rounded-lg flex grid gap-4 bg-gray-200 shadow-md">
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 rounded-lg py-2 px-4 w-1/2"
      />
      <label htmlFor="Category">
        <select
          id="Category"
          className="border border-gray-300 rounded-lg py-2 px-4 w-1/3 ml-2"
        >
          <option value="">All Categories</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
      </label>
      <div>
        <label htmlFor="Availability">
          <select
            id="Availability"
            className="border border-gray-300 rounded-lg py-2 px-4 w-1/3 ml-2"
          >
            <option value="">All Availability</option>
            <option value="available">Available</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </label>
        <button className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2">
          Search
        </button>
      </div>
    </div>
  );
}
