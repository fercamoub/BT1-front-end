import { IconButton, Tooltip, Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import RestockIcon from "@mui/icons-material/Refresh";

interface EnhancedTableToolbarProps {
  numSelected: number;
  onDeleteSelected?: () => void;
  onMarkOutOfStockSelected?: () => void;
  onRefillSelected?: () => void;
  onSearch?: (searchTerm: string) => void;
  searchTerm?: string;
  onAddProduct?: () => void;
}

export default function EnhancedTableToolbar({
  numSelected,
  onDeleteSelected,
  onMarkOutOfStockSelected,
  onRefillSelected,
}: EnhancedTableToolbarProps) {
  const handleDeleteSelected = () => {
    if (onDeleteSelected) {
      onDeleteSelected();
    }
  };

  const handleMarkOutOfStockSelected = () => {
    if (onMarkOutOfStockSelected) {
      onMarkOutOfStockSelected();
    }
  };

  const handleRefillSelected = () => {
    if (onRefillSelected) {
      onRefillSelected();
    }
  };

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          minHeight: "64px !important",
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : null}

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {numSelected > 0 ? (
          <>
            <Tooltip title="Mark selected as out of stock">
              <IconButton
                onClick={handleMarkOutOfStockSelected}
                color="default"
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refill selected products">
              <IconButton onClick={handleRefillSelected} color="default">
                <RestockIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete selected">
              <IconButton onClick={handleDeleteSelected} color="default">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : null}
      </Box>
    </Toolbar>
  );
}
