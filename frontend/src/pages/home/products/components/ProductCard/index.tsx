import { Card, CardContent, Typography } from "@mui/material";
import type { TableCardDataProps } from "../../../../../components/TableCard/type";
import type { ProductRow } from "../../type";

export const ProductCard = <T extends ProductRow>({
  rowData,
}: // columns,
TableCardDataProps<T>) => {
  // const nameColumn = columns.find((c) => c.name === "name")?.label || "Nome";
  // const priceColumn = columns.find((c) => c.name === "price")?.label || "Price";

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {rowData.name}
        </Typography>
        <Typography color="text.secondary">{rowData.price}</Typography>
        {rowData.actions}
      </CardContent>
    </Card>
  );
};
