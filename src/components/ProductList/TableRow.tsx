import React from "react";
import type { Product } from "../../types";
import { TableRow, TableCell, Checkbox, IconButton, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  formatPrice,
  formatDate,
  getExpirationStatus,
  getStockStatus,
} from "../utils/formatters";

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

  const getRowBackgroundColor = () => {
    const expirationStatus = getExpirationStatus(product.expirationDate);
    switch (expirationStatus) {
      case "week":
        return "#ffebee"; // Light red
      case "twoWeeks":
        return "#fff8e1"; // Light yellow
      case "good":
        return "#e8f5e8"; // Light green
      case "none":
      default:
        return "transparent";
    }
  };

  const getStockCellColor = () => {
    const stockStatus = getStockStatus(product.stock);
    switch (stockStatus) {
      case "medium":
        return "#fff3e0";
      case "low":
        return "#ffebee";
      case "out":
      case "good":
      default:
        return "transparent";
    }
  };

  const isOutOfStock = product.stock === 0;

  return (
    <TableRow
      hover
      onClick={(event) => onRowClick(event, product.id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={product.id}
      selected={isItemSelected}
      sx={{
        cursor: "pointer",
        backgroundColor: getRowBackgroundColor(),
        "&:hover": {
          backgroundColor: (theme) =>
            theme.palette.action.hover + " !important",
        },
      }}
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
      <TableCell
        align="left"
        sx={{
          textDecoration: isOutOfStock ? "line-through" : "none",
          color: isOutOfStock ? "text.disabled" : "text.primary",
        }}
      >
        {product.category}
      </TableCell>
      <TableCell
        component="th"
        id={labelId}
        scope="row"
        padding="none"
        sx={{
          textDecoration: isOutOfStock ? "line-through" : "none",
          color: isOutOfStock ? "text.disabled" : "text.primary",
        }}
      >
        {product.name}
      </TableCell>
      <TableCell
        align="right"
        sx={{
          textDecoration: isOutOfStock ? "line-through" : "none",
          color: isOutOfStock ? "text.disabled" : "text.primary",
        }}
      >
        {formatPrice(product.price)}
      </TableCell>
      <TableCell
        align="left"
        sx={{
          textDecoration: isOutOfStock ? "line-through" : "none",
          color: isOutOfStock ? "text.disabled" : "text.primary",
        }}
      >
        {formatDate(product.expirationDate)}
      </TableCell>
      <TableCell
        align="right"
        sx={{
          backgroundColor: getStockCellColor(),
          textDecoration: isOutOfStock ? "line-through" : "none",
          color: isOutOfStock ? "text.disabled" : "text.primary",
          fontWeight: product.stock < 5 ? "bold" : "normal",
        }}
      >
        {product.stock}
      </TableCell>
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
