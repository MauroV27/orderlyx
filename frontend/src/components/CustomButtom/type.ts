import type { ReactNode } from "react";
import type { ButtonProps } from "@mui/material/Button";

export type CustomButtonSize = "small" | "medium" | "large" | "fullWidth";
export interface CustomButtomProps extends Omit<ButtonProps, "size"> {
  className?: string;
  variant?: "text" | "outlined" | "contained";
  size?: CustomButtonSize;
  icon?: ReactNode;
}
