import type { Product, HeadCell, Order } from "../../types";

export const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Product Name",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price ($)",
  },
  {
    id: "stock",
    numeric: true,
    disablePadding: false,
    label: "Stock",
  },
  {
    id: "expirationDate",
    numeric: false,
    disablePadding: false,
    label: "Expiration Date",
  },
];

// Mock data for testing
export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Organic Apples",
    price: 4.99,
    stock: 150,
    category: "Fruits",
    expirationDate: "2024-06-15",
  },
  {
    id: 2,
    name: "Whole Milk",
    price: 3.49,
    stock: 75,
    category: "Dairy",
    expirationDate: "2024-05-30",
  },
  {
    id: 3,
    name: "Sourdough Bread",
    price: 5.99,
    stock: 25,
    category: "Bakery",
    expirationDate: "2024-05-28",
  },
  // Add more mock data as needed
];

// Comparator functions
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
