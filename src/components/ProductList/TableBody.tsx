interface TableBodyProps {
  visibleProducts: Product[];
  selected: readonly string[];
  onRowClick: (event: React.MouseEvent<unknown>, id: string) => void;
  emptyRows: number;
  dense: boolean;
}

function EnhancedTableBody({
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
