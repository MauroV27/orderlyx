import type { ReactNode } from "react";
import type { TableCardRow } from "../../../components/TableCard/type";

export interface OrderRow extends TableCardRow {
  name: string;
  price: string;
  amount: string;
  status: ReactNode;
  actions: ReactNode;
}
