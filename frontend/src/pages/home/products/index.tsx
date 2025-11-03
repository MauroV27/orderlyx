import { Box, Typography } from "@mui/material";

import layout from "../layout.module.css";
import CustomButton from "../../../components/CustomButtom";
import { Plus } from "lucide-react";

const ProductsPage = () => {
  return (
    <Box className={layout.container}>
      <Box className={layout.header}>
        <Typography className={layout.title}>Lista de produtos</Typography>

        <CustomButton
          variant="contained"
          className={layout.headerAction}
          startIcon={<Plus size={16} />}
        >
          Produto
        </CustomButton>
      </Box>
      <Box>Página de produtos de usuário</Box>
    </Box>
  );
};

export default ProductsPage;
