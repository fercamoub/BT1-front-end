import { useState, useEffect } from "react";
import { fetchOverview } from "../api/products";

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);

  const loadCategories = async () => {
    try {
      const overviewData = await fetchOverview();
      const uniqueCategories = Array.from(
        new Set(overviewData.map((item) => item.category))
      );
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error loading categories:", error);
      setCategories([]);
    }
  };
  useEffect(() => {
    loadCategories();
  }, []);

  return { categories, loadCategories };
};
