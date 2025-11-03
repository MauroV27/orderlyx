import { Box, Dialog, Typography } from "@mui/material";
import { X } from "lucide-react";

import CustomButton from "../CustomButtom";
import type { BasicModalProps } from "./type";

import styles from "./modal.module.css";

export const BasicModal = ({
  title,
  open,
  children,
  titleConfirmAction,
  titleCancelAction,
  onCloseAction,
  onConfirmAction,
  ...props
}: BasicModalProps) => {
  return (
    <Dialog
      className={styles.modalComponent}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onCloseAction}
      closeAfterTransition
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      {...props}
    >
      <Box className={styles.modalComponentHeader}>
        <Typography className={styles.modalComponentHeaderTitle}>
          {title}
        </Typography>

        <CustomButton variant="outlined" onClick={onCloseAction}>
          <X />
        </CustomButton>
      </Box>

      <Box className={styles.modalComponentContent}>{children}</Box>

      <Box className={styles.modalComponentFooter}>
        <CustomButton
          variant="contained"
          onClick={() => {
            onConfirmAction();
          }}
        >
          {titleConfirmAction ?? "Confirmar"}
        </CustomButton>

        <CustomButton
          variant="outlined"
          onClick={() => {
            onCloseAction();
          }}
        >
          {titleCancelAction ?? "Cancelar"}
        </CustomButton>
      </Box>
    </Dialog>
  );
};
