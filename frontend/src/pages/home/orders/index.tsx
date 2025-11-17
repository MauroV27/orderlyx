import { Box, Typography } from "@mui/material";

import layout from "../layout.module.css";
import CustomButton from "../../../components/CustomButtom";
import { AlertCircle, PenIcon, Plus, Trash2 } from "lucide-react";
import { TableCard } from "../../../components/TableCard";

import { useEffect, useState } from "react";

import { BasicModal } from "../../../components/BasicModal";
import type { OrderInterface } from "../../../interfaces/orders";
import { OrderService } from "../../../services/order";
import type { OrderRow } from "./type";
import OrderStatusChip from "./components/orderChip";
import { orderColumns } from "./constants";
import type { ProductInterface } from "@/interfaces/products";
import { ProductService } from "@/services/product";
import CreateOrderModal from "./components/CreateOrderModal";

const OrdersPage = () => {
  const [loading, setIsLoading] = useState<boolean>(true);
  const [orderData, setOrderData] = useState<OrderRow[]>([]);

  const [orderModalState, setOrderModalState] = useState<
    "create" | "update" | "delete" | null
  >(null);

  const [orderModalData, setOrderModalData] =
    useState<Partial<OrderInterface>>();

  const [productList, setProductList] = useState<ProductInterface[]>([]);

  const fetchAllProducts = async (): Promise<void> => {
    const products = await ProductService.listProducts();

    setProductList(products.data);
  };

  const fetchListOrder = async (): Promise<void> => {
    const resp = await OrderService.listOrders();

    const orderList = resp.data;

    setIsLoading(false);

    const mapOrders =
      orderList?.map((order) => {
        const mappedRow = {
          name: order.customerName,
          price: order.totalPrice ?? "-",
          amount: order.items.length.toString() ?? "-",
          status: <OrderStatusChip status={order.status} />,
          actions: (
            <Box className={layout.actions}>
              <CustomButton
                variant="outlined"
                icon={<PenIcon size={16} />}
                onClick={() => {
                  setOrderModalData(order);
                  setOrderModalState("update");
                }}
              />

              <CustomButton
                variant="outlined"
                icon={<Trash2 size={16} />}
                className={layout.actionDelete}
                onClick={() => {
                  setOrderModalData(order);
                  setOrderModalState("delete");
                }}
              />
            </Box>
          ),
        };

        return mappedRow as OrderRow;
      }) || [];

    setOrderData(mapOrders);
  };

  const onHandleOrderCreate = async () => {
    if (!orderModalData) return;
    // const {  } = orderModalData;

    // if (!name || !price) return;
    // await OrderService.registerOrder({ name, price });
  };

  const onHandleOrderUpdate = async () => {
    if (!orderModalData) return;
    // const { name, price, id } = orderModalData;

    // if (!name || !price || !id) return;
    // await OrderService.updateOrder({ name, price, id });
  };

  useEffect(() => {
    fetchListOrder();
    fetchAllProducts();
  }, []);

  return (
    <>
      <Box className={layout.container}>
        <Box className={layout.header}>
          <Typography className={layout.title}>Lista de produtos</Typography>

          <CustomButton
            variant="contained"
            className={layout.headerAction}
            startIcon={<Plus size={16} />}
            onClick={() => setOrderModalState("create")}
          >
            Produto
          </CustomButton>
        </Box>

        <Box>
          <TableCard<OrderRow>
            data={orderData}
            columns={orderColumns}
            minWidthForTable={768}
            renderCard={(props) => <div />}
          />
        </Box>
      </Box>
      <CreateOrderModal
        open={orderModalState === "create" || orderModalState === "update"}
        products={productList}
        onSubmit={(v) => console.log(v)}
        onClose={() => setOrderModalState(null)}
      />
      {/* <BasicModal
        open={false}
        title={
          orderModalState === "create"
            ? "Registro de novo produto"
            : "Atualização do produto"
        }
        onConfirmAction={(): void => {
          console.log({ orderModalData });
          if (orderModalState === "update") {
            onHandleOrderUpdate();
          } else {
            onHandleOrderCreate();
          }

          setOrderModalState(null);
        }}
        onCloseAction={() => setOrderModalState(null)}
        disableConfirmButton={undefined}
      >
        <Box>
           <InputText
            label="Nome do produto"
            value={orderModalData?.name ?? ""}
            onChange={(v) => {
              setOrderModalData((prev) => ({
                ...prev,
                name: v.target.value as string,
              }));
            }}
          />

          <InputNumeric
            label="Valor do produto"
            value={orderModalData?.price ?? 0}
            onChange={(value: number | null): void => {
              if (value) {
                setOrderModalData((prev) => ({
                  ...prev,
                  price: value as number,
                }));
              }
            }}
            formatValue={myFormatValue}
            parseValue={myParseValue}
          /> 
        </Box>
      </BasicModal> */}
      <BasicModal
        open={orderModalState === "delete"}
        title={`Deseja deletar esse Pedido?`}
        onConfirmAction={(): void => {
          console.log({ orderModalData });
          // onHandleDeleteOrder()
          setOrderModalState(null);
        }}
        onCloseAction={() => setOrderModalState(null)}
      >
        <Box className={layout.modalDeleteContainer}>
          <Box className={layout.modalDeleteContent}>
            <AlertCircle color="var(--color-error)" size={24} />
            <Typography>Essa ação é inreversivel, deseja confirmar?</Typography>
          </Box>
        </Box>
      </BasicModal>
    </>
  );
};

export default OrdersPage;
