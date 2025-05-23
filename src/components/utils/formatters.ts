function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

export { formatPrice, formatDate };
