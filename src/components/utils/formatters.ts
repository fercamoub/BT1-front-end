function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

function formatDate(date: string | Date | null): string {
  if (!date) return "N/A";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return "Invalid Date";
  }

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatStock(stock: number): string {
  if (stock <= 0) {
    return "Out of Stock";
  } else if (stock < 10) {
    return `${stock} (Low Stock)`;
  }
  return stock.toString();
}

const formatCurrency = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

function formatNumber(value: number): string {
  return value.toLocaleString();
}

function getExpirationStatus(
  expirationDate: Date | null
): "none" | "expired" | "week" | "twoWeeks" | "good" {
  if (!expirationDate) return "none";

  const now = new Date();
  const expDate = new Date(expirationDate);
  const diffTime = expDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "expired";
  if (diffDays < 7) return "week";
  if (diffDays < 14) return "twoWeeks";
  return "good";
}

function getStockStatus(stock: number): "good" | "medium" | "low" | "out" {
  if (stock === 0) return "out";
  if (stock < 5) return "low";
  if (stock <= 10) return "medium";
  return "good";
}

export {
  formatPrice,
  formatDate,
  formatStock,
  formatCurrency,
  formatNumber,
  getExpirationStatus,
  getStockStatus,
};
