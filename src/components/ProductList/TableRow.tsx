import type { Product } from "../../types";
import { TableRow, TableCell, Checkbox } from "@mui/material";
import { formatPrice, formatDate } from "../utils/formatters";

interface TableRowProps {
  product: Product;
  index: number;
  isItemSelected: boolean;
  onRowClick: (event: React.MouseEvent<unknown>, id: number) => void;
}

export default function EnhancedTableRow({
  product,
  index,
  isItemSelected,
  onRowClick,
}: TableRowProps) {
  const labelId = `enhanced-table-checkbox-${index}`;

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
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {product.name}
      </TableCell>
      <TableCell align="right">{formatPrice(product.price)}</TableCell>
      <TableCell align="right">{product.stock}</TableCell>
      <TableCell align="left">{product.category}</TableCell>
      <TableCell align="left">{formatDate(product.expirationDate)}</TableCell>
    </TableRow>
  );
}
