import React from "react";
import {
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Box,
  Button,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

interface EnhancedTableToolbarProps {
  numSelected: number;
  onDeleteSelected?: () => void;
  onSearch?: (searchTerm: string) => void;
  searchTerm?: string;
  onAddProduct?: () => void;
}

export default function EnhancedTableToolbar({
  numSelected,
  onDeleteSelected,
  onSearch,
  searchTerm = "",
}: EnhancedTableToolbarProps) {
  const [localSearchTerm, setLocalSearchTerm] = React.useState(searchTerm);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleDeleteSelected = () => {
    if (onDeleteSelected) {
      onDeleteSelected();
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
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", flex: "1 1 100%" }}>
          <Typography
            variant="h6"
            id="tableTitle"
            component="div"
            sx={{ mr: 2 }}
          >
            Product Inventory
          </Typography>
        </Box>
      )}

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {numSelected > 0 ? (
          <Tooltip title="Delete selected">
            <IconButton onClick={handleDeleteSelected} color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </Box>
    </Toolbar>
  );
}
