import { useState, useMemo } from "react";
import {
  DialogActions,
  Button,
  Box,
  Select,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import { DeleteIcon } from "lucide-react";
import {
  OrderStatusType,
  type OrderInterface,
  type OrderItemType,
} from "@/interfaces/orders";
import type { ProductInterface } from "@/interfaces/products";
import InputText from "@/components/InputText";

import styles from "./orderModal.module.css";
import { BulkModal } from "@/components/BulkModal";

interface CreateOrderModalProps {
  open: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  products: ProductInterface[];
}

export default function CreateOrderModal({
  open,
  onClose,
  onSubmit,
  products,
}: CreateOrderModalProps) {
  // Campos básicos
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<OrderStatusType>(
    OrderStatusType.PENDING
  );

  // Itens do pedido
  const [items, setItems] = useState<OrderItemType[]>([]);

  // Item temporário para adicionar
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState<number>(1);

  // Flag de listagem (bulkCreate)
  const [listMode, setListMode] = useState(false);

  // Obtém produto selecionado
  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedProductId),
    [selectedProductId, products]
  );

  // Total calculado
  const total = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  const handleAddItem = () => {
    if (!selectedProduct) return;

    const newItem: OrderItemType = {
      productName: selectedProduct.name,
      price: selectedProduct.price,
      quantity,
    };

    setItems((prev) => [...prev, newItem]);
    setSelectedProductId("");
    setQuantity(1);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSave = () => {
    onSubmit({
      customerName,
      customerAddress,
      date,
      status,
      items,
      total,
      listMode,
    });

    // Limpa tudo após salvar
    setCustomerName("");
    setCustomerAddress("");
    setDate("");
    setStatus(OrderStatusType.PENDING);
    setItems([]);
    setListMode(false);

    onClose();
  };

  return (
    <BulkModal<OrderInterface>
      open={open}
      title={"Criação de pedido"}
      maxNumItems={10}
      items={[]}
      renderList={function (items: OrderInterface[]): React.ReactNode {
        return (
          <Box>
            {items.map((it) => (
              <div key={it.id}>{it.customerName}</div>
            ))}
          </Box>
        );
      }}
      onCloseAction={function (): void {
        onClose();
      }}
      onConfirmAction={function (selectedItems: OrderInterface[]): void {
        onSubmit(selectedItems);
      }}
      formHeaderTitle="Pedido"
      listHeaderTitle="Lista de Pedidos"
    >
      <Box className={styles.modalComponent}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* Dados do cliente */}
          <InputText
            label="Nome do cliente"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            fullWidth
          />

          <InputText
            label="Endereço do cliente"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            fullWidth
          />

          <InputText
            label="Data"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as OrderStatusType)}
          >
            {Object.values(OrderStatusType).map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>

          {/* Itens do pedido */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Itens do pedido
          </Typography>

          {/* Linha de adição de item */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              label="Produto"
            >
              {products.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name} — R$ {p.price.toFixed(2)}
                </MenuItem>
              ))}
            </Select>

            <InputText
              type="number"
              label="Quantidade"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />

            <Button
              variant="contained"
              onClick={handleAddItem}
              disabled={!selectedProductId}
            >
              Adicionar
            </Button>
          </Box>

          {/* Lista de itens adicionados */}
          <Box sx={{ mt: 2 }}>
            {items.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1,
                  borderBottom: "1px solid #ddd",
                }}
              >
                <Typography>
                  {item.productName} — {item.quantity} × R${" "}
                  {item.price.toFixed(2)}
                </Typography>

                <IconButton
                  color="error"
                  onClick={() => handleRemoveItem(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>

          {/* Total */}
          <Typography variant="h6" sx={{ textAlign: "right", mt: 2 }}>
            Total: <strong>R$ {total.toFixed(2)}</strong>
          </Typography>
        </Box>

        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={items.length === 0}
          >
            Salvar pedido
          </Button>
        </DialogActions>
      </Box>
    </BulkModal>
  );
}
