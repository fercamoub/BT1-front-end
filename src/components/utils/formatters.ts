function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

function formatDate(date: string | Date): string {
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

export { formatPrice, formatDate, formatStock, formatCurrency, formatNumber };
