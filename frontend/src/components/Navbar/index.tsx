import { Box, Menu, MenuItem } from "@mui/material";
import styles from "./navbar.module.css";
import { useState } from "react";
import { useAuth } from "../../auth/useAuth";
import CustomButton from "../CustomButtom";

import { useNavigate } from "react-router";
import Logo from "../Logo";

export const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onHandleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box className={styles.navbarComponent}>
      <Logo onlyIcon={false} size="xs" className={styles.navbarLogo} />

      <Box className={styles.navbarUserOptions}>
        <CustomButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          variant="text"
        >
          Opções
        </CustomButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
            },
          }}
        >
          <MenuItem onClick={onHandleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};
