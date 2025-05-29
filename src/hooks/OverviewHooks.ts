import { useState, useEffect } from "react";
import { fetchOverview } from "../api/products";
import type { OverviewData } from "../types";

export const useOverview = () => {
  const [overviewData, setOverviewData] = useState<OverviewData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOverviewData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchOverview();
      setOverviewData(data);
    } catch (err) {
      setError("Failed to fetch overview data");
      console.error("Error fetching overview:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, []);

  return {
    overviewData,
    loading,
    error,
    refetch: fetchOverviewData,
  };
};
