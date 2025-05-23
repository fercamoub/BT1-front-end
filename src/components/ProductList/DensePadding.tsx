interface DensePaddingControlProps {
  dense: boolean;
  onDenseChange: (event: React.ChangeEvent<HTMLInputListener>) => void;
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
