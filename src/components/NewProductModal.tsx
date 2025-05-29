import React, { useState } from "react";
import type { ProductForm } from "../types";

interface NewProductModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (product: ProductForm) => Promise<void>;
}

const NewProductModal: React.FC<NewProductModalProps> = ({
  visible,
  onClose,
  onCreate,
}) => {
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    price: 0,
    stock: 0,
    category: "",
    expirationDate: new Date(),
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "expirationDate") {
      setFormData((prev) => ({
        ...prev,
        [name]: new Date(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "price" || name === "stock" ? Number(value) : value,
      }));
    }
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError("Product name is required.");
      return false;
    }
    if (formData.price <= 0) {
      setError("Price must be greater than 0.");
      return false;
    }
    if (formData.stock < 0) {
      setError("Stock cannot be negative.");
      return false;
    }
    if (!formData.category.trim()) {
      setError("Category is required.");
      return false;
    }
    if (!formData.expirationDate) {
      setError("Expiration date is required.");
      return false;
    }

    // Check if expiration date is not in the past
    const expirationDate = new Date(formData.expirationDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (expirationDate < today) {
      setError("Expiration date cannot be in the past.");
      return false;
    }

    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError("");

      // Create a clean product form with properly formatted data
      const productToCreate: ProductForm = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category.trim(),
        expirationDate: new Date(formData.expirationDate),
      };

      await onCreate(productToCreate);

      setFormData({
        name: "",
        price: 0,
        stock: 0,
        category: "",
        expirationDate: new Date(),
      });
      onClose();
    } catch (err) {
      setError("Failed to create product. Please try again.");
      console.error("Error creating product:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      price: 0,
      stock: 0,
      category: "",
      expirationDate: new Date(),
    });
    setError("");
    onClose();
  };

  if (!visible) return null;

  const formatDateForInput = (date: Date): string => {
    if (!date || !(date instanceof Date)) {
      return new Date().toISOString().split("T")[0];
    }
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Create New Product</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Enter product category"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter any category (e.g., Congelados, Bebidas, Lácteos, etc.)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Stock *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Expiration Date *
            </label>
            <input
              type="date"
              name="expirationDate"
              value={formatDateForInput(formData.expirationDate)}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={handleCreate}
            disabled={loading}
            className={`px-4 py-2 rounded text-white font-medium ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            } transition-colors`}
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
          <button
            onClick={handleClose}
            disabled={loading}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProductModal;
