import type { ReactNode } from "react";

export interface BulkModalProps<T> {
  open: boolean;
  title: string;
  maxNumItems: number;
  items: T[];
  renderList: (items: T[]) => React.ReactNode;
  children: ReactNode;
  onCloseAction: () => void;
  onConfirmAction: (selectedItems: T[]) => void;

  listHeaderTitle: string;
  formHeaderTitle: string;
}
