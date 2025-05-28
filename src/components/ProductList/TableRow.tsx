import React from "react";
import type { Product } from "../../types";
import { TableRow, TableCell, Checkbox, IconButton, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { formatPrice, formatDate } from "../utils/formatters";

interface TableRowProps {
  product: Product;
  index: number;
  isItemSelected: boolean;
  onRowClick: (event: React.MouseEvent<unknown>, id: number) => void;
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

export default function EnhancedTableRow({
  product,
  index,
  isItemSelected,
  onRowClick,
  onEdit,
  onDelete,
}: TableRowProps) {
  const labelId = `enhanced-table-checkbox-${index}`;

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent row selection
    onEdit(product);
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete(product.id);
  };

  return (
    <TableRow
      hover
      onClick={(event) => onRowClick(event, product.id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={product.id}
      selected={isItemSelected}
      sx={{ cursor: "pointer" }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{
            "aria-labelledby": labelId,
          }}
        />
      </TableCell>
      <TableCell align="left">{product.category}</TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {product.name}
      </TableCell>
      <TableCell align="right">{formatPrice(product.price)}</TableCell>
      <TableCell align="left">{formatDate(product.expirationDate)}</TableCell>
      <TableCell align="right">{product.stock}</TableCell>
      <TableCell align="right">
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            size="small"
            onClick={handleEditClick}
            color="default"
            title="Edit product"
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleDeleteClick}
            color="default"
            title="Delete product"
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
}
