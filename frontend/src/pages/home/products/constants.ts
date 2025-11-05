import type { TableCardColumnHeader } from "../../../components/TableCard/type";

export const productColumns: TableCardColumnHeader[] = [
  {
    label: "Nome do Produto",
    name: "name",
    width: "65%",
  },
  {
    label: "Preço do Produto",
    name: "price",
    width: "25%",
  },
  {
    label: "",
    name: "actions",
    width: "10%",
  },
];
