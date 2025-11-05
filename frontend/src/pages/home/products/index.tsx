import { Box, Typography } from "@mui/material";

import layout from "../layout.module.css";
import CustomButton from "../../../components/CustomButtom";
import { AlertCircle, PenIcon, Plus, Trash2 } from "lucide-react";
import { TableCard } from "../../../components/TableCard";

import { productColumns } from "./constants";
import { ProductCard } from "./components/ProductCard";
import type { ProductRow } from "./type";
import { useEffect, useState } from "react";
import { ProductService } from "../../../services/product";
import { BasicModal } from "../../../components/BasicModal";
import InputText from "../../../components/InputText";
import InputNumeric from "../../../components/InputNumeric";
import { type ProductInterface } from "../../../interfaces/products";

const myFormatValue = (v: number | null | undefined): string => {
  // Exemplo: 20.05 -> "R$ 20,05"
  if (v === null || v === undefined) return "";
  return `R$ ${v.toFixed(2).replace(".", ",")}`;
};

const myParseValue = (v: string): string => {
  if (!v) return "";
  return v
    .replace(/[^\d,\-.]/g, "") // Remove tudo exceto números e separadores
    .replace(",", "."); // Troca a vírgula por ponto (padrão JS)
};

const ProductsPage = () => {
  const [loading, setIsLoading] = useState<boolean>(true);

  const [productData, setProductData] = useState<ProductRow[]>([]);

  const [productModalState, setProductModalState] = useState<
    "create" | "update" | "delete" | null
  >(null);

  const [productModalData, setProductModalData] =
    useState<Partial<ProductInterface>>();

  const fetchListProduct = async (): Promise<void> => {
    const resp = await ProductService.listProducts();

    const productList = resp.data;

    setIsLoading(false);

    const mapProducts =
      productList?.map((product) => {
        const mappedRow = {
          name: product.name,
          price: product.price,
          actions: (
            <Box className={layout.actions}>
              <CustomButton
                variant="outlined"
                icon={<PenIcon size={16} />}
                onClick={() => {
                  setProductModalData(product);
                  setProductModalState("update");
                }}
              />

              <CustomButton
                variant="outlined"
                icon={<Trash2 size={16} />}
                className={layout.actionDelete}
                onClick={() => {
                  setProductModalData(product);
                  setProductModalState("delete");
                }}
              />
            </Box>
          ),
        };
        return mappedRow as ProductRow;
      }) || [];

    setProductData(mapProducts);
  };

  const onHandleProductCreate = async () => {
    if (!productModalData) return;
    const { name, price } = productModalData;

    if (!name || !price) return;
    await ProductService.registerProduct({ name, price });
  };

  const onHandleProductUpdate = async () => {
    if (!productModalData) return;
    const { name, price, id } = productModalData;

    if (!name || !price || !id) return;
    await ProductService.updateProduct({ name, price, id });
  };

  useEffect(() => {
    fetchListProduct();
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
            onClick={() => setProductModalState("create")}
          >
            Produto
          </CustomButton>
        </Box>

        <Box>
          <TableCard<ProductRow>
            data={productData}
            columns={productColumns}
            minWidthForTable={768}
            renderCard={(props) => <ProductCard {...props} />}
          />
        </Box>
      </Box>
      <BasicModal
        open={productModalState === "create" || productModalState === "update"}
        title={
          productModalState === "create"
            ? "Registro de novo produto"
            : "Atualização do produto"
        }
        onConfirmAction={(): void => {
          console.log({ productModalData });
          if (productModalState === "update") {
            onHandleProductUpdate();
          } else {
            onHandleProductCreate();
          }

          setProductModalState(null);
        }}
        onCloseAction={() => setProductModalState(null)}
        disableConfirmButton={
          (productModalData?.name ?? "").trim().length < 0 ||
          (productModalData?.price ?? 0) <= 0
        }
      >
        <Box>
          <InputText
            label="Nome do produto"
            value={productModalData?.name ?? ""}
            onChange={(v) => {
              setProductModalData((prev) => ({
                ...prev,
                name: v.target.value as string,
              }));
            }}
          />

          <InputNumeric
            label="Valor do produto"
            value={productModalData?.price ?? 0}
            onChange={(value: number | null): void => {
              if (value) {
                setProductModalData((prev) => ({
                  ...prev,
                  price: value as number,
                }));
              }
            }}
            formatValue={myFormatValue}
            parseValue={myParseValue}
          />
        </Box>
      </BasicModal>
      <BasicModal
        open={productModalState === "delete"}
        title={`Deseja deletar: ${productModalData?.name}?`}
        onConfirmAction={(): void => {
          console.log({ productModalData });
          // onHandleDeleteProduct()
          setProductModalState(null);
        }}
        onCloseAction={() => setProductModalState(null)}
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

export default ProductsPage;
