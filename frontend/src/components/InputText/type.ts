import type { TextFieldProps } from "@mui/material";
import type { ReactNode } from "react";

export interface InputTextProps extends Omit<TextFieldProps, "label"> {
  label?: string;
  className?: string;

  iconStart?: ReactNode;
  iconEnd?: ReactNode;
}
