import { Box, Tab, Tabs } from "@mui/material";
import { Navbar } from "../../components/Navbar";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import styles from "./home.module.css";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Define a aba ativa com base na URL atual
  const currentTab = location.pathname.split("/").pop() || "orders";

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    navigate(`/home/${newValue}`);
  };

  // Caso o usuário acesse /home sem especificar, redireciona pra /home/orders
  useEffect(() => {
    if (location.pathname === "/home") {
      navigate("/home/orders");
    }
  }, [location, navigate]);

  return (
    <>
      <Navbar />

      <Box>
        <Tabs
          className={styles.homePageTabSelector}
          value={currentTab}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Pedidos" value="orders" />
          <Tab label="Produtos" value="products" />
          <Tab label="Dashboard" value="dashboard" />
        </Tabs>

        <Box className={styles.homePageContentContainer}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
