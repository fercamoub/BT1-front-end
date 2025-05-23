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
}

export default function EnhancedTableBody({
  visibleProducts,
  selected,
  onRowClick,
  emptyRows,
  dense,
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
          />
        );
      })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: (dense ? 33 : 53) * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
}
