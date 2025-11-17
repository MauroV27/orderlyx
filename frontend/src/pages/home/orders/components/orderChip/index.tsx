import React from "react";
import { Chip, useTheme } from "@mui/material";
import type { OrderStatusType } from "../../../../../interfaces/orders";

// Definindo as cores com base nos estados
const statusColors: {
  [key in OrderStatusType]: { color: string; text: string };
} = {
  PENDING: { text: "Aberto", color: "var(--status-toBeInited)" },
  CONFIRMED: { text: "Confirmado", color: "var(--status-inproduction)" },
  PROCESSING: { text: "Em produção", color: "var(--status-created)" },
  SHIPPED: { text: "Saiu para entrega", color: "var(--status-ontheway)" },
  DELIVERED: { text: "Entregue", color: "var(--status-delivered)" },
  CONCLUDED: { text: "Concluido", color: "var(--status-concluded)" },
  CANCELED: { text: "Cancelado", color: "var(--status-canceled)" },
};

// Definindo o tipo do prop
interface OrderStatusChipProps {
  status: OrderStatusType;
}

const OrderStatusChip: React.FC<OrderStatusChipProps> = ({ status }) => {
  const theme = useTheme();

  const backgroundColor = statusColors[status].color;
  const statusText = statusColors[status].text;

  return (
    <Chip
      label={statusText}
      sx={{
        backgroundColor: backgroundColor,
        color: theme.palette.getContrastText(backgroundColor),
        borderRadius: "16px",
        fontWeight: "bold",
        padding: "6px 12px",
        height: "32px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        textTransform: "capitalize",
      }}
    />
  );
};

export default OrderStatusChip;
