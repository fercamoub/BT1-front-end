import React from "react";
import type { Order, Product, ProductForm } from "../types";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../api/products";
import { getComparator } from "../components/ProductList/tableConfig";

export default function useTableLogic() {
  //search hooks
  const [products, setProducts] = React.useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedAvailability, setSelectedAvailability] = React.useState("");

  //MUI Default hooks
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Product>("name");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  //Modal hooks
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [productToEdit, setProductToEdit] = React.useState<Product | null>(
    null
  );

  //get products on mount
  React.useEffect(() => {
    loadProducts();
  }, []);
  const loadProducts = async () => {
    try {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  // Search functionality
  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      const matchesSearchTerm =
        searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "" || product.category === selectedCategory;

      const matchesAvailability =
        selectedAvailability === "" ||
        (selectedAvailability === "available" && product.stock > 0) ||
        (selectedAvailability === "out-of-stock" && product.stock === 0);

      return matchesSearchTerm && matchesCategory && matchesAvailability;
    });
  }, [products, searchTerm, selectedCategory, selectedAvailability]);

  // MUI sorting and pagination logic
  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Product
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = products.map((product: Product) => product.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleSearch = (
    term: string,
    category: string = "",
    availability: string = ""
  ) => {
    setSearchTerm(term);
    setSelectedCategory(category);
    setSelectedAvailability(availability);
    setPage(0);
  };

  //Modal handlers
  const handleCreate = async (productForm: ProductForm) => {
    try {
      const newProduct = await createProduct(productForm);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      setCreateModalOpen(false);
      console.log("Product created successfully", newProduct);
    } catch (err) {
      console.error("Failed to create product:", err);
      throw err; // Re-throw for modal to handle
    }
  };

  const handleEdit = (product: Product) => {
    setProductToEdit(product);
    setEditModalOpen(true);
  };

  const handleDelete = async (productId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmed) return;

    try {
      await deleteProduct(productId);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );

      setSelected((prevSelected) =>
        prevSelected.filter((id) => id !== productId)
      );

      console.log(`Product ${productId} deleted successfully`);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };
  const handleDeleteSelected = async () => {
    if (selected.length === 0) return;
    const confirmed = window.confirm(
      `Are you sure you want to delete ${selected.length} selected product(s)?`
    );
    if (!confirmed) return;

    try {
      // Delete all selected products
      await Promise.all(selected.map((id) => deleteProduct(id)));

      setProducts((prevProducts) =>
        prevProducts.filter((product) => !selected.includes(product.id))
      );

      setSelected([]);
      console.log(`${selected.length} products deleted successfully`);
    } catch (err) {
      console.error("Failed to delete selected products:", err);
    }
  };

  const handleSaveEdit = async (editedProduct: Product) => {
    try {
      const productForm: ProductForm = {
        name: editedProduct.name,
        price: editedProduct.price,
        stock: editedProduct.stock,
        category: editedProduct.category,
        expirationDate: editedProduct.expirationDate,
      };

      const updatedProduct = await updateProduct(editedProduct.id, productForm);

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editedProduct.id ? updatedProduct : product
        )
      );
      setEditModalOpen(false);
      setProductToEdit(null);
      console.log("Product updated successfully:", updatedProduct);
    } catch (err) {
      console.error("Failed to update product:", err);
      throw err;
    }
  };
  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setProductToEdit(null);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredProducts.length)
      : 0;

  const visibleProducts = React.useMemo(
    () =>
      [...filteredProducts]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredProducts, order, orderBy, page, rowsPerPage]
  );

  return {
    //searching
    products: filteredProducts,
    searchTerm,

    // Mui states
    order,
    orderBy,
    selected,
    page,
    dense,
    rowsPerPage,
    emptyRows,
    visibleProducts,

    editModalOpen,
    createModalOpen,
    productToEdit,

    //MUI handlers
    handleRequestSort,
    handleSelectAllClick,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeDense,
    handleSearch,

    //Modal handlers
    handleCreate,
    handleEdit,
    handleSaveEdit,
    handleDelete,
    handleDeleteSelected,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleCloseEditModal,
    loadProducts,
  };
}
