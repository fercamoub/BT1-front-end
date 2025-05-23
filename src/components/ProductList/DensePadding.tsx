import React from "react";
import { FormControlLabel, Switch } from "@mui/material";

interface DensePaddingControlProps {
  dense: boolean;
  onDenseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DensePaddingControl({
  dense,
  onDenseChange,
}: DensePaddingControlProps) {
  return (
    <FormControlLabel
      control={<Switch checked={dense} onChange={onDenseChange} />}
      label="Dense padding"
    />
  );
}
