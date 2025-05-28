import NewProductModal from "./components/NewProductModal";
import ProductList from "./components/ProductList";
import ProductStats from "./components/ProductStats";
import Search from "./components/Search";
import useTableLogic from "./hooks/TableHooks";

function App() {
  const tableLogic = useTableLogic();

  return (
    <>
      <div className="flex flex-col w-3/4 min-h-screen mx-auto mt-10 bg-gray-100 gap-4 p-4">
        <div>
          <Search
            onSearch={(
              searchTerm: string,
              category: string,
              availability: string
            ) => {
              tableLogic.handleSearch(searchTerm, category, availability);
            }}
            searchTerm={tableLogic.searchTerm}
          />
        </div>
        <div>
          <button
            onClick={tableLogic.handleOpenCreateModal}
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
          >
            New Product
          </button>
        </div>
        <div>
          <ProductList tableLogic={tableLogic} />
        </div>
        <div></div>
      </div>

      <NewProductModal
        visible={tableLogic.createModalOpen}
        onClose={tableLogic.handleCloseCreateModal}
        onCreate={tableLogic.handleCreate}
      />
    </>
  );
}

export default App;
