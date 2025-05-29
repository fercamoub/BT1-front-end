import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import EnhancedTableHead from "./ProductList/TableHeader";
import EnhancedTableBody from "./ProductList/TableBody";
import EnhancedTablePagination from "./ProductList/Pagination";
import EnhancedTableToolbar from "./ProductList/Toolbar";

interface ProductListProps {
  tableLogic: ReturnType<typeof import("../hooks/TableHooks").default>;
}

export default function ProductList({ tableLogic }: ProductListProps) {
  const {
    products,
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
    handleEdit,
    handleDelete,
    handleDeleteSelected,
    handleMarkOutOfStockSelected,
    handleRefillSelected,
    handleSearch,
    searchTerm,
  } = tableLogic;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onDeleteSelected={handleDeleteSelected}
          onMarkOutOfStockSelected={handleMarkOutOfStockSelected}
          onRefillSelected={handleRefillSelected}
          onSearch={handleSearch}
          searchTerm={searchTerm}
        />
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
              onEdit={handleEdit}
              onDelete={handleDelete}
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
    </Box>
  );
}
