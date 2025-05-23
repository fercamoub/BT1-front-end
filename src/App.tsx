import Search from "./components/Search";

function App() {
  return (
    <>
      <div className="flex flex-col w-3/4 min-h-screen mx-auto mt-10 bg-gray-100 gap-4 p-4">
        <div>
          <Search />
        </div>
        <div className=" ">
          <button className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2">
            New Product
          </button>
        </div>
        <div>
          <ProductList />
        </div>
      </div>
    </>
  );
}

export default App;
