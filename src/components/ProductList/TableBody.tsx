import React from "react";
import type { Product } from "../../types";
import { TableBody, TableRow, TableCell } from "@mui/material";
import EnhancedTableRow from "./TableRow";

interface TableBodyProps {
  visibleProducts: Product[];
  selected: readonly number[];
  onRowClick: (event: React.MouseEvent<unknown>, id: number) => void;
  emptyRows: number;
  dense: boolean;
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

export default function EnhancedTableBody({
  visibleProducts,
  selected,
  onRowClick,
  emptyRows,
  dense,
  onEdit,
  onDelete,
}: TableBodyProps) {
  return (
    <TableBody>
      {visibleProducts.map((product, index) => {
        const isItemSelected = selected.includes(product.id);

        return (
          <EnhancedTableRow
            key={product.id}
            product={product}
            index={index}
            isItemSelected={isItemSelected}
            onRowClick={onRowClick}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: (dense ? 33 : 53) * emptyRows,
          }}
        >
          <TableCell colSpan={7} />
        </TableRow>
      )}
    </TableBody>
  );
}
