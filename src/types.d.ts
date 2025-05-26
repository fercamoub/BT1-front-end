export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  expirationDate: Date;
  actions?: React.ReactNode;
}
export interface ProductForm {
  name: string;
  price: number;
  stock: number;
  category: string;
  expirationDate: Date;
}
export type Order = "asc" | "desc";

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Product;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Product
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface EditModalProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}

export interface ActionHandlers {
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}
