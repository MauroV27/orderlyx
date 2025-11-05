import type { ReactNode } from "react";
import type { TableCardRow } from "../../../components/TableCard/type";

export interface ProductRow extends TableCardRow {
  name: string;
  price: number;
  actions: ReactNode;
}
