import type { TableCardColumnHeader } from "../../../components/TableCard/type";

export const orderColumns: TableCardColumnHeader[] = [
  {
    label: "Nome do Cliente",
    name: "name",
    width: "35%",
  },
  {
    label: "Preço total",
    name: "price",
    width: "15%",
  },
  {
    label: "N° de Produtos",
    name: "amount",
    width: "20%",
  },
  {
    label: "Status",
    name: "status",
    width: "20%",
  },
  {
    label: "",
    name: "actions",
    width: "10%",
  },
];
