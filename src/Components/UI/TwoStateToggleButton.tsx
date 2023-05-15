import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React from "react";

interface ToggleButtonOption {
  value: string;
  label: string;
}

interface TwoStateToggleButtonProps {
  value: string;
  onChange: (newValue: string) => void;
  options: ToggleButtonOption[];
  size?: "small" | "medium" | "large";
}

export function TwoStateToggleButton({
  value,
  onChange,
  options,
  size = "small",
}: TwoStateToggleButtonProps) {
  const handleToggle = (event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    if (newValue !== null) {
      onChange(newValue === value ? "" : newValue);
    }
  };

  const getFontSize = () => {
    switch (size) {
      case "small":
        return "0.65rem";
      case "medium":
        return "0.825rem";
      case "large":
        return "1rem";
      default:
        return "0.875rem";
    }
  };

  return (
    <ToggleButtonGroup value={value} exclusive onChange={handleToggle}>
      {options.map((option) => (
        <ToggleButton
          key={option.value}
          value={option.value}
          style={{
            height: size === "large" ? 30 : size === "medium" ? 22.5 : 15,
          }}
        >
          <Typography sx={{ fontSize: getFontSize() }}>{option.label} </Typography>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
