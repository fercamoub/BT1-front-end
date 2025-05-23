import useTableLogic from "../hooks/TableHooks";
import EnhancedTableHead from "./ProductList/TableHeader";
import EnhancedTableBody from "./ProductList/TableBody";
import EnhancedTablePagination from "./ProductList/Pagination";
import EnhancedTableToolbar from "./ProductList/Toolbar";
import DensePaddingControl from "./ProductList/DensePadding";

export default function ProductList() {
  const {
    order,
    orderBy,
    selected,
    page,
    dense,
    rowsPerPage,
    emptyRows,
    visibleProducts,
    handleRequestSort,
    handleSelectAllClick,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeDense,
  } = useTableLogic();

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={products.length}
            />
            <EnhancedTableBody
              visibleProducts={visibleProducts}
              selected={selected}
              onRowClick={handleClick}
              emptyRows={emptyRows}
              dense={dense}
            />
          </Table>
        </TableContainer>
        <EnhancedTablePagination
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <DensePaddingControl dense={dense} onDenseChange={handleChangeDense} />
    </Box>
  );
}
