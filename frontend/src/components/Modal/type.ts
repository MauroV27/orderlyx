import type { DialogProps } from "@mui/material";
import type { ReactNode } from "react";

export type BasicModalProps = DialogProps & {
  open: boolean;
  onConfirmAction: () => void;
  onCloseAction: () => void;
  children: ReactNode;
  title: string;
  titleConfirmAction?: string;
  titleCancelAction?: string;
};
